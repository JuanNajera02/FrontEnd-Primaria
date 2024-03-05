import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryTitleComponent } from './monetary-title.component';

describe('MonetaryTitleComponent', () => {
  let component: MonetaryTitleComponent;
  let fixture: ComponentFixture<MonetaryTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
