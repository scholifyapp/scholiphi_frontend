import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const server_url = import.meta.env.VITE_SERVER_URL + '/v1';

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
    const originalRequest = error.config;

    // Handle token refresh for 401 errors
    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
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
      const responseData = error.response.data as any;
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
    (error as any).formattedMessage = errorMessage;
    
    return Promise.reject(error);
  },
);

export default api;
