import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EventDTO } from 'src/app/Models/event.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { EventService } from 'src/app/Services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  event: EventDTO;
  eventCkeck: { status: number } = { status: 0 };

  name: UntypedFormControl;
  change_attendance: UntypedFormControl;

  description: UntypedFormControl;

  eventForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private eventId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private eventService: EventService
  ) {
    this.event = new EventDTO(0, '', 0, 0, 0, '');
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdateMode = false;
    this.isValidForm = null;

    this.name = new UntypedFormControl(this.event.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.change_attendance = new UntypedFormControl('', [
      Validators.required,
      Validators.max(99999),
    ]);

    this.description = new UntypedFormControl(this.event.description, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.eventForm = this.formBuilder.group({
      name: this.name,
      change_attendance: this.change_attendance,
      description: this.description,
    });
  }

  ngOnInit(): void {
    let errorResponse: any;
    // update
    if (this.eventId) {
      this.isUpdateMode = true;

      this.eventService.geteventById(parseInt(this.eventId)).subscribe(
        (event: EventDTO) => {
          this.event = event;

          this.name.setValue(this.event.name);
          this.change_attendance.setValue(this.event.change_attendance);

          this.description.setValue(this.event.description);

          this.eventForm = this.formBuilder.group({
            name: this.name,
            change_attendance: this.change_attendance,
            description: this.description,
          });
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }

  createEvent(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.eventForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.event = this.eventForm.value;

    console.log(this.event);

    this.eventService
      .createEvent(this.event)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.eventForm.reset();
            this.router.navigateByUrl('eventos');
          }
        })
      )
      .subscribe(
        (data) => {
          response = data;
          responseOK = true;
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
  }

  private editEvent(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    if (this.eventId) {
      this.eventService
        .updateEvent(this.eventId, this.event)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.router.navigateByUrl('eventos');
            }
          })
        )
        .subscribe(
          (data) => {
            response = data;
            responseOK = true;
          },
          (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
    }
  }

  saveEvent(): void {
    this.isValidForm = false;
    if (this.eventForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.event = this.eventForm.value;

    if (this.isUpdateMode) {
      this.editEvent();
    } else {
      this.createEvent();
    }
  }
}
