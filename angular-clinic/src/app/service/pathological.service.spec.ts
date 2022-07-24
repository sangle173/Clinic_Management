import { TestBed } from '@angular/core/testing';

import { PathologicalService } from './pathological.service';

describe('PathologicalService', () => {
  let service: PathologicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathologicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
