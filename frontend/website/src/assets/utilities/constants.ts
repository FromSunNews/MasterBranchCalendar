const runtimeEnvironment = import.meta.env.VITE_ENVIRONMENT;

const API_ROOT = {
  "DEV": import.meta.env.VITE_DEV_API_ROOT,
  "PROD": import.meta.env.VITE_API_ROOT
}

export function getAPIRoot() {
  switch (runtimeEnvironment) {
    case "prod": return API_ROOT.PROD;
    case "dev":
    default: return API_ROOT.DEV;
  }
}
