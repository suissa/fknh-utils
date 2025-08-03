import axios, { AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';

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


export function createPayload({ 
  data = {}, 
  agent, 
  type = 'request', 
  routingKey, 
  replyTo, 
  origin, 
  destination, 
  version = '1.0.0', 
  inReplyTo 
}: {
  data: any;
  agent: string;
  type: string;
  routingKey: string;
  replyTo: string;
  origin: string;
  destination: string;
  version: string;
  inReplyTo: string;
}) {
  const now = Date.now();
  const correlationId = data.correlationId || uuidv4();

  return {
    meta: {
      type,
      agent,
      origin: origin || agent,
      destination: destination || replyTo || null,
      routingKey: routingKey || (data.number ? `${agent}.${data.number}` : agent),
      replyTo: replyTo || `${agent}.response`,
      correlationId,
      timestamp: now,
      isoDate: new Date(now).toISOString(),
      version,
      inReplyTo: inReplyTo || null,
    },
    data: {
      ...data,
      base64String: data.base64String || data.base64_string,
      number: data.number,
      text: data.text,
      filePath: data.filePath,
    }
  };
}


export async function creatHistoryMessage(numero: string, type: string, text: string, history: any): Promise<boolean> {
  const msg = {
    role: type,
    content: text,
    name: type
  }

  try {
    console.log("Adicionando mensagem ao histórico", msg);
    await history.addToHistory(numero, msg);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar mensagem ao histórico", error);
    return false;
  }
 }

export function extractTextFromUnknownMessage(msg: unknown): string {
  if (typeof msg === 'string') return msg;
  if (typeof msg === 'object' && msg !== null) {
    const m = msg as any;
    return (
      m.conversation ??
      m.text ??
      m.extendedTextMessage?.text ??
      ''
    );
  }
  return '';
}

export function getFrom(request: any) {
  return request.body?.data?.key?.remoteJid;
}

export function getSender(request: any) {
  return request.body?.sender;
}

export function getFromMe(request: any) {
  return request.body?.data?.key?.fromMe;
}

export function getMessage(request: any): string {
  const msg = request.body?.data?.message;
  return typeof msg === 'string' ? msg : msg?.conversation || '';
}
export function getMessageType(request: any) {
  return request.body?.data?.messageType;
}
export function getBase64(request: any) {
  return request.body?.data?.message?.base64;
}
export function getCaption(request: any) {
  return request.body?.data?.message?.imageMessage?.caption;
}