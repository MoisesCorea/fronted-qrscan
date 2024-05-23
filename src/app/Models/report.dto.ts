export class ReportDTO {
  access_token?: string;
  id?: string;
  email: string;
  initial_date: Date;
  end_date: Date;
  event_id: number;

  constructor(
    email: string,
    initial_date: Date,
    end_date: Date,
    event_id: number
  ) {
    this.email = email;
    this.initial_date = initial_date;
    this.end_date = end_date;
    this.event_id = event_id;
  }
}
