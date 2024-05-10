import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedSchoolsListComponent } from './assigned-schools-list.component';

describe('AssignedSchoolsListComponent', () => {
  let component: AssignedSchoolsListComponent;
  let fixture: ComponentFixture<AssignedSchoolsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedSchoolsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedSchoolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
