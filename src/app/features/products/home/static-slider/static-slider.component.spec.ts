import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticSliderComponent } from './static-slider.component';

describe('StaticSliderComponent', () => {
  let component: StaticSliderComponent;
  let fixture: ComponentFixture<StaticSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
