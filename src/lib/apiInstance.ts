import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const server_url = import.meta.env.VITE_SERVER_URL + '/v1';

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ExtendedAxiosError extends AxiosError {
  formattedMessage?: string;
}

interface ErrorResponseData {
  message?: string;
  errors?: Array<{ message?: string } | string>;
}

const api = axios.create({
  baseURL: server_url,
  withCredentials: true,
});

// Response interceptor: handle token refresh and error formatting
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

    // Handle token refresh for 401 errors
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
        try {
          await api.post('/auth/refresh');
          return api(originalRequest as AxiosRequestConfig);
        } catch (err) {
          console.log('Refresh token expired or invalid', err);
        }
      }

    // Extract and format error message
    let errorMessage = 'An error occurred. Please try again.';

    if (!error.response) {
      errorMessage = 'Unable to connect to the server. Please check your connection and try again.';
      } else {
      const responseData = error.response.data as ErrorResponseData;
      if (error.response.status === 400 && responseData?.errors) {
        const validationErrors = responseData.errors;
        if (Array.isArray(validationErrors) && validationErrors.length > 0) {
          const firstError = validationErrors[0];
          if (typeof firstError === 'object' && firstError !== null && 'message' in firstError) {
            errorMessage = firstError.message as string;
          } else if (typeof firstError === 'string') {
            errorMessage = firstError;
          } else if (responseData?.message) {
            errorMessage = responseData.message;
          }
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        }
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      }
    }

    // Attach formatted error message to error object
    const extendedError = error as ExtendedAxiosError;
    extendedError.formattedMessage = errorMessage;
    
    return Promise.reject(extendedError);
  },
);

export default api;
