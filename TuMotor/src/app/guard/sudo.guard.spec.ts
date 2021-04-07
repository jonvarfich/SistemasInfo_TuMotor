import { TestBed } from '@angular/core/testing';

import { SudoGuard } from './sudo.guard';

describe('SudoGuard', () => {
  let guard: SudoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SudoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
