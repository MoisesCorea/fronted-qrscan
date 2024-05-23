import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShiftService, deleteResponse } from 'src/app/Services/shift.service';
import { ShiftDTO } from 'src/app/Models/shift.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.scss'],
})
export class ShiftListComponent {
  shifts?: ShiftDTO[];
  filterInput: string = ''; //PipeFilter
  page!: number; // pagination

  constructor(
    private shiftService: ShiftService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private route: Router
  ) {
    this.loadShifts();
  }

  private loadShifts(): void {
    let errorResponse: any;

    this.shiftService.getShifts().subscribe(
      (shifts: ShiftDTO[]) => {
        this.shifts = shifts;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  createShift(): void {
    this.route.navigateByUrl('/turno/item/');
  }

  updateShift(rolId: number): void {
    this.route.navigateByUrl('/turno/item/' + rolId);
  }

  deleteShift(adminId: number): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete category with id: ' + adminId + ' .');
    if (result) {
      this.shiftService.deleteShift(adminId).subscribe(
        (rowsAffected: deleteResponse) => {
          if (rowsAffected.affected > 0) {
            this.loadShifts();
          }
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }
}
