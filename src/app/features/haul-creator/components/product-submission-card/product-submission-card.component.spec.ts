import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubmissionCardComponent } from './product-submission-card.component';

describe('ProductSubmissionCardComponent', () => {
  let component: ProductSubmissionCardComponent;
  let fixture: ComponentFixture<ProductSubmissionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubmissionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubmissionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
