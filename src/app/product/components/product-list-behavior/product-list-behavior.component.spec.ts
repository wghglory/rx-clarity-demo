import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListBehaviorComponent } from './product-list-behavior.component';

describe('ProductListBehaviorComponent', () => {
  let component: ProductListBehaviorComponent;
  let fixture: ComponentFixture<ProductListBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
