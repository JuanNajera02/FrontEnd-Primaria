import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSearchComponent } from './report-search.component';

describe('ReportSearchComponent', () => {
  let component: ReportSearchComponent;
  let fixture: ComponentFixture<ReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
