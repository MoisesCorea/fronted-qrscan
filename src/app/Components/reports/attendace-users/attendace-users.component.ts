import { Component } from '@angular/core';
import { ReportDTO } from 'src/app/Models/report.dto';
import { EventDTO } from 'src/app/Models/event.dto';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { DepartmentService } from 'src/app/Services/department.service';
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
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-attendace-users',
  templateUrl: './attendace-users.component.html',
  styleUrls: ['./attendace-users.component.scss'],
})
export class AttendaceUsersComponent {
  report: ReportDTO;
  reportData: any;
  eventsList?: EventDTO[];
  departmentsList?: DepartmentDTO[];

  page!: number; // pagination

  initial_date: UntypedFormControl;
  end_date: UntypedFormControl;
  events: UntypedFormControl;
  departments: UntypedFormControl;

  reportForm: UntypedFormGroup;
  isValidForm: boolean | null;

  constructor(
    private reportService: ReportService,
    private sharedService: SharedService,
    private eventtService: EventService,
    private departmentService: DepartmentService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.isValidForm = null;
    this.report = new ReportDTO('', 0, new Date(), new Date(), 0);

    this.initial_date = new UntypedFormControl(
      formatDate(this.report.initial_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.end_date = new UntypedFormControl(
      formatDate(this.report.end_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.events = new UntypedFormControl(null, []);
    this.loadDepartments();

    this.departments = new UntypedFormControl(null, []);

    this.loadEvents();

    this.reportForm = this.formBuilder.group({
      department_id: this.departments,
      initial_date: this.initial_date,
      end_date: this.end_date,
      event_id: this.events,
    });
  }

  getReport(): void {
    let responseOK: boolean = false;
    let errorResponse: any;
    let response: any;

    this.reportService
      .attendanceReportUsaurios(this.report)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );
        })
      )
      .subscribe(
        (data) => {
          this.reportData = data;
          response = data;
          responseOK = true;
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
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

  private loadDepartments(): void {
    let errorResponse: any;

    this.departmentService.getDepartments().subscribe(
      (departments: DepartmentDTO[]) => {
        this.departmentsList = departments;
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
    console.log(this.report);

    this.getReport();
  }
}
