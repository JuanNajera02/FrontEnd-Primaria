import { Role } from './Role';

export interface Register {
  user: string;
  role: Role;
  email: string;
  password: string;
  passwordVerification: string;
}
