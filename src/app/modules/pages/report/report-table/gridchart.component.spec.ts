import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridchartComponent } from './gridchart.component';

describe('GridchartComponent', () => {
  let component: GridchartComponent;
  let fixture: ComponentFixture<GridchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
