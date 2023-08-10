import { TestBed } from '@angular/core/testing';

import { RecruterService } from './recruter.service';

describe('RecruterService', () => {
  let service: RecruterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
