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
import { ShiftDTO } from 'src/app/Models/shift.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { ShiftService } from 'src/app/Services/shift.service';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.scss'],
})
export class ShiftFormComponent implements OnInit {
  shift: ShiftDTO;

  name: UntypedFormControl;
  entry_time: UntypedFormControl;
  finish_time: UntypedFormControl;
  shift_duration: UntypedFormControl;
  mothly_late_allowance: UntypedFormControl;
  days!: UntypedFormControl;

  shiftForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private shiftId: string | null;

  weekDays = [
    { id: 0, name: 'Domingo' },
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miercoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sábado' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private shiftService: ShiftService
  ) {
    this.shift = new ShiftDTO(0, '', '', '', 0, 0, '');
    this.shiftId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdateMode = false;
    this.isValidForm = null;

    this.name = new UntypedFormControl(this.shift.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.entry_time = new UntypedFormControl(this.shift.entry_time, [
      Validators.required,
    ]);

    this.finish_time = new UntypedFormControl(this.shift.finish_time, [
      Validators.required,
    ]);

    this.shift_duration = new UntypedFormControl('', [Validators.required]);

    this.mothly_late_allowance = new UntypedFormControl('', [
      Validators.required,
    ]);

    this.days = new UntypedFormControl(null, []);

    this.shiftForm = this.formBuilder.group({
      name: this.name,
      entry_time: this.entry_time,
      finish_time: this.finish_time,
      shift_duration: this.shift_duration,
      mothly_late_allowance: this.mothly_late_allowance,
      days: this.days,
    });
  }

  ngOnInit(): void {
    let errorResponse: any;
    // update
    if (this.shiftId) {
      this.isUpdateMode = true;

      this.shiftService.getShiftById(parseInt(this.shiftId)).subscribe(
        (shift: ShiftDTO) => {
          this.shift = shift;

          this.name.setValue(this.shift.name);
          this.entry_time.setValue(this.shift.entry_time);
          this.finish_time.setValue(this.shift.finish_time);
          this.shift_duration.setValue(this.shift.shift_duration);
          this.mothly_late_allowance.setValue(this.shift.mothly_late_allowance);

          let daysArray: number[] = JSON.parse(this.shift.days);

          this.days.setValue(daysArray);

          this.shiftForm = this.formBuilder.group({
            name: this.name,
            entry_time: this.entry_time,
            finish_time: this.finish_time,
            shift_duration: this.shift_duration,
            mothly_late_allowance: this.mothly_late_allowance,
            days: this.days,
          });
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }

  createShift(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.shiftForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.shift = this.shiftForm.value;

    console.log(this.shift);

    this.shiftService
      .createShift(this.shift)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.shiftForm.reset();
            this.router.navigateByUrl('horarios');
          }
        })
      )
      .subscribe(
        (data) => {
          response = data;
          responseOK = true;
        },
        (error: HttpErrorResponse) => {
          responseOK = false;
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
  }

  private editShift(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    if (this.shiftId) {
      this.shiftService
        .updateShift(this.shiftId, this.shift)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.router.navigateByUrl('horarios');
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

  saveShift(): void {
    this.isValidForm = false;
    if (this.shiftForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.shift = this.shiftForm.value;

    if (this.isUpdateMode) {
      this.editShift();
    } else {
      this.createShift();
    }
  }
}
