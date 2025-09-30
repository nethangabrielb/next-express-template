interface RegistrationBody {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export type { RegistrationBody, LoginBody };
