/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Id } from '../types/Id';

const BASE_URL = 'http://localhost:4444';

export const ENDPOINTS = {
  heroes: '/heroes',
  heroById: (id: Id) => `/heroes/${id}`,
};

const instance = axios.create({
  baseURL: BASE_URL,
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    return response.data;
  },

  async post<T>(url: string, data: any) {
    const response = await instance.post<T>(url, data);

    return response.data;
  },

  async patch<T>(url: string, data: any) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
