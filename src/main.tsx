import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { validateEnvironmentVariables, formatValidationErrors } from './utils/env'
import './styles/globals.css'

/**
 * Validate environment variables before app startup
 * This ensures tenant deployments fail fast with clear error messages
 */
function validateAppStartup(): void {
  const validation = validateEnvironmentVariables();
  
  if (!validation.isValid) {
    const errorMessage = formatValidationErrors(validation.errors);
    
    // Display user-friendly error in the DOM
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #991b1b;
        ">
          <h1 style="margin: 0 0 1rem 0; color: #dc2626;">
            ⚠️ Environment Configuration Error
          </h1>
          <p style="margin: 0 0 1.5rem 0; font-size: 1.1rem;">
            The application cannot start because required environment variables are missing or invalid.
          </p>
          <div style="
            background: #ffffff;
            border: 1px solid #f87171;
            border-radius: 4px;
            padding: 1rem;
            margin: 1rem 0;
          ">
            <h2 style="margin: 0 0 1rem 0; font-size: 1rem; color: #dc2626;">
              Configuration Errors:
            </h2>
            <pre style="
              margin: 0;
              white-space: pre-wrap;
              font-family: 'Monaco', 'Menlo', monospace;
              font-size: 0.9rem;
              line-height: 1.4;
              color: #7f1d1d;
            ">${errorMessage}</pre>
          </div>
          <p style="margin: 1.5rem 0 0 0; font-size: 0.95rem;">
            <strong>To fix this:</strong><br>
            1. Check your environment file (.env) or deployment configuration<br>
            2. Ensure all required variables are set with valid values<br>
            3. Restart the application after making changes
          </p>
        </div>
      `;
    }
    
    // Also log to console for developers
    console.error('Environment validation failed:', validation.errors);
    
    // Throw error to prevent further execution
    throw new Error(`Environment validation failed: ${errorMessage}`);
  }
  
  console.log('✅ Environment variables validated successfully');
}

// Validate environment before starting the app
validateAppStartup();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)