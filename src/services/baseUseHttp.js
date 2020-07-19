import useFetch from "use-http";

export const SERVICE_URL = "http://localhost:8080";

export function useHttpInstance(headerParams = {}) {
  const options = {
    cacheLife: 0,
    cachePolicy: "no-cache",
    timeout: 80000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headerParams,
    },
  };
  return useFetch(SERVICE_URL, options);
}
