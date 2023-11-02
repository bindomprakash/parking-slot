import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingListTableComponent } from './parking-list-table.component';

describe('ParkingListTableComponent', () => {
  let component: ParkingListTableComponent;
  let fixture: ComponentFixture<ParkingListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
