import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostManagementComponent } from './host-management.component';

describe('HostManagementComponent', () => {
  let component: HostManagementComponent;
  let fixture: ComponentFixture<HostManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
