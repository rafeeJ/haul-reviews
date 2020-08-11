import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDispplayCardComponent } from './product-dispplay-card.component';

describe('ProductDispplayCardComponent', () => {
  let component: ProductDispplayCardComponent;
  let fixture: ComponentFixture<ProductDispplayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDispplayCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDispplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
