import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
//import { FormatDatePipe } from './Pipes/format-date.pipe';
import { CardComponent } from './Shared/card/card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
//import { PhoneFormatPipe } from './Pipes/phone-format.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from './Shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    //FormatDatePipe,
    CardComponent,
    //PhoneFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatMenuModule,
    NgxPaginationModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
