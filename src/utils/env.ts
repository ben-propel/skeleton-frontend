/**
 * Environment Variable Validation System
 * 
 * Provides type-safe access to environment variables with validation,
 * default values, and detailed error messages for tenant deployments.
 */

/**
 * Required tenant environment variables interface
 */
export interface TenantEnvironmentVariables {
  /** Unique identifier for the tenant */
  VITE_TENANT_ID: string;
  /** Primary brand color in hex format */
  VITE_TENANT_PRIMARY_COLOR: string;
  /** URL to the tenant's logo */
  VITE_TENANT_LOGO_URL: string;
  /** Display name of the tenant company */
  VITE_TENANT_COMPANY_NAME: string;
  /** Base URL for the tenant's API */
  VITE_TENANT_API_URL: string;
}

/**
 * Optional environment variables with defaults
 */
export interface OptionalEnvironmentVariables {
  /** Secondary brand color (defaults to primary color with opacity) */
  VITE_TENANT_SECONDARY_COLOR?: string;
  /** Tenant favicon URL (defaults to logo URL) */
  VITE_TENANT_FAVICON_URL?: string;
  /** API timeout in milliseconds (defaults to 10000) */
  VITE_TENANT_API_TIMEOUT?: string;
  /** Enable debug mode (defaults to false) */
  VITE_TENANT_DEBUG?: string;
}

/**
 * Complete environment variables interface
 */
export interface EnvironmentVariables extends TenantEnvironmentVariables, OptionalEnvironmentVariables {}

/**
 * Validation error details
 */
export interface ValidationError {
  /** Name of the environment variable */
  variable: string;
  /** Current value (if any) */
  value: string | undefined;
  /** Error message */
  message: string;
  /** Expected format or example */
  expected: string;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  /** Whether validation passed */
  isValid: boolean;
  /** Array of validation errors */
  errors: ValidationError[];
  /** Validated environment variables (if valid) */
  env: EnvironmentVariables | undefined;
}

// Validation cache for performance
let validationCache: ValidationResult | null = null;
let lastValidationTime = 0;
const CACHE_DURATION = 5000; // 5 seconds

/**
 * Validates a URL format
 * @param url - URL string to validate
 * @returns Whether the URL is valid
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a hex color format
 * @param color - Color string to validate
 * @returns Whether the color is a valid hex format
 */
function isValidHexColor(color: string): boolean {
  const hexColorRegex = /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(color);
}

/**
 * Validates that a string is not empty
 * @param value - String to validate
 * @returns Whether the string is not empty
 */
