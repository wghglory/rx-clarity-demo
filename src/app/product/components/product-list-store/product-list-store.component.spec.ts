import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListStoreComponent } from './product-list-store.component';

describe('ProductListStoreComponent', () => {
  let component: ProductListStoreComponent;
  let fixture: ComponentFixture<ProductListStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
