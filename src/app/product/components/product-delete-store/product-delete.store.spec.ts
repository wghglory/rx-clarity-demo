import { ProductDeleteStore } from './product-delete.store';

describe('ProductDeleteStore', () => {
  const componentStore = new ProductDeleteStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
