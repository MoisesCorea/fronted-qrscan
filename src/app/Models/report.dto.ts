export class ReportDTO {
  access_token?: string;
  id?: string;
  name: string;
  department_id: number;
  initial_date: Date;
  end_date: Date;
  event_id: number;

  constructor(
    name: string,
    department_id: number,
    initial_date: Date,
    end_date: Date,
    event_id: number
  ) {
    this.name = name;
    this.department_id = department_id;
    this.initial_date = initial_date;
    this.end_date = end_date;
    this.event_id = event_id;
  }
}
