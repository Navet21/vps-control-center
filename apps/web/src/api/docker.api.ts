import { api } from './client';

export async function getContainers() {
  const response = await api.get('/docker/containers');
  return response.data;
}

export async function getLogs(service: string) {
  const response = await api.get(`/docker/logs/${service}`);
  return response.data;
}

export async function restartService(service: string) {
  const response = await api.post(`/docker/restart/${service}`);
  return response.data;
}

export async function getServices() {
  const response = await api.get('/docker/services');
  return response.data;
}