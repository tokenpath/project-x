import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SignInSchema, SignInData } from "@/lib/zod/auth";
import { ApiError, ApiResponse } from '@/types/api/responses';

export const SignInHook = () => {
  const signin = async (data: SignInData): Promise<ApiResponse> => {
    try {
      const validatedData = SignInSchema.parse(data);
      const response = await axios.post<ApiResponse>('/api/auth/signin', validatedData);
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

  return useMutation<ApiResponse, ApiError, SignInData>({
    mutationFn: signin,
  });
};
