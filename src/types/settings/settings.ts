interface EmailFormState {
  oldPassword: string;
  newEmail: string;
}

interface PasswordFormState {
  oldPassword: string;
  newPassword: string;
}

interface ApiResponse {
  message: string;
  isAuthenticated?: boolean;
}

export type SettingsTypes = {
    EmailFormState: EmailFormState;
    PasswordFormState: PasswordFormState;
    ApiResponse: ApiResponse;
}