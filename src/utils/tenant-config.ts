/**
 * Tenant Configuration Loading Utility
 * 
 * Provides centralized loading and management of tenant configurations
 * with caching, validation, fallback handling, and debugging capabilities.
 */

import { TenantConfig, BrandingConfig, FeatureFlags, ApiConfig } from '@/types'
import { getValidatedEnvironmentVariables, type EnvironmentVariables } from './env'

/**
 * Configuration options for tenant config loading
 */
export interface TenantConfigOptions {
  /** Enable configuration caching (default: true) */
  cache?: boolean
  /** Enable fallback configuration on failure (default: true) */
  fallback?: boolean
  /** Enable configuration validation (default: true) */
  validate?: boolean
}

/**
 * Tenant configuration loading result
 */
export interface TenantConfigResult {
  /** The loaded tenant configuration */
  config: TenantConfig
  /** Whether the config was loaded from cache */
  fromCache: boolean
  /** Whether fallback configuration was used */
  isFailback: boolean
  /** Loading time in milliseconds */
  loadTime: number
}

/**
 * Tenant configuration error details
 */
export interface TenantConfigError extends Error {
  /** Error code for categorization */
  code: string
  /** Additional error details */
  details?: Record<string, unknown>
  /** Whether fallback was available */
  fallbackAvailable: boolean
}

// Configuration cache
const configCache = new Map<string, { config: TenantConfig; timestamp: number }>()
const CACHE_DURATION = 300000 // 5 minutes
const DEBUG_ENABLED = import.meta.env.DEV

/**
 * Debug logging utility
 * @param message - Debug message
 * @param data - Additional data to log
 */
function debugLog(message: string, data?: unknown): void {
  if (DEBUG_ENABLED) {
    console.group(`[TenantConfig] ${message}`)
    if (data) {
      console.log(data)
    }
    console.groupEnd()
  }
}

/**
 * Creates a tenant configuration error
 * @param message - Error message
 * @param code - Error code
 * @param details - Additional error details
 * @param fallbackAvailable - Whether fallback is available
 * @returns TenantConfigError instance
 */
function createTenantConfigError(
  message: string,
  code: string,
  details?: Record<string, unknown>,
  fallbackAvailable = false
): TenantConfigError {
  const error = new Error(message) as TenantConfigError
  error.name = 'TenantConfigError'
  error.code = code
  if (details !== undefined) {
    error.details = details
  }
  error.fallbackAvailable = fallbackAvailable
  return error
}

/**
 * Validates a tenant configuration object
 * @param config - Configuration to validate
 * @returns Whether the configuration is valid
 * @throws TenantConfigError if validation fails
 */
function validateTenantConfig(config: unknown): config is TenantConfig {
  if (!config || typeof config !== 'object') {
    throw createTenantConfigError(
      'Configuration must be an object',
      'INVALID_CONFIG_TYPE'
    )
  }

  const cfg = config as Record<string, unknown>

  // Validate required fields
  if (!cfg.id || typeof cfg.id !== 'string') {
    throw createTenantConfigError(
      'Configuration must have a valid id field',
      'MISSING_TENANT_ID'
    )
  }

  if (!cfg.name || typeof cfg.name !== 'string') {
    throw createTenantConfigError(
      'Configuration must have a valid name field',
      'MISSING_TENANT_NAME'
    )
  }

  if (!cfg.branding || typeof cfg.branding !== 'object') {
    throw createTenantConfigError(
      'Configuration must have a valid branding object',
      'MISSING_BRANDING_CONFIG'
    )
  }

  if (!cfg.features || typeof cfg.features !== 'object') {
    throw createTenantConfigError(
      'Configuration must have a valid features object',
      'MISSING_FEATURES_CONFIG'
    )
  }

  if (!cfg.api || typeof cfg.api !== 'object') {
    throw createTenantConfigError(
      'Configuration must have a valid api object',
      'MISSING_API_CONFIG'
    )
  }

  return true
}

/**
 * Creates a fallback tenant configuration from environment variables
 * @param envVars - Validated environment variables
 * @returns Fallback tenant configuration
 */
