const TOKEN = "token";
export function authHeaders() {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }
  return {};
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}
export function hasToken() {
  return Boolean(localStorage.getItem(TOKEN));
}
export function deleteToken() {
  localStorage.removeItem(TOKEN);
}
