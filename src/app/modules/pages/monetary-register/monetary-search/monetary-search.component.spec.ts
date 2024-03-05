import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetarySearchComponent } from './monetary-search.component';

describe('MonetarySearchComponent', () => {
  let component: MonetarySearchComponent;
  let fixture: ComponentFixture<MonetarySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetarySearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