function createFallbackConfig(envVars: EnvironmentVariables): TenantConfig {
  const branding: BrandingConfig = {
    primaryColor: envVars.VITE_TENANT_PRIMARY_COLOR,
    secondaryColor: envVars.VITE_TENANT_SECONDARY_COLOR || `${envVars.VITE_TENANT_PRIMARY_COLOR}80`,
    logoUrl: envVars.VITE_TENANT_LOGO_URL,
    faviconUrl: envVars.VITE_TENANT_FAVICON_URL || envVars.VITE_TENANT_LOGO_URL,
    appTitle: envVars.VITE_TENANT_COMPANY_NAME,
  }

  const features: FeatureFlags = {
    enableAnalytics: false,
    enableMFA: false,
    enableDarkMode: true,
    enableNotifications: true,
    enableIntegrations: false,
    enableUserManagement: false,
    enableExports: false,
  }

  const api: ApiConfig = {
    baseUrl: envVars.VITE_TENANT_API_URL,
    version: 'v1',
    auth: {
      type: 'bearer',
      endpoint: '/auth/login',
    },
    timeout: parseInt(envVars.VITE_TENANT_API_TIMEOUT || '10000', 10),
  }

  return {
    id: envVars.VITE_TENANT_ID,
    name: envVars.VITE_TENANT_COMPANY_NAME,
    branding,
    features,
    api,
  }
}

/**
 * Loads tenant configuration from a remote API
 * @param tenantId - Tenant identifier
 * @param apiUrl - API base URL
 * @returns Promise resolving to tenant configuration
 */
async function loadRemoteTenantConfig(tenantId: string, apiUrl: string): Promise<TenantConfig> {
  const configUrl = `${apiUrl}/tenants/${tenantId}/config`
  
  debugLog('Loading remote tenant config', { tenantId, configUrl })

  try {
    const response = await fetch(configUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    })

    if (!response.ok) {
      throw createTenantConfigError(
        `Failed to load tenant configuration: ${response.statusText}`,
        'REMOTE_LOAD_FAILED',
        { status: response.status, statusText: response.statusText }
      )
    }

    const config = await response.json()
    debugLog('Remote config loaded successfully', config)
    
    return config
  } catch (error) {
    if (error instanceof Error) {
      debugLog('Remote config loading failed', { error: error.message })
      
      if (error.name === 'TenantConfigError') {
        throw error
      }
      
      throw createTenantConfigError(
        `Network error loading tenant configuration: ${error.message}`,
        'NETWORK_ERROR',
        { originalError: error.message }
      )
    }
    
    throw createTenantConfigError(
      'Unknown error loading tenant configuration',
      'UNKNOWN_ERROR'
    )
  }
}

/**
 * Gets tenant configuration from cache
 * @param tenantId - Tenant identifier
 * @returns Cached configuration or null if not found/expired
 */
function getCachedConfig(tenantId: string): TenantConfig | null {
  const cached = configCache.get(tenantId)
  
  if (!cached) {
    debugLog('No cached config found', { tenantId })
    return null
  }

  const now = Date.now()
  const isExpired = now - cached.timestamp > CACHE_DURATION

  if (isExpired) {
    debugLog('Cached config expired', { tenantId, age: now - cached.timestamp })
    configCache.delete(tenantId)
    return null
  }

  debugLog('Using cached config', { tenantId, age: now - cached.timestamp })
  return cached.config
}

/**
 * Caches tenant configuration
 * @param tenantId - Tenant identifier
 * @param config - Configuration to cache
 */
function setCachedConfig(tenantId: string, config: TenantConfig): void {
  configCache.set(tenantId, {
    config,
    timestamp: Date.now(),
  })
  debugLog('Config cached', { tenantId })
}

/**
 * Loads and manages tenant configurations with caching, validation, and fallback support
 * @param options - Loading options
 * @returns Promise resolving to tenant configuration result
 * @throws TenantConfigError if loading fails and no fallback is available
 */
