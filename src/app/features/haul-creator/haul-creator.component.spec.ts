import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaulCreatorComponent } from './haul-creator.component';

describe('HaulCreatorComponent', () => {
  let component: HaulCreatorComponent;
  let fixture: ComponentFixture<HaulCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaulCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaulCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
