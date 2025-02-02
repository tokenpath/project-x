// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data?: T;
  message: string;
  status: number;
}

export interface ApiError {
    message: string;
    errors?: string[];  
    status?: number;
    code?: string;      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;     
  }