export async function getTenantConfig(options: TenantConfigOptions = {}): Promise<TenantConfigResult> {
  const startTime = Date.now()
  const { cache = true, fallback = true, validate = true } = options

  debugLog('Getting tenant config', { options })

  try {
    // Get validated environment variables
    const envVars = getValidatedEnvironmentVariables()
    const tenantId = envVars.VITE_TENANT_ID

    // Check cache first
    if (cache) {
      const cachedConfig = getCachedConfig(tenantId)
      if (cachedConfig) {
        return {
          config: cachedConfig,
          fromCache: true,
          isFailback: false,
          loadTime: Date.now() - startTime,
        }
      }
    }

    let config: TenantConfig
    let isFailback = false

    try {
      // Attempt to load remote configuration
      config = await loadRemoteTenantConfig(tenantId, envVars.VITE_TENANT_API_URL)
      
      // Validate loaded configuration
      if (validate) {
        validateTenantConfig(config)
      }
    } catch (error) {
      // If validation fails and fallback is disabled, throw the error
      if (!fallback) {
        throw error
      }

      // For validation errors, we should not use fallback as the remote config is invalid
      if (error instanceof Error && error.name === 'TenantConfigError' && 
          ['INVALID_CONFIG_TYPE', 'MISSING_TENANT_ID', 'MISSING_TENANT_NAME', 
           'MISSING_BRANDING_CONFIG', 'MISSING_FEATURES_CONFIG', 'MISSING_API_CONFIG'].includes((error as TenantConfigError).code)) {
        throw error
      }

      debugLog('Using fallback configuration', { error: error instanceof Error ? error.message : error })
      
      // Use fallback configuration for network/loading errors only
      config = createFallbackConfig(envVars)
      isFailback = true
    }

    // Cache the configuration
    if (cache) {
      setCachedConfig(tenantId, config)
    }

    const result: TenantConfigResult = {
      config,
      fromCache: false,
      isFailback,
      loadTime: Date.now() - startTime,
    }

    debugLog('Tenant config loaded successfully', result)
    return result

  } catch (error) {
    debugLog('Failed to get tenant config', { error: error instanceof Error ? error.message : error })
    
    if (error instanceof Error && error.name === 'TenantConfigError') {
      throw error
    }
    
    throw createTenantConfigError(
      `Failed to load tenant configuration: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'LOAD_FAILED',
      { originalError: error instanceof Error ? error.message : error },
      fallback
    )
  }
}

/**
 * Refreshes tenant configuration by clearing cache and reloading
 * @param options - Loading options
 * @returns Promise resolving to fresh tenant configuration result
 */
export async function refreshTenantConfig(options: TenantConfigOptions = {}): Promise<TenantConfigResult> {
  debugLog('Refreshing tenant config')
  
  try {
    const envVars = getValidatedEnvironmentVariables()
    const tenantId = envVars.VITE_TENANT_ID
    
    // Clear cache
    configCache.delete(tenantId)
    
    // Load fresh configuration
    return await getTenantConfig({ ...options, cache: true })
  } catch (error) {
    debugLog('Failed to refresh tenant config', { error: error instanceof Error ? error.message : error })
    throw error
  }
}

/**
 * Clears all cached tenant configurations
 */
export function clearTenantConfigCache(): void {
  const size = configCache.size
  configCache.clear()
  debugLog('Cleared tenant config cache', { clearedEntries: size })
}

/**
 * Gets tenant configuration cache statistics for debugging
 * @returns Cache statistics
 */
export function getTenantConfigCacheStats(): {
  size: number
  entries: Array<{ tenantId: string; age: number }>
} {
  const now = Date.now()
  const entries = Array.from(configCache.entries()).map(([tenantId, cached]) => ({
    tenantId,
    age: now - cached.timestamp,
  }))

  return {
    size: configCache.size,
    entries,
  }
}

/**
 * Type guard to check if an error is a TenantConfigError
 * @param error - Error to check
 * @returns Whether the error is a TenantConfigError
 */
export function isTenantConfigError(error: unknown): error is TenantConfigError {
  return error instanceof Error && error.name === 'TenantConfigError'
}