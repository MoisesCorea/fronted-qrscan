import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostDTO } from 'src/app/Models/post.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  reportData!: any;
  chartOptions: any;

  filterInput: string = '';
  page!: number;

  constructor(
    private sharedService: SharedService,
    private reportService: ReportService
  ) {
    this.getReport();
  }

  ngOnInit(): void {}

  getReport(): void {
    let errorResponse: any;
    this.reportService.getDailyAttendace().subscribe(
      (data) => {
        this.reportData = data;
        console.log(data); // Para depuración
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
        console.error('Error:', error);
      }
    );
  }

  chartPie(valor1: number, valor2: number): any {
    this.chartOptions = {
      title: {
        text: 'Registro de asistencia',
      },
      axisY: {
        includeZero: true,
      },
      animationEnabled: true,
      data: [
        {
          type: 'pie',
          indexLabel: '{y}',
          yValueFormatString: '#,###',
          dataPoints: [
            { label: 'Usuarios con registro de asistencia', y: valor1 },
            {
              label: 'Usuarios sin registro de asistencia',
              y: valor2 - valor1,
            },
          ],
        },
      ],
    };

    return this.chartOptions;
  }

  chartBar(valor1: number, valor2: number): any {
    this.chartOptions = {
      title: {
        text: 'Estatus de usuarios',
      },
      axisY: {
        includeZero: true,
      },
      animationEnabled: true,
      data: [
        {
          type: 'bar',
          indexLabel: '{y}',
          yValueFormatString: '#,###',
          dataPoints: [
            { label: 'Usuarios activos', y: valor1 },
            {
              label: 'Usuarios inactivos',
              y: valor2,
            },
          ],
        },
      ],
    };

    return this.chartOptions;
  }
}
