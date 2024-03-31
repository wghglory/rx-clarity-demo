import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditStoreComponent } from './product-edit-store.component';

describe('ProductEditStoreComponent', () => {
  let component: ProductEditStoreComponent;
  let fixture: ComponentFixture<ProductEditStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
