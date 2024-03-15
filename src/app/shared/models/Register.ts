import { Role } from './Role';

export interface Register {
  usuario: string;
  idRol: Role;
  email: string;
  password: string;
  passwordVerification: string;
}
