# Skeleton Frontend

A modern React TypeScript frontend application template with comprehensive environment variable validation for tenant deployments.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file with the required tenant configuration:
   ```env
   # Required tenant configuration
   VITE_TENANT_ID=your-tenant-id
   VITE_TENANT_PRIMARY_COLOR=#3B82F6
   VITE_TENANT_LOGO_URL=https://example.com/logo.png
   VITE_TENANT_COMPANY_NAME=Your Company Name
   VITE_TENANT_API_URL=https://api.example.com

   # Optional configuration (with defaults)
   VITE_TENANT_SECONDARY_COLOR=#3B82F680
   VITE_TENANT_FAVICON_URL=https://example.com/favicon.ico
   VITE_TENANT_API_TIMEOUT=10000
   VITE_TENANT_DEBUG=false
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Environment Variable Validation

This application includes a robust environment variable validation system that ensures tenant deployments fail fast with clear error messages when configuration is missing or invalid.

### Required Variables

| Variable | Description | Format | Example |
|----------|-------------|--------|---------|
| `VITE_TENANT_ID` | Unique tenant identifier | Non-empty string | `client-123` |
| `VITE_TENANT_PRIMARY_COLOR` | Primary brand color | Hex color | `#3B82F6` or `#36f` |
| `VITE_TENANT_LOGO_URL` | Tenant logo URL | Valid URL | `https://example.com/logo.png` |
| `VITE_TENANT_COMPANY_NAME` | Company display name | Non-empty string | `Acme Corporation` |
| `VITE_TENANT_API_URL` | API base URL | Valid URL | `https://api.example.com` |

### Optional Variables

| Variable | Description | Default | Format |
|----------|-------------|---------|--------|
| `VITE_TENANT_SECONDARY_COLOR` | Secondary brand color | Primary color + `80` opacity | Hex color |
| `VITE_TENANT_FAVICON_URL` | Favicon URL | Same as logo URL | Valid URL |
| `VITE_TENANT_API_TIMEOUT` | API timeout in milliseconds | `10000` | Number |
| `VITE_TENANT_DEBUG` | Enable debug mode | `false` | `true`, `false`, `1`, `0` |

### Validation Features

- **Fail-fast startup**: Application won't start with invalid configuration
- **Format validation**: URLs, hex colors, numbers, and booleans are validated
- **Clear error messages**: Detailed feedback about what's wrong and expected format
- **Performance caching**: Validation results are cached for 5 seconds
- **Type safety**: TypeScript interfaces ensure compile-time safety

### Usage in Code

```typescript
import { getEnvVar, validateEnvironmentVariables } from './utils/env'

// Get a specific environment variable (type-safe)
const tenantId = getEnvVar('VITE_TENANT_ID')
const primaryColor = getEnvVar('VITE_TENANT_PRIMARY_COLOR')

// Validate environment (useful for testing)
const validation = validateEnvironmentVariables()
if (!validation.isValid) {
  console.error('Environment validation failed:', validation.errors)
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript type checking

### Project Structure

```
src/
├── app/                 # App-wide setup and providers
├── components/          # Reusable UI components (Atomic Design)
├── utils/               # Utility functions including env validation
├── types/               # TypeScript type definitions
└── styles/              # Global styles and Tailwind config
```

### Technology Stack

- **React 18+** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Vitest** for testing
- **ESLint & Prettier** for code quality

## Deployment

The environment variable validation system is designed for multi-tenant deployments where each deployment requires specific configuration. When environment variables are missing or invalid:

1. **Development**: Clear error overlay with validation details
2. **Production**: Graceful error page with configuration guidance
3. **Build time**: Validation can be run as part of CI/CD pipeline

For deployment-specific configuration, ensure all required environment variables are set in your deployment environment (Docker, Vercel, Netlify, etc.).

## Contributing

1. Follow the branching strategy in `docs/branching-strategy.md`
2. Adhere to coding standards in `docs/coding-strategy.md`
3. Include tests for new functionality
4. Ensure environment validation passes before deployment