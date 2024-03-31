import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeleteStoreComponent } from './product-delete-store.component';

describe('ProductDeleteStoreComponent', () => {
  let component: ProductDeleteStoreComponent;
  let fixture: ComponentFixture<ProductDeleteStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDeleteStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDeleteStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
