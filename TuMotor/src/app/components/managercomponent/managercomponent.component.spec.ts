import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagercomponentComponent } from './managercomponent.component';

describe('ManagercomponentComponent', () => {
  let component: ManagercomponentComponent;
  let fixture: ComponentFixture<ManagercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagercomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
