/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TENANT_ID?: string;
  readonly VITE_TENANT_PRIMARY_COLOR?: string;
  readonly VITE_TENANT_LOGO_URL?: string;
  readonly VITE_TENANT_COMPANY_NAME?: string;
  readonly VITE_TENANT_API_URL?: string;
  readonly VITE_TENANT_SECONDARY_COLOR?: string;
  readonly VITE_TENANT_FAVICON_URL?: string;
  readonly VITE_TENANT_API_TIMEOUT?: string;
  readonly VITE_TENANT_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}