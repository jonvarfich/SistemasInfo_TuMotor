import { TestBed } from '@angular/core/testing';

import { MechanicGuard } from './mechanic.guard';

describe('MechanicGuard', () => {
  let guard: MechanicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MechanicGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
