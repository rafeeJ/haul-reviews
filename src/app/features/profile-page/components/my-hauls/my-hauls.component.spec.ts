import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHaulsComponent } from './my-hauls.component';

describe('MyHaulsComponent', () => {
  let component: MyHaulsComponent;
  let fixture: ComponentFixture<MyHaulsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHaulsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHaulsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
