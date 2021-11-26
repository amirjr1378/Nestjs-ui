import request from './request';

const TOKEN_KEY = 'jwt';

export const loginPost = (payload?: any) => {
  return request.post('/auth/local', {
    body: payload,
  });
};

export const loginSmsPost = (payload?: any) => {
  return request.post('/users-permissions/authorization', { body: payload });
};

export const loginSmsVerifyPost = (payload?: any) => {
  return request.post('/users-permissions/verification', { body: payload });
};

export const getMyInfo = (token?: string) => {
  return request.get(
    '/users/me',
    token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : {},
  );
};

export function getTokenFromLocalStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token?: string) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem(TOKEN_KEY);
}
