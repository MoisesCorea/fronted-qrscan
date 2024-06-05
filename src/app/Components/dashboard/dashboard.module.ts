import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FilterDashboardPipe } from 'src/app/Pipes/filterDashboard.pipe';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent, FilterDashboardPipe],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule,
    CanvasJSAngularChartsModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
