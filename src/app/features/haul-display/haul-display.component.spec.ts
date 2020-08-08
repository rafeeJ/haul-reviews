import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaulDisplayComponent } from './haul-display.component';

describe('HaulDisplayComponent', () => {
  let component: HaulDisplayComponent;
  let fixture: ComponentFixture<HaulDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaulDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaulDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
