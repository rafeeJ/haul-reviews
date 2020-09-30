import { TestBed } from '@angular/core/testing';

import { HaulCreatorService } from './haul-creator.service';

describe('HaulCreatorService', () => {
  let service: HaulCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaulCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
