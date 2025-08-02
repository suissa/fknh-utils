import axios, { AxiosRequestConfig } from 'axios';

export async function httpGet<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axios.get<T>(url, config);
  return data;
}

export async function httpPost<T = any>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axios.post<T>(url, body, config);
  return data;
}

export async function httpPut<T = any>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axios.put<T>(url, body, config);
  return data;
}

export async function httpPatch<T = any>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axios.patch<T>(url, body, config);
  return data;
}

export async function httpDelete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axios.delete<T>(url, config);
  return data;
}

// Exemplo de uso:
// const user = await httpGet<User>('https://api.meusite.com/user/1');
// const criado = await httpPost('/api/itens', { nome: 'Dipirona' });
// const atualizado = await httpPut('/api/itens/1', { nome: 'Novo nome' });
