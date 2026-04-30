import { api } from './client';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', {
    email,
    password,
  });

  return response.data;
}

export function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('accessToken'));
}