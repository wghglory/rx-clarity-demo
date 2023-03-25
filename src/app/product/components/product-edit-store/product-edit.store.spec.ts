import { ProductEditStore } from './product-edit.store';

describe('ProductEditStore', () => {
  const componentStore = new ProductEditStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
