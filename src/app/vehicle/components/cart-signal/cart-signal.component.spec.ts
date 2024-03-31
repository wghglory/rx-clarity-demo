import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSignalComponent } from './cart-signal.component';

describe('CartSignalComponent', () => {
  let component: CartSignalComponent;
  let fixture: ComponentFixture<CartSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSignalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
