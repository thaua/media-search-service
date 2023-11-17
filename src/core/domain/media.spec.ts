import Media from './media';

describe('Media', () => {
  const testCode = 'code';
  const testTitle = 'title';
  const testThumbnail = 'thumb';
  const testTime = 240;

  describe('creating', () => {
    const item: Media = new Media(testCode, testTitle, testThumbnail, testTime);

    it('defines media', async () => {
      expect(item).toBeDefined();
    });

    it('creates with correct code', async () => {
      expect(item.code).toEqual(testCode);
    });

    it('creates with correct title', async () => {
      expect(item.title).toEqual(testTitle);
    });

    it('creates with correct code', async () => {
      expect(item.thumbnail).toEqual(testThumbnail);
    });

    it('creates with correct code', async () => {
      expect(item.time).toEqual(testTime);
    });
  });
});
