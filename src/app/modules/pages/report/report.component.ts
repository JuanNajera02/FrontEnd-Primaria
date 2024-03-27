import { Component } from '@angular/core';
import { ReportFormComponent } from './report-form/report-form.component';
import {NavBarComponent} from "../../../core/header/nav-bar/nav-bar.component";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ReportFormComponent, NavBarComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
