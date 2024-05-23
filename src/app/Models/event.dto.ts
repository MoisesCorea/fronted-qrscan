export class EventDTO {
  access_token?: string;
  id: number;
  name: string;
  status: number;
  change_attendance: number;
  daily_attendance: number;
  description: string;

  constructor(
    id: number,
    name: string,
    status: number,
    change_attendance: number,
    daily_attendance: number,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.change_attendance = change_attendance;
    this.daily_attendance = daily_attendance;
    this.description = description;
  }
}
