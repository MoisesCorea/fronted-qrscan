import { Component } from '@angular/core';
import { ReportDTO } from 'src/app/Models/report.dto';
import { EventDTO } from 'src/app/Models/event.dto';
import { ReportService } from 'src/app/Services/report.service';
import { SharedService } from 'src/app/Services/shared.service';
import { EventService } from 'src/app/Services/event.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-attendance-user',
  templateUrl: './attendance-user.component.html',
  styleUrls: ['./attendance-user.component.scss'],
})
export class AttendanceUserComponent {
  report: ReportDTO;
  reportData: any;
  eventsList?: EventDTO[];

  email: UntypedFormControl;
  initial_date: UntypedFormControl;
  end_date: UntypedFormControl;
  events: UntypedFormControl;

  reportForm: UntypedFormGroup;
  isValidForm: boolean | null;

  constructor(
    private reportService: ReportService,
    private sharedService: SharedService,
    private eventtService: EventService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.isValidForm = null;
    this.report = new ReportDTO('', new Date(), new Date(), 0);

    this.email = new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.initial_date = new UntypedFormControl(
      formatDate(this.report.initial_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.end_date = new UntypedFormControl(
      formatDate(this.report.end_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.events = new UntypedFormControl(null, []);

    this.loadEvents();

    this.reportForm = this.formBuilder.group({
      email: this.email,
      initial_date: this.initial_date,
      end_date: this.end_date,
      event_id: this.events,
    });
  }

  getReport(): void {
    let errorResponse: any;
    this.reportService.attendanceReportUsaurio(this.report).subscribe(
      (data) => {
        this.reportData = data;
        console.log(data); // Para depuración
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
        console.error('Error:', error);
      }
    );
  }

  private loadEvents(): void {
    let errorResponse: any;

    this.eventtService.getEvents().subscribe(
      (events: EventDTO[]) => {
        this.eventsList = events;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  onSubmit() {
    this.isValidForm = false;

    if (this.reportForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.report = this.reportForm.value;

    this.getReport();
  }
}
