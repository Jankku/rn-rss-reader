import { stringOrPlaceholder } from '../stringutils';

describe('Test stringutils', () => {
  describe('stringOrPlaceholder', () => {
    test('Should return string', () => {
      const value = stringOrPlaceholder('testi');
      expect(value).toBe('testi');
    });

    test('Should return placeholder when parameter is empty string', () => {
      const value = stringOrPlaceholder('');
      expect(value).toBe('-');
    });

    test('Should return placeholder when parameter is empty array', () => {
      const value = stringOrPlaceholder([]);
      expect(value).toBe('-');
    });

    test('Should return placeholder when parameter is empty object', () => {
      const value = stringOrPlaceholder({});
      expect(value).toBe('-');
    });

    test('Should return placeholder when parameter is 0', () => {
      const value = stringOrPlaceholder(0);
      expect(value).toBe('-');
    });

    test('Should return placeholder when parameter is null', () => {
      const value = stringOrPlaceholder(null);
      expect(value).toBe('-');
    });

    test('Should return placeholder when parameter is undefined', () => {
      const value = stringOrPlaceholder(undefined);
      expect(value).toBe('-');
    });
  });
});
