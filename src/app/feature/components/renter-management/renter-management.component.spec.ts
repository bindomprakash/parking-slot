import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterManagementComponent } from './renter-management.component';

describe('RenterManagementComponent', () => {
  let component: RenterManagementComponent;
  let fixture: ComponentFixture<RenterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
