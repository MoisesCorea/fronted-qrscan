import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
//import { ZXingScannerComponent } from '@zxing/ngx-scanner';
//import { BarcodeFormat } from '@zxing/library';
import { UserService } from 'src/app/Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/Services/shared.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  msg!: string;
  currentDate: Date = new Date();

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private route: Router
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  handleQrCodeResult(result: any) {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    this.userService
      .userRegisterattendance(result)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.route.navigateByUrl('home');
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
