// Global type definitions

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type ApiError = {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Tenant Configuration Types

/**
 * Configuration for tenant-specific branding and visual customization
 * @interface BrandingConfig
 */
export interface BrandingConfig {
  /** Primary brand color in hex format */
  primaryColor: string;
  /** Secondary brand color in hex format */
  secondaryColor: string;
  /** URL to the tenant's logo */
  logoUrl: string;
  /** URL to the tenant's favicon */
  faviconUrl?: string;
  /** Custom CSS variables for advanced theming */
  customCss?: Record<string, string>;
  /** Application title displayed in browser tab and headers */
  appTitle: string;
}

/**
 * Feature flags for tenant-specific functionality toggles
 * @interface FeatureFlags
 */
export interface FeatureFlags {
  /** Enable advanced analytics dashboard */
  enableAnalytics: boolean;
  /** Enable multi-factor authentication */
  enableMFA: boolean;
  /** Enable dark mode theme toggle */
  enableDarkMode: boolean;
  /** Enable real-time notifications */
  enableNotifications: boolean;
  /** Enable API integrations */
  enableIntegrations: boolean;
  /** Enable user management features */
  enableUserManagement: boolean;
  /** Enable export functionality */
  enableExports: boolean;
}

/**
 * API configuration settings for tenant-specific endpoints and authentication
 * @interface ApiConfig
 */
export interface ApiConfig {
  /** Base URL for the tenant's API endpoints */
  baseUrl: string;
  /** API version to use for requests */
  version: string;
  /** Authentication configuration */
  auth: {
    /** Authentication type (bearer, oauth, apikey) */
    type: 'bearer' | 'oauth' | 'apikey';
    /** Endpoint for authentication */
    endpoint: string;
    /** Token refresh endpoint (if applicable) */
    refreshEndpoint?: string;
  };
  /** Request timeout in milliseconds */
  timeout: number;
  /** Rate limiting configuration */
  rateLimit?: {
    /** Maximum requests per time window */
    maxRequests: number;
    /** Time window in milliseconds */
    windowMs: number;
  };
  /** Custom headers to include with requests */
  headers?: Record<string, string>;
}

/**
 * Complete tenant configuration containing all tenant-specific settings
 * @interface TenantConfig
 */
export interface TenantConfig {
  /** Unique identifier for the tenant */
  id: string;
  /** Display name of the tenant */
  name: string;
  /** Visual branding and customization settings */
  branding: BrandingConfig;
  /** Feature flags controlling available functionality */
  features: FeatureFlags;
  /** API configuration for backend services */
  api: ApiConfig;
}