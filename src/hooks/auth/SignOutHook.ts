import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/types/api/responses';

export const SignOutHook = () => {
  const signout = async (): Promise<ApiResponse> => {
    try {
      const response = await axios.post<ApiResponse>('/api/auth/signout');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw {
          message: error.response?.data?.message || 'Network error occurred',
          errors: error.response?.data?.errors
        };
      }
      if (error instanceof Error) {
        throw {
          message: error.message,
        };
      }
      throw {
        message: 'An unexpected error occurred',
      };
    }
  };

  return useMutation<ApiResponse, ApiError, void>({
    mutationFn: signout,
    onSuccess: () => {
      window.location.href = '/';
    },
  });
};
