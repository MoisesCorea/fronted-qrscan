import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  async managementToast(
    element: string,
    validRequest: boolean,
    error?: ResponseError,
    response?: any
  ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk';
        toastMsg.innerHTML =
          '<h6><i class="fa-solid fa-circle-check"></i> Éxito </h6>' +
          '<p>' +
          response.message;
        +'</p>';
        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        error?.statusCode === 409
          ? (toastMsg.className = 'show requestAl')
          : (toastMsg.className = 'show requestKo');

        toastMsg.innerHTML =
          `<h6>${
            error?.statusCode === 409
              ? '<i class="fa-solid fa-circle-info"></i> Información'
              : '<i class="fa-solid fa-triangle-exclamation"></i> Ha ocurrido un error!'
          }</h6>` +
          `<p>${error?.message}</p>` +
          `${
            error?.messageDetail
              ? `<p>Detalles: ${error.messageDetail}</p>`
              : ''
          }`;

        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error('path:', error.path);
    console.error('timestamp:', error.timestamp);
    console.error('message:', error.message);
    console.error('messageDetail:', error.messageDetail);
    console.error('statusCode:', error.statusCode);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
