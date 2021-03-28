import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanichomeComponent } from './mechanichome.component';

describe('MechanichomeComponent', () => {
  let component: MechanichomeComponent;
  let fixture: ComponentFixture<MechanichomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanichomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanichomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
