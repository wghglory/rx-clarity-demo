import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditBehaviorComponent } from './product-edit-behavior.component';

describe('ProductEditBehaviorComponent', () => {
  let component: ProductEditBehaviorComponent;
  let fixture: ComponentFixture<ProductEditBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