function isNonEmptyString(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates a numeric string
 * @param value - String to validate as number
 * @returns Whether the string represents a valid number
 */
function isValidNumber(value: string): boolean {
  return !isNaN(Number(value)) && isFinite(Number(value));
}

/**
 * Validates a boolean string
 * @param value - String to validate as boolean
 * @returns Whether the string represents a valid boolean
 */
function isValidBoolean(value: string): boolean {
  return ['true', 'false', '1', '0'].includes(value.toLowerCase());
}

/**
 * Creates a validation error object
 * @param variable - Environment variable name
 * @param value - Current value
 * @param message - Error message
 * @param expected - Expected format
 * @returns ValidationError object
 */
function createValidationError(
  variable: string,
  value: string | undefined,
  message: string,
  expected: string
): ValidationError {
  return {
    variable,
    value,
    message,
    expected,
  };
}

/**
 * Validates required environment variables
 * @param env - Environment variables object
 * @returns Array of validation errors
 */
function validateRequiredVariables(env: Record<string, string | undefined>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate VITE_TENANT_ID
  if (!env.VITE_TENANT_ID) {
    errors.push(createValidationError(
      'VITE_TENANT_ID',
      env.VITE_TENANT_ID,
      'Tenant ID is required',
      'Non-empty string (e.g., "client-123")'
    ));
  } else if (!isNonEmptyString(env.VITE_TENANT_ID)) {
    errors.push(createValidationError(
      'VITE_TENANT_ID',
      env.VITE_TENANT_ID,
      'Tenant ID must be a non-empty string',
      'Non-empty string (e.g., "client-123")'
    ));
  }

  // Validate VITE_TENANT_PRIMARY_COLOR
  if (!env.VITE_TENANT_PRIMARY_COLOR) {
    errors.push(createValidationError(
      'VITE_TENANT_PRIMARY_COLOR',
      env.VITE_TENANT_PRIMARY_COLOR,
      'Primary color is required',
      'Hex color format (e.g., "#3B82F6", "#36f", or "#3B82F680")'
    ));
  } else if (!isValidHexColor(env.VITE_TENANT_PRIMARY_COLOR)) {
    errors.push(createValidationError(
      'VITE_TENANT_PRIMARY_COLOR',
      env.VITE_TENANT_PRIMARY_COLOR,
      'Primary color must be a valid hex color',
      'Hex color format (e.g., "#3B82F6", "#36f", or "#3B82F680")'
    ));
  }

  // Validate VITE_TENANT_LOGO_URL
  if (!env.VITE_TENANT_LOGO_URL) {
    errors.push(createValidationError(
      'VITE_TENANT_LOGO_URL',
      env.VITE_TENANT_LOGO_URL,
      'Logo URL is required',
      'Valid URL (e.g., "https://example.com/logo.png")'
    ));
  } else if (!isValidUrl(env.VITE_TENANT_LOGO_URL)) {
    errors.push(createValidationError(
      'VITE_TENANT_LOGO_URL',
      env.VITE_TENANT_LOGO_URL,
      'Logo URL must be a valid URL',
      'Valid URL (e.g., "https://example.com/logo.png")'
    ));
  }

  // Validate VITE_TENANT_COMPANY_NAME
  if (!env.VITE_TENANT_COMPANY_NAME) {
    errors.push(createValidationError(
      'VITE_TENANT_COMPANY_NAME',
      env.VITE_TENANT_COMPANY_NAME,
      'Company name is required',
      'Non-empty string (e.g., "Acme Corporation")'
    ));
  } else if (!isNonEmptyString(env.VITE_TENANT_COMPANY_NAME)) {
    errors.push(createValidationError(
      'VITE_TENANT_COMPANY_NAME',
      env.VITE_TENANT_COMPANY_NAME,
      'Company name must be a non-empty string',
      'Non-empty string (e.g., "Acme Corporation")'
    ));
  }

  // Validate VITE_TENANT_API_URL
  if (!env.VITE_TENANT_API_URL) {
    errors.push(createValidationError(
      'VITE_TENANT_API_URL',
      env.VITE_TENANT_API_URL,
      'API URL is required',
      'Valid URL (e.g., "https://api.example.com")'
    ));
  } else if (!isValidUrl(env.VITE_TENANT_API_URL)) {
    errors.push(createValidationError(
      'VITE_TENANT_API_URL',
      env.VITE_TENANT_API_URL,
      'API URL must be a valid URL',
      'Valid URL (e.g., "https://api.example.com")'
    ));
  }

  return errors;
}

/**
 * Validates optional environment variables
 * @param env - Environment variables object
 * @returns Array of validation errors
 */
function validateOptionalVariables(env: Record<string, string | undefined>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate VITE_TENANT_SECONDARY_COLOR (optional)
  if (env.VITE_TENANT_SECONDARY_COLOR && !isValidHexColor(env.VITE_TENANT_SECONDARY_COLOR)) {
    errors.push(createValidationError(
      'VITE_TENANT_SECONDARY_COLOR',
      env.VITE_TENANT_SECONDARY_COLOR,
      'Secondary color must be a valid hex color',
      'Hex color format (e.g., "#3B82F6", "#36f", or "#3B82F680")'
    ));
  }

  // Validate VITE_TENANT_FAVICON_URL (optional)
  if (env.VITE_TENANT_FAVICON_URL && !isValidUrl(env.VITE_TENANT_FAVICON_URL)) {
    errors.push(createValidationError(
      'VITE_TENANT_FAVICON_URL',
      env.VITE_TENANT_FAVICON_URL,
      'Favicon URL must be a valid URL',
      'Valid URL (e.g., "https://example.com/favicon.ico")'
    ));
  }

  // Validate VITE_TENANT_API_TIMEOUT (optional)
  if (env.VITE_TENANT_API_TIMEOUT && !isValidNumber(env.VITE_TENANT_API_TIMEOUT)) {
    errors.push(createValidationError(
      'VITE_TENANT_API_TIMEOUT',
      env.VITE_TENANT_API_TIMEOUT,
      'API timeout must be a valid number',
      'Number in milliseconds (e.g., "10000")'
    ));
  }

  // Validate VITE_TENANT_DEBUG (optional)
  if (env.VITE_TENANT_DEBUG && !isValidBoolean(env.VITE_TENANT_DEBUG)) {
    errors.push(createValidationError(
      'VITE_TENANT_DEBUG',
      env.VITE_TENANT_DEBUG,
      'Debug flag must be a valid boolean',
      'Boolean value (e.g., "true", "false", "1", "0")'
    ));
  }

  return errors;
}

/**
 * Applies default values for optional environment variables
 * @param env - Environment variables object
 * @returns Environment variables with defaults applied
 */
function applyDefaults(env: Record<string, string | undefined>): EnvironmentVariables {
  return {
    // Required variables (already validated)
    VITE_TENANT_ID: env.VITE_TENANT_ID!,
    VITE_TENANT_PRIMARY_COLOR: env.VITE_TENANT_PRIMARY_COLOR!,
    VITE_TENANT_LOGO_URL: env.VITE_TENANT_LOGO_URL!,
    VITE_TENANT_COMPANY_NAME: env.VITE_TENANT_COMPANY_NAME!,
    VITE_TENANT_API_URL: env.VITE_TENANT_API_URL!,
    
    // Optional variables with defaults
    VITE_TENANT_SECONDARY_COLOR: env.VITE_TENANT_SECONDARY_COLOR || `${env.VITE_TENANT_PRIMARY_COLOR!}80`,
    VITE_TENANT_FAVICON_URL: env.VITE_TENANT_FAVICON_URL || env.VITE_TENANT_LOGO_URL!,
    VITE_TENANT_API_TIMEOUT: env.VITE_TENANT_API_TIMEOUT || '10000',
    VITE_TENANT_DEBUG: env.VITE_TENANT_DEBUG || 'false',
  };
}

/**
 * Validates all tenant environment variables
 * @param useCache - Whether to use cached validation result (default: true)
 * @param envOverride - Environment variables override for testing (default: import.meta.env)
 * @returns Validation result with errors or validated environment variables
 */
export function validateEnvironmentVariables(
  useCache = true, 
  envOverride?: Record<string, string | undefined>
): ValidationResult {
  const now = Date.now();
  
  // Return cached result if available and not expired (only when not testing)
  if (useCache && !envOverride && validationCache && (now - lastValidationTime) < CACHE_DURATION) {
    return validationCache;
  }

  const env = envOverride || import.meta.env;
  const errors: ValidationError[] = [];

  // Validate required variables
  errors.push(...validateRequiredVariables(env));

  // Validate optional variables
  errors.push(...validateOptionalVariables(env));

  const result: ValidationResult = {
    isValid: errors.length === 0,
    errors,
    env: errors.length === 0 ? applyDefaults(env) : undefined,
  };

  // Cache the result
  if (useCache) {
    validationCache = result;
    lastValidationTime = now;
  }

  return result;
}

/**
 * Gets validated environment variables or throws an error
 * @returns Validated environment variables
 * @throws Error if validation fails
 */
export function getValidatedEnvironmentVariables(): EnvironmentVariables {
  const result = validateEnvironmentVariables();
  
  if (!result.isValid) {
    const errorMessages = result.errors.map(error => 
      `${error.variable}: ${error.message} (Expected: ${error.expected}, Got: ${error.value || 'undefined'})`
    ).join('\n');
    
    throw new Error(
      `Environment variable validation failed:\n${errorMessages}\n\n` +
      'Please check your environment configuration and ensure all required variables are set correctly.'
    );
  }
  
  return result.env!;
}

/**
 * Type-safe getter for environment variables
 * @param key - Environment variable key
 * @returns Environment variable value
 */
export function getEnvVar<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K] {
  const env = getValidatedEnvironmentVariables();
  return env[key];
}

/**
 * Clears the validation cache (useful for testing)
 */
export function clearValidationCache(): void {
  validationCache = null;
  lastValidationTime = 0;
}

/**
 * Formats validation errors for display
 * @param errors - Array of validation errors
 * @returns Formatted error message
 */
export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) {
    return 'No validation errors.';
  }

  return errors.map((error, index) => 
    `${index + 1}. ${error.variable}:\n` +
    `   Error: ${error.message}\n` +
    `   Expected: ${error.expected}\n` +
    `   Got: ${error.value || 'undefined'}`
  ).join('\n\n');
}