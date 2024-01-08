/* eslint-disable no-param-reassign */
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

/* The code `const axiosInstance = axios.create({ ... })` creates an instance of
the Axios library with custom configuration options. */
const apiAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MDQ3MTYzMDcsImV4cCI6MTcwNDcxOTkwN30.l7_dFa7mHGKjMEFTPgKd9xmYU5eFcFGqC1NJwO7zavUDMe9UGtzQXhwtWnA8I0jN',
  },
});

/**
 * The `api` function returns an object with methods for making HTTP requests using
 * Axios.
 * @param {AxiosInstance} _axios - The `_axios` parameter is an instance of the
 * Axios library. Axios is a popular JavaScript library used for making HTTP
 * requests from a browser or Node.js. It provides a simple and elegant API for
 * handling asynchronous HTTP requests.
 * @returns The `api` function returns an object with four methods: `get`, `put`,
 * `post`, and `delete`. Each method makes an HTTP request using the provided Axios
 * instance (`_axios`). The methods return a Promise that resolves to the response
 * data.
 */
const apiAxios = (_axios: AxiosInstance) => {
  return {
    get<T>(url: string, config: AxiosRequestConfig = {}) {
      return _axios.get<T>(url, config);
    },
    put<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
      return _axios.put<T>(url, body, config);
    },
    post<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
      return _axios.post<T>(url, body, config);
    },
    delete<T>(url: string, config: AxiosRequestConfig = {}) {
      return _axios.delete<T>(url, config);
    },
  };
};

export default apiAxios(apiAxiosInstance);
