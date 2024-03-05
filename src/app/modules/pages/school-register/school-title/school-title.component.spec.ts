import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTitleComponent } from './school-title.component';

describe('SchoolTitleComponent', () => {
  let component: SchoolTitleComponent;
  let fixture: ComponentFixture<SchoolTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
