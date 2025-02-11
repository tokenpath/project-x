import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SettingsSchema, SettingsData } from "@/lib/zod/auth";
import { ApiError, ApiResponse } from '@/types/api/responses';

export const SettingsHook = () => {
  const updateSettings = async (data: SettingsData): Promise<ApiResponse> => {
    try {
      const validatedData = SettingsSchema.parse(data);
      const response = await axios.post<ApiResponse>('/api/auth/settings', validatedData);
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

  return useMutation<ApiResponse, ApiError, SettingsData>({
    mutationFn: updateSettings,
  });
};
