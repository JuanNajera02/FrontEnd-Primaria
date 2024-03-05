import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryRegisterComponent } from './monetary-register.component';

describe('MonetaryRegisterComponent', () => {
  let component: MonetaryRegisterComponent;
  let fixture: ComponentFixture<MonetaryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
