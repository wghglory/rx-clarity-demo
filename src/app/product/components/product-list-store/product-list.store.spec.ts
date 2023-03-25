import { ProductListStore } from './product-list.store';

describe('ProductListStore', () => {
  const componentStore = new ProductListStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
