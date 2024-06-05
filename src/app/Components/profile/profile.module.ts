import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{ path: '', component: ProfileComponent }];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
