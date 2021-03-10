import { TestBed } from '@angular/core/testing';

import { NgAuthService } from './auth.service';

describe('AuthService', () => {
  let service: NgAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
