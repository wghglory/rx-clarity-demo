import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeleteBehaviorComponent } from './product-delete-behavior.component';

describe('ProductDeleteBehaviorComponent', () => {
  let component: ProductDeleteBehaviorComponent;
  let fixture: ComponentFixture<ProductDeleteBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDeleteBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDeleteBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
