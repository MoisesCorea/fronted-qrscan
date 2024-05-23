import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { UserService } from 'src/app/Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX /*, ...*/,
  ];

  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;
  msg!: string;
  currentDate: Date = new Date();

  constructor(
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  handleQrCodeResult(result: any) {
    let errorResponse: any;

    this.userService.userRegisterattendance(result).subscribe(
      (msg) => {
        alert(msg.message);
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
