import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryFormComponent } from './monetary-form.component';

describe('MonetaryFormComponent', () => {
  let component: MonetaryFormComponent;
  let fixture: ComponentFixture<MonetaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
