import { Role } from './Role';

export interface Register {
  usuario: string;
  idRol: Role;
  email: string;
  password: string;
  passwordVerification: string;
}


export interface Register2 {
  usuario: string;
  idRol: string;
  email: string;
  password: string;
  passwordVerification: string;
}

