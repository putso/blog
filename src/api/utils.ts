const BASE_URL = `https://blog.kata.academy/api`;
export function apiCreate(baseUrl: string) {
  return async ({
    path,
    method = "GET",
    body = {},
    searchParams = {},
    headers = {},
  }: {
    path: string;
    method?: "POST" | "GET" | "DELETE" | "PUT";
    body?: object;
    headers?: { [n: string]: string };
    searchParams?: { [n: string]: string | number };
  }) => {
    const params = new URLSearchParams({});
    Object.entries({ ...searchParams }).forEach(([key, value]) =>
      params.append(key, String(value)),
    );
    const url = `${baseUrl}${path}?${params.toString()}`;
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: ["POST", "PUT"].includes(method) ? JSON.stringify(body) : undefined,
    });
    const json = await response.json();
    return json;
  };
}

export const getFetch = apiCreate(BASE_URL);
