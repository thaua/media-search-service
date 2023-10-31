import Item from '@domain/item';

describe('Item', () => {
  describe('creating', () => {
    it('responds with item created', async () => {
      const item: Item = new Item();
      expect(item).toBeDefined();
    });
  });
});
