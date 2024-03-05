import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleConfigurationComponent } from './title-configuration.component';

describe('TitleConfigurationComponent', () => {
  let component: TitleConfigurationComponent;
  let fixture: ComponentFixture<TitleConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
