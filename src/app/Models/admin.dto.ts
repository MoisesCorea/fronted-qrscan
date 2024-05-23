export class AdminDTO {
  id?: number;
  access_token?: string;
  name: string;
  last_name: string;
  email: string;
  alias: string;
  password: string;
  rol_id: number;

  constructor(
    name: string,
    last_name: string,
    email: string,
    alias: string,
    password: string,
    rol_id: number
  ) {
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.alias = alias;
    this.password = password;
    this.rol_id = rol_id;
  }
}
