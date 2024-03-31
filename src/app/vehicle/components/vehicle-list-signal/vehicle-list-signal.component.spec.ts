import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListSignalComponent } from './vehicle-list-signal.component';

describe('VehicleListSignalComponent', () => {
  let component: VehicleListSignalComponent;
  let fixture: ComponentFixture<VehicleListSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleListSignalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleListSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
