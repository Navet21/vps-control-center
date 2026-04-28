import { api } from './client';

export async function getAuditLogs() {
  const response = await api.get('/audit');
  return response.data;
}