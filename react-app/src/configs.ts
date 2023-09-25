interface BackendApiConfigValues {
  baseUrl: string;
}

export const backendApiConfig: BackendApiConfigValues = {
  baseUrl: import.meta.env["VITE_BACKEND_URL"],
};
