import { TestBed } from '@angular/core/testing';

import { RxjsTestService } from './rxjs-test.service';

describe('RxjsTestService', () => {
  let service: RxjsTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
