export const storage = {
  getToken: () => localStorage.getItem('@events.token'),
  setToken: (token: string) => localStorage.setItem('@events.token', token),
  clearToken: () => localStorage.removeItem('@events.token'),
};