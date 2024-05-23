export class RolesDTO {
  user_id?: string;
  access_token?: string;
  id: number;
  name: string;
  description: string;

  constructor(rolId: number, name: string, description: string) {
    this.id = rolId;
    this.name = name;
    this.description = description;
  }
}
