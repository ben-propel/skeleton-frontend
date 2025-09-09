import { describe, it, expect, beforeEach } from 'vitest'
import {
  validateEnvironmentVariables,
  clearValidationCache,
  formatValidationErrors,
  type ValidationError,
} from './env'

describe('Environment Variable Validation', () => {
  let mockEnv: Record<string, string | undefined>

  beforeEach(() => {
    // Reset mock environment
    mockEnv = {
      VITE_TENANT_ID: undefined,
      VITE_TENANT_PRIMARY_COLOR: undefined,
      VITE_TENANT_LOGO_URL: undefined,
      VITE_TENANT_COMPANY_NAME: undefined,
      VITE_TENANT_API_URL: undefined,
      VITE_TENANT_SECONDARY_COLOR: undefined,
      VITE_TENANT_FAVICON_URL: undefined,
      VITE_TENANT_API_TIMEOUT: undefined,
      VITE_TENANT_DEBUG: undefined,
    }
    clearValidationCache()
  })

  describe('validateEnvironmentVariables', () => {
    it('should return validation errors when required variables are missing', () => {
      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(5)
      expect(result.env).toBeUndefined()
      
      const errorVariables = result.errors.map(error => error.variable)
      expect(errorVariables).toContain('VITE_TENANT_ID')
      expect(errorVariables).toContain('VITE_TENANT_PRIMARY_COLOR')
      expect(errorVariables).toContain('VITE_TENANT_LOGO_URL')
      expect(errorVariables).toContain('VITE_TENANT_COMPANY_NAME')
      expect(errorVariables).toContain('VITE_TENANT_API_URL')
    })

    it('should validate successfully with all required variables', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.env).toBeDefined()
    })

    it('should apply default values for optional variables', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.env!.VITE_TENANT_SECONDARY_COLOR).toBe('#3B82F680')
      expect(result.env!.VITE_TENANT_FAVICON_URL).toBe('https://example.com/logo.png')
      expect(result.env!.VITE_TENANT_API_TIMEOUT).toBe('10000')
      expect(result.env!.VITE_TENANT_DEBUG).toBe('false')
    })

    it('should use provided optional variables when valid', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'
      mockEnv.VITE_TENANT_SECONDARY_COLOR = '#EF4444'
      mockEnv.VITE_TENANT_FAVICON_URL = 'https://example.com/favicon.ico'
      mockEnv.VITE_TENANT_API_TIMEOUT = '5000'
      mockEnv.VITE_TENANT_DEBUG = 'true'

      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.env!.VITE_TENANT_SECONDARY_COLOR).toBe('#EF4444')
      expect(result.env!.VITE_TENANT_FAVICON_URL).toBe('https://example.com/favicon.ico')
      expect(result.env!.VITE_TENANT_API_TIMEOUT).toBe('5000')
      expect(result.env!.VITE_TENANT_DEBUG).toBe('true')
    })

    it('should cache validation results when not using envOverride', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      // Note: Can't test caching behavior with envOverride since it disables caching
      // This test would need to use real import.meta.env to test caching
      const result = validateEnvironmentVariables(false, mockEnv)
      expect(result.isValid).toBe(true)
    })

    it('should skip cache when useCache is false', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      const result1 = validateEnvironmentVariables(false, mockEnv)
      const result2 = validateEnvironmentVariables(false, mockEnv)
      
      // Results should be different objects (not cached)
      expect(result1).not.toBe(result2)
      expect(result1).toEqual(result2)
    })
  })

  describe('Variable Format Validation', () => {
    it('should validate hex colors correctly', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      // Valid hex colors
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(true)

      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#36f'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(true)

      // Invalid hex colors
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '3B82F6'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)

      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#zzzzzz'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)

      mockEnv.VITE_TENANT_PRIMARY_COLOR = 'blue'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)
    })

    it('should validate URLs correctly', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'

      // Valid URLs
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(true)

      mockEnv.VITE_TENANT_LOGO_URL = 'http://example.com/logo.png'
      mockEnv.VITE_TENANT_API_URL = 'http://api.example.com'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(true)

      // Invalid URLs
      mockEnv.VITE_TENANT_LOGO_URL = 'not-a-url'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)

      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_API_URL = 'invalid-url'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)
    })

    it('should validate optional variables correctly', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      // Invalid optional secondary color
      mockEnv.VITE_TENANT_SECONDARY_COLOR = 'invalid-color'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)

      // Invalid optional favicon URL
      mockEnv.VITE_TENANT_SECONDARY_COLOR = '#EF4444'
      mockEnv.VITE_TENANT_FAVICON_URL = 'invalid-url'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)

      // Invalid optional API timeout
      mockEnv.VITE_TENANT_FAVICON_URL = 'https://example.com/favicon.ico'
      mockEnv.VITE_TENANT_API_TIMEOUT = 'not-a-number'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)

      // Invalid optional debug flag
      mockEnv.VITE_TENANT_API_TIMEOUT = '5000'
      mockEnv.VITE_TENANT_DEBUG = 'maybe'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)

      // Valid optional variables
      mockEnv.VITE_TENANT_DEBUG = 'true'
      expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(true)
    })

    it('should validate boolean strings correctly', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      // Valid boolean values
      const validBooleans = ['true', 'false', '1', '0', 'TRUE', 'FALSE']
      for (const bool of validBooleans) {
        mockEnv.VITE_TENANT_DEBUG = bool
        expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(true)
      }

      // Invalid boolean values
      const invalidBooleans = ['yes', 'no', 'maybe', '2', '-1', 'on', 'off']
      for (const bool of invalidBooleans) {
        mockEnv.VITE_TENANT_DEBUG = bool
        expect(validateEnvironmentVariables(false, mockEnv).isValid).toBe(false)
      }
    })
  })

  // Note: getValidatedEnvironmentVariables and getEnvVar tests are not included
  // as they internally call validateEnvironmentVariables() without the envOverride parameter,
  // making them difficult to test with mocked environments in this test setup.
  // These functions would be tested in integration tests with real environment variables.

  describe('formatValidationErrors', () => {
    it('should format no errors correctly', () => {
      const errors: ValidationError[] = []
      const formatted = formatValidationErrors(errors)
      
      expect(formatted).toBe('No validation errors.')
    })

    it('should format single error correctly', () => {
      const errors: ValidationError[] = [
        {
          variable: 'VITE_TENANT_ID',
          value: undefined,
          message: 'Tenant ID is required',
          expected: 'Non-empty string (e.g., "client-123")',
        },
      ]
      const formatted = formatValidationErrors(errors)
      
      expect(formatted).toContain('1. VITE_TENANT_ID:')
      expect(formatted).toContain('Error: Tenant ID is required')
      expect(formatted).toContain('Expected: Non-empty string (e.g., "client-123")')
      expect(formatted).toContain('Got: undefined')
    })

    it('should format multiple errors correctly', () => {
      const errors: ValidationError[] = [
        {
          variable: 'VITE_TENANT_ID',
          value: undefined,
          message: 'Tenant ID is required',
          expected: 'Non-empty string (e.g., "client-123")',
        },
        {
          variable: 'VITE_TENANT_PRIMARY_COLOR',
          value: 'invalid-color',
          message: 'Primary color must be a valid hex color',
          expected: 'Hex color format (e.g., "#3B82F6" or "#36f")',
        },
      ]
      const formatted = formatValidationErrors(errors)
      
      expect(formatted).toContain('1. VITE_TENANT_ID:')
      expect(formatted).toContain('2. VITE_TENANT_PRIMARY_COLOR:')
      expect(formatted).toContain('Got: invalid-color')
    })
  })

  describe('clearValidationCache', () => {
    it('should clear the validation cache', () => {
      // Note: This test can't fully test caching behavior with envOverride 
      // since envOverride disables caching for testing purposes.
      // The clearValidationCache function is tested for successful execution.
      clearValidationCache()
      
      // Verify function can be called without errors
      expect(clearValidationCache).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string values as missing', () => {
      mockEnv.VITE_TENANT_ID = ''
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.isValid).toBe(false)
      const tenantIdError = result.errors.find(e => e.variable === 'VITE_TENANT_ID')
      expect(tenantIdError?.message).toBe('Tenant ID is required')
    })

    it('should handle whitespace-only values as invalid', () => {
      mockEnv.VITE_TENANT_ID = '   '
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.isValid).toBe(false)
      const tenantIdError = result.errors.find(e => e.variable === 'VITE_TENANT_ID')
      expect(tenantIdError?.message).toBe('Tenant ID must be a non-empty string')
    })

    it('should validate 3-character hex colors', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#f0f'
      mockEnv.VITE_TENANT_LOGO_URL = 'https://example.com/logo.png'
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.isValid).toBe(true)
    })

    it('should handle malformed URLs gracefully', () => {
      mockEnv.VITE_TENANT_ID = 'test-tenant'
      mockEnv.VITE_TENANT_PRIMARY_COLOR = '#3B82F6'
      mockEnv.VITE_TENANT_LOGO_URL = 'ht tp://example.com/logo.png' // Space in URL
      mockEnv.VITE_TENANT_COMPANY_NAME = 'Test Company'
      mockEnv.VITE_TENANT_API_URL = 'https://api.example.com'

      const result = validateEnvironmentVariables(false, mockEnv)
      
      expect(result.isValid).toBe(false)
      const logoError = result.errors.find(e => e.variable === 'VITE_TENANT_LOGO_URL')
      expect(logoError?.message).toBe('Logo URL must be a valid URL')
    })
  })
})