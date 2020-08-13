import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaulerProfileComponent } from './hauler-profile.component';

describe('HaulerProfileComponent', () => {
  let component: HaulerProfileComponent;
  let fixture: ComponentFixture<HaulerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaulerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaulerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
