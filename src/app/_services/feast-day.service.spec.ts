import { TestBed } from '@angular/core/testing';

import { FeastDayService } from './feast-day.service';

describe('FeastDayService', () => {
  let service: FeastDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeastDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
