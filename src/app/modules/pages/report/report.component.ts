import { Component } from '@angular/core';
import { ReportFormComponent } from './report-form/report-form.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ReportFormComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
