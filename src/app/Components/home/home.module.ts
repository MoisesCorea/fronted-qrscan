import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { SharedModule } from 'src/app/Shared/shared.module';

// Registrar el locale para español
registerLocaleData(localeEs, 'es');

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ZXingScannerModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
