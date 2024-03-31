import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailSignalComponent } from './vehicle-detail-signal.component';

describe('VehicleDetailSignalComponent', () => {
  let component: VehicleDetailSignalComponent;
  let fixture: ComponentFixture<VehicleDetailSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetailSignalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetailSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
