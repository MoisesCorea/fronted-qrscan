import { Time } from '@angular/common';

export class ShiftDTO {
  access_token?: string;
  id: number;
  name: string;
  entry_time: string;
  finish_time: string;
  shift_duration: number;
  mothly_late_allowance: number;
  days: string;

  constructor(
    id: number,
    name: string,
    entry_time: string,
    finish_time: string,
    shift_duration: number,
    mothly_late_allowance: number,
    days: string
  ) {
    this.id = id;
    this.name = name;
    this.entry_time = entry_time;
    this.finish_time = finish_time;
    this.shift_duration = shift_duration;
    this.mothly_late_allowance = mothly_late_allowance;
    this.days = days;
  }
}
