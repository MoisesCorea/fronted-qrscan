export class AuthDTO {
  user_id: number;
  access_token: string;
  rol: string;
  email: string;
  password: string;

  constructor(
    user_id: number,
    access_token: string,
    rol: string,
    email: string,
    password: string
  ) {
    this.user_id = user_id;
    this.access_token = access_token;
    this.rol = rol;
    this.email = email;
    this.password = password;
  }
}
