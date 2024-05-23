export class UserDTO {
  access_token?: string;
  id: string;
  name: string;
  last_name: string;
  age: number;
  gender: string;
  email: string;
  address: string;
  phone_number: number;
  profile_image: string;
  qr_image: string;
  shift_id: number;
  department_id: number;
  status: string;

  constructor(
    id: string,
    name: string,
    last_name: string,
    age: number,
    gender: string,
    email: string,
    address: string,
    phone_number: number,
    profile_image: string,
    qr_image: string,
    shift_id: number,
    department_id: number,
    status: string
  ) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.address = address;
    this.phone_number = phone_number;
    this.profile_image = profile_image;
    this.qr_image = qr_image;
    this.shift_id = shift_id;
    this.department_id = department_id;
    this.status = status;
  }
}
