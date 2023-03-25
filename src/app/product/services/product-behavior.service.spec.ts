import { TestBed } from '@angular/core/testing';

import { ProductBehaviorService } from './product-behavior.service';

describe('ProductBehaviorService', () => {
  let service: ProductBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
