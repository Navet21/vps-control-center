import { api } from "./client";

export async function getSystemStatus() {
  const response = await api.get('/system/status');
  return response.data;
}