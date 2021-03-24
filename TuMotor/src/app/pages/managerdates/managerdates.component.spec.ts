import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerdatesComponent } from './managerdates.component';

describe('ManagerdatesComponent', () => {
  let component: ManagerdatesComponent;
  let fixture: ComponentFixture<ManagerdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
