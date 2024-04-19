import axios, { AxiosResponse } from "axios";
import qs from 'qs';

export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  result: T | null;
}

const api = axios.create();

api.interceptors.request.use(
  function (config) {
    config.baseURL = process.env.API_ROOT;
    return config;
  },
  function (error) {
    // Do something with re\quest error
    return Promise.reject(error);
  },
);

async function get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
  try {
    const queryString = qs.stringify(params);
    const requestURL = queryString ? `${endpoint}?${queryString}` : endpoint;
    const response: AxiosResponse<T> = await api.get(requestURL);
    return response.data as ApiResponse<T>;
  } catch (error) {
    console.error('GET request error: ' + endpoint, params);
    const newObj: ApiResponse<T> = {
      isSuccess: false,
      message: 'Có lỗi xảy ra, vui lòng thử lại',
      result: null,
    };
    return newObj;
  }
}

async function post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, data);
    return response.data as ApiResponse<T>;
  } catch (error) {
    console.error('POST request error: ' + endpoint, data, error);
    const newObj: ApiResponse<T> = {
      isSuccess: false,
      message: 'Có lỗi xảy ra, vui lòng thử lại',
      result: null,
    };
    return newObj;
  }
}

export { get, post };