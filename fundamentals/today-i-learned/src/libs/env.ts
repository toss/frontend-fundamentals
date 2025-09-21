interface EnvConfig {
  API_BASE_URL: string;
  GITHUB_TOKEN?: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
}

function parseEnvConfig(): EnvConfig {
  return {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
    GITHUB_OWNER: "toss",
    GITHUB_REPO: "frontend-fundamentals"
  };
}

function validateEnvConfig(config: EnvConfig): void {
  const isLocalhost =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  if (isLocalhost && !config.GITHUB_TOKEN) {
    console.warn(
      "VITE_GITHUB_TOKEN is not set. May encounter API rate limits."
    );
  }
}

export const ENV_CONFIG = parseEnvConfig();

validateEnvConfig(ENV_CONFIG);

export const isDevelopment = () => import.meta.env.DEV;
export const isLocalhost = () =>
  typeof window !== "undefined" && window.location.hostname === "localhost";
