/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_CONTACT_ACCESS_KEY?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_ENABLE_CUSTOM_CURSOR?: string;
  readonly VITE_ENABLE_PAGE_LOADER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
