import { Component, Inject, OnInit } from '@angular/core';
import { ReportDTO } from 'src/app/Models/report.dto';
import { EventDTO } from 'src/app/Models/event.dto';
import { ReportService } from 'src/app/Services/report.service';
import { UserDTO } from 'src/app/Models/user.dto';
import { UserService } from 'src/app/Services/user.service';
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
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-attendance-user',
  templateUrl: './attendance-user.component.html',
  styleUrls: ['./attendance-user.component.scss'],
})
export class AttendanceUserComponent implements OnInit {
  report: ReportDTO;
  reportData: any;
  eventsList?: EventDTO[];
  usersList: UserDTO[] = [];
  filteredUsers: UserDTO[] = [];

  name: UntypedFormControl;
  initial_date: UntypedFormControl;
  end_date: UntypedFormControl;
  events: UntypedFormControl;

  reportForm: UntypedFormGroup;
  isValidForm: boolean | null;

  filterInput: string = '';

  constructor(
    private reportService: ReportService,
    private sharedService: SharedService,
    private eventtService: EventService,
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    @Inject(LoaderService) private loaderService: LoaderService
  ) {
    this.isValidForm = null;
    this.report = new ReportDTO('', 0, new Date(), new Date(), 0);

    this.name = new UntypedFormControl('', [Validators.required]);

    this.initial_date = new UntypedFormControl(
      formatDate(this.report.initial_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.end_date = new UntypedFormControl(
      formatDate(this.report.end_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.events = new UntypedFormControl(null, []);

    this.reportForm = this.formBuilder.group({
      name: this.name,
      initial_date: this.initial_date,
      end_date: this.end_date,
      event_id: this.events,
    });
  }
  ngOnInit(): void {
    this.loadEvents();

    this.loadUsers();

    this.reportForm.get('name')?.valueChanges.subscribe((value) => {
      this.filterUsers(value);
    });
  }

  getReport(): void {
    let responseOK: boolean = false;
    let errorResponse: any;
    let response: any;

    this.reportService
      .attendanceReportUsaurio(this.report)
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
    this.loaderService.show();
    let errorResponse: any;

    this.eventtService.getEvents().subscribe(
      (events: EventDTO[]) => {
        this.eventsList = events;
        this.loaderService.hide();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
        this.loaderService.hide();
      }
    );
  }

  private loadUsers(): void {
    let errorResponse: any;

    this.userService.getUsers().subscribe(
      (users: UserDTO[]) => {
        this.usersList = users;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  private filterUsers(value: string): void {
    if (value.trim() === '') {
      this.filteredUsers = [];
    } else {
      this.filteredUsers = this.usersList.filter((user) =>
        (user.name + ' ' + user.last_name)
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    }
  }

  selectUser(user: UserDTO): void {
    this.reportForm.get('name')?.setValue(`${user.name} ${user.last_name}`);
    this.filteredUsers = [];
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
