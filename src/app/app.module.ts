import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AdminFormComponent } from './Components/admins/admin-form/admin-form.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { FormatDatePipe } from './Pipes/format-date.pipe';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AdminListComponent } from './Components/admins/admin-list/admin-list.component';
import { RolesListComponent } from './Components/roles/roles-list/roles-list.component';
import { RolesFormComponent } from './Components/roles/roles-form/roles-form.component';
import { DepartmentListComponent } from './Components/department/department-list/department-list.component';
import { DepartmentFormComponent } from './Components/department/department-form/department-form.component';
import { EventListComponent } from './Components/event/event-list/event-list.component';
import { EventFormComponent } from './Components/event/event-form/event-form.component';
import { ShiftFormComponent } from './Components/shift/shift-form/shift-form.component';
import { ShiftListComponent } from './Components/shift/shift-list/shift-list.component';
import { UserListComponent } from './Components/user/user-list/user-list.component';
import { UserFormComponent } from './Components/user/user-form/user-form.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CardComponent } from './Shared/card/card.component';
import { UsersCardComponent } from './Components/reports/users-card/user-card.component';
import { UserCardComponent } from './Components/reports/user-card/user-card.component';
import { AttendanceUserComponent } from './Components/reports/attendance-user/attendance-user.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { PhoneFormatPipe } from './Pipes/phone-format.pipe';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FilterDashboardPipe } from './Pipes/filterDashboard.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './Pipes/filter.pipe';

// Registrar el locale para español
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    AdminFormComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    FormatDatePipe,
    DashboardComponent,
    AdminListComponent,
    RolesListComponent,
    RolesFormComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    EventListComponent,
    EventFormComponent,
    ShiftFormComponent,
    ShiftListComponent,
    UserListComponent,
    UserFormComponent,
    CardComponent,
    UsersCardComponent,
    UserCardComponent,
    AttendanceUserComponent,
    PhoneFormatPipe,
    FilterDashboardPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgQrScannerModule,
    ZXingScannerModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatMenuModule,
    NgxPaginationModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }, // Proveer LOCALE_ID
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
