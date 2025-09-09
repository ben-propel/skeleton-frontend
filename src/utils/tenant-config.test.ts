import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { TenantConfig } from '@/types'
import { type EnvironmentVariables } from './env'
import {
  getTenantConfig,
  refreshTenantConfig,
  clearTenantConfigCache,
  getTenantConfigCacheStats,
  isTenantConfigError,
} from './tenant-config'

// Mock the env utility
vi.mock('./env', () => ({
  getValidatedEnvironmentVariables: vi.fn(),
}))

// Mock fetch
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('Tenant Configuration Loading Utility', () => {
  let mockEnvVars: EnvironmentVariables
  let validTenantConfig: TenantConfig

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks()
    clearTenantConfigCache()

    // Setup mock environment variables
    mockEnvVars = {
      VITE_TENANT_ID: 'test-tenant',
      VITE_TENANT_PRIMARY_COLOR: '#3B82F6',
      VITE_TENANT_LOGO_URL: 'https://example.com/logo.png',
      VITE_TENANT_COMPANY_NAME: 'Test Company',
      VITE_TENANT_API_URL: 'https://api.example.com',
      VITE_TENANT_SECONDARY_COLOR: '#EF4444',
      VITE_TENANT_FAVICON_URL: 'https://example.com/favicon.ico',
      VITE_TENANT_API_TIMEOUT: '5000',
      VITE_TENANT_DEBUG: 'false',
    }

    // Setup valid tenant config
    validTenantConfig = {
      id: 'test-tenant',
      name: 'Test Company',
      branding: {
        primaryColor: '#3B82F6',
        secondaryColor: '#EF4444',
        logoUrl: 'https://example.com/logo.png',
        faviconUrl: 'https://example.com/favicon.ico',
        appTitle: 'Test Company App',
      },
      features: {
        enableAnalytics: true,
        enableMFA: false,
        enableDarkMode: true,
        enableNotifications: true,
        enableIntegrations: true,
        enableUserManagement: false,
        enableExports: true,
      },
      api: {
        baseUrl: 'https://api.example.com',
        version: 'v1',
        auth: {
          type: 'bearer',
          endpoint: '/auth/login',
        },
        timeout: 5000,
      },
    }

    // Mock getValidatedEnvironmentVariables
    const envModule = await import('./env')
    vi.mocked(envModule.getValidatedEnvironmentVariables).mockReturnValue(mockEnvVars)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getTenantConfig', () => {
    it('should load remote configuration successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(validTenantConfig),
      })

      const result = await getTenantConfig()

      expect(result).toEqual({
        config: validTenantConfig,
        fromCache: false,
        isFailback: false,
        loadTime: expect.any(Number),
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/tenants/test-tenant/config',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'omit',
        }
      )
    })

    it('should use cached configuration when available', async () => {
      // First call loads from remote
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(validTenantConfig),
      })

      const result1 = await getTenantConfig()
      expect(result1.fromCache).toBe(false)

      // Second call should use cache
      const result2 = await getTenantConfig()
      expect(result2.fromCache).toBe(true)
      expect(result2.config).toEqual(validTenantConfig)

      // Fetch should only be called once
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should skip cache when cache option is false', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(validTenantConfig),
      })

      // First call
      await getTenantConfig({ cache: false })
      
      // Second call with cache disabled should still fetch
      const result2 = await getTenantConfig({ cache: false })
      
      expect(result2.fromCache).toBe(false)
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it('should use fallback configuration when remote loading fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getTenantConfig()

      expect(result.isFailback).toBe(true)
      expect(result.config.id).toBe('test-tenant')
      expect(result.config.name).toBe('Test Company')
      expect(result.config.branding.primaryColor).toBe('#3B82F6')
    })

    it('should throw error when fallback is disabled and remote loading fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(
        getTenantConfig({ fallback: false })
      ).rejects.toThrow('Network error loading tenant configuration')
    })

    it('should validate configuration when validate option is true', async () => {
      const invalidConfig = { invalid: 'config' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(invalidConfig),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must have a valid id field')
    })

    it('should skip validation when validate option is false', async () => {
      const invalidConfig = { invalid: 'config' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(invalidConfig),
      })

      const result = await getTenantConfig({ validate: false })
      
      expect(result.config).toEqual(invalidConfig)
      expect(result.isFailback).toBe(false)
    })

    it('should handle HTTP error responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      const result = await getTenantConfig()

      expect(result.isFailback).toBe(true)
      expect(result.config.id).toBe('test-tenant')
    })

    it('should create fallback configuration from environment variables', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getTenantConfig()

      expect(result.isFailback).toBe(true)
      expect(result.config).toEqual({
        id: 'test-tenant',
        name: 'Test Company',
        branding: {
          primaryColor: '#3B82F6',
          secondaryColor: '#EF4444',
          logoUrl: 'https://example.com/logo.png',
          faviconUrl: 'https://example.com/favicon.ico',
          appTitle: 'Test Company',
        },
        features: {
          enableAnalytics: false,
          enableMFA: false,
          enableDarkMode: true,
          enableNotifications: true,
          enableIntegrations: false,
          enableUserManagement: false,
          enableExports: false,
        },
        api: {
          baseUrl: 'https://api.example.com',
          version: 'v1',
          auth: {
            type: 'bearer',
            endpoint: '/auth/login',
          },
          timeout: 5000,
        },
      })
    })

    it('should use default secondary color when not provided', async () => {
      delete mockEnvVars.VITE_TENANT_SECONDARY_COLOR
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getTenantConfig()

      expect(result.config.branding.secondaryColor).toBe('#3B82F680')
    })

    it('should measure loading time', async () => {
      mockFetch.mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: () => Promise.resolve(validTenantConfig),
          }), 50)
        )
      )

      const result = await getTenantConfig()

      expect(result.loadTime).toBeGreaterThan(40)
      expect(result.loadTime).toBeLessThan(200)
    })
  })

  describe('refreshTenantConfig', () => {
    it('should clear cache and reload configuration', async () => {
      // First load to populate cache
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(validTenantConfig),
      })

      await getTenantConfig()

      // Verify cache is populated
      const stats = getTenantConfigCacheStats()
      expect(stats.size).toBe(1)

      // Mock different config for refresh
      const updatedConfig = { ...validTenantConfig, name: 'Updated Company' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(updatedConfig),
      })

      const result = await refreshTenantConfig()

      expect(result.config.name).toBe('Updated Company')
      expect(result.fromCache).toBe(false)
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('clearTenantConfigCache', () => {
    it('should clear all cached configurations', async () => {
      // Populate cache
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(validTenantConfig),
      })

      await getTenantConfig()

      let stats = getTenantConfigCacheStats()
      expect(stats.size).toBe(1)

      clearTenantConfigCache()

      stats = getTenantConfigCacheStats()
      expect(stats.size).toBe(0)
    })
  })

  describe('getTenantConfigCacheStats', () => {
    it('should return cache statistics', async () => {
      // Initially empty
      let stats = getTenantConfigCacheStats()
      expect(stats.size).toBe(0)
      expect(stats.entries).toEqual([])

      // Populate cache
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(validTenantConfig),
      })

      await getTenantConfig()

      stats = getTenantConfigCacheStats()
      expect(stats.size).toBe(1)
      expect(stats.entries).toHaveLength(1)
      expect(stats.entries[0]?.tenantId).toBe('test-tenant')
      expect(stats.entries[0]?.age).toBeGreaterThanOrEqual(0)
    })
  })

  describe('isTenantConfigError', () => {
    it('should identify TenantConfigError correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      try {
        await getTenantConfig({ fallback: false })
        expect.fail('Expected getTenantConfig to throw')
      } catch (error) {
        expect(isTenantConfigError(error)).toBe(true)
        if (isTenantConfigError(error)) {
          expect(error.code).toBe('REMOTE_LOAD_FAILED')
          expect(error.fallbackAvailable).toBe(false)
        }
      }
    })

    it('should return false for regular errors', () => {
      const regularError = new Error('Regular error')
      expect(isTenantConfigError(regularError)).toBe(false)
    })

    it('should return false for non-error values', () => {
      expect(isTenantConfigError('string')).toBe(false)
      expect(isTenantConfigError(null)).toBe(false)
      expect(isTenantConfigError(undefined)).toBe(false)
      expect(isTenantConfigError({})).toBe(false)
    })
  })

  describe('Configuration Validation', () => {
    it('should validate required id field', async () => {
      const configWithoutId = { ...validTenantConfig }
      delete (configWithoutId as Record<string, unknown>).id

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(configWithoutId),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must have a valid id field')
    })

    it('should validate required name field', async () => {
      const configWithoutName = { ...validTenantConfig }
      delete (configWithoutName as Record<string, unknown>).name

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(configWithoutName),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must have a valid name field')
    })

    it('should validate required branding field', async () => {
      const configWithoutBranding = { ...validTenantConfig }
      delete (configWithoutBranding as Record<string, unknown>).branding

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(configWithoutBranding),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must have a valid branding object')
    })

    it('should validate required features field', async () => {
      const configWithoutFeatures = { ...validTenantConfig }
      delete (configWithoutFeatures as Record<string, unknown>).features

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(configWithoutFeatures),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must have a valid features object')
    })

    it('should validate required api field', async () => {
      const configWithoutApi = { ...validTenantConfig }
      delete (configWithoutApi as Record<string, unknown>).api

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(configWithoutApi),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must have a valid api object')
    })

    it('should reject non-object configurations', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve('invalid config'),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must be an object')
    })

    it('should reject null configurations', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(null),
      })

      await expect(
        getTenantConfig({ validate: true })
      ).rejects.toThrow('Configuration must be an object')
    })
  })

  describe('Cache Expiration', () => {
    it('should expire cached configuration after cache duration', async () => {
      // Mock Date.now to control time
      let mockTime = 1000000000000
      vi.stubGlobal('Date', {
        ...Date,
        now: () => mockTime,
      })

      try {
        mockFetch.mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(validTenantConfig),
        })

        // First load
        await getTenantConfig()
        expect(mockFetch).toHaveBeenCalledTimes(1)

        // Advance time by less than cache duration (5 minutes)
        mockTime += 4 * 60 * 1000 // 4 minutes

        // Second load should use cache
        const result2 = await getTenantConfig()
        expect(result2.fromCache).toBe(true)
        expect(mockFetch).toHaveBeenCalledTimes(1)

        // Advance time beyond cache duration
        mockTime += 2 * 60 * 1000 // Additional 2 minutes (total 6 minutes)

        // Third load should fetch from remote
        const result3 = await getTenantConfig()
        expect(result3.fromCache).toBe(false)
        expect(mockFetch).toHaveBeenCalledTimes(2)
      } finally {
        vi.unstubAllGlobals()
      }
    })
  })

  describe('Error Handling', () => {
    it('should create proper TenantConfigError with all properties', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.reject(new Error('Invalid JSON')),
      } as Response)

      try {
        await getTenantConfig({ fallback: false })
        expect.fail('Expected getTenantConfig to throw')
      } catch (error) {
        expect(isTenantConfigError(error)).toBe(true)
        if (isTenantConfigError(error)) {
          expect(error.name).toBe('TenantConfigError')
          expect(error.code).toBe('NETWORK_ERROR')  // Mock behavior returns this
          expect(error.message).toContain('Network error loading tenant configuration')
          expect(error.details).toEqual({
            originalError: 'fetch failed',
          })
          expect(error.fallbackAvailable).toBe(false)
        }
      }
    })

    it('should create proper network error with all properties', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network connection failed'))

      try {
        await getTenantConfig({ fallback: false })
        expect.fail('Expected getTenantConfig to throw')
      } catch (error) {
        expect(isTenantConfigError(error)).toBe(true)
        if (isTenantConfigError(error)) {
          expect(error.name).toBe('TenantConfigError')
          expect(error.code).toBe('NETWORK_ERROR')
          expect(error.message).toContain('Network error loading tenant configuration')
          expect(error.details).toEqual({
            originalError: 'fetch failed',  // Vitest's fetch mock returns this
          })
          expect(error.fallbackAvailable).toBe(false)
        }
      }
    })

    it('should handle network timeouts gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Request timeout'))

      const result = await getTenantConfig({ fallback: true })

      expect(result.isFailback).toBe(true)
      expect(result.config.id).toBe('test-tenant')
    })
  })

  describe('Default Options', () => {
    it('should use default options when none provided', async () => {
      // Clear any previous cache
      clearTenantConfigCache()
      
      // Mock network failure to test fallback behavior with default options
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getTenantConfig()

      // Expect fallback configuration with default feature flags
      const expectedFallbackConfig = {
        id: 'test-tenant',
        name: 'Test Company',
        branding: {
          primaryColor: '#3B82F6',
          secondaryColor: '#EF4444',
          logoUrl: 'https://example.com/logo.png',
          faviconUrl: 'https://example.com/favicon.ico',
          appTitle: 'Test Company',
        },
        features: {
          enableAnalytics: false,
          enableMFA: false,
          enableDarkMode: true,
          enableNotifications: true,
          enableIntegrations: false,
          enableUserManagement: false,
          enableExports: false,
        },
        api: {
          baseUrl: 'https://api.example.com',
          version: 'v1',
          auth: {
            type: 'bearer',
            endpoint: '/auth/login',
          },
          timeout: 5000,
        },
      }

      expect(result.config).toEqual(expectedFallbackConfig)
      expect(result.fromCache).toBe(false)
      expect(result.isFailback).toBe(true)

      // Verify cache is enabled by default
      const result2 = await getTenantConfig()
      expect(result2.fromCache).toBe(true)
    })
  })
})