interface RegistrationBody {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export type { RegistrationBody };
