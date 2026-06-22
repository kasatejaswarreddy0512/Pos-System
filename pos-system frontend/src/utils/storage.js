const TOKEN_KEY = "pos_jwt";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => !!getToken();
