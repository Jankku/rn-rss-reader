import { RFC2822ToTimeOrDate, RFC2822ToDateTime } from '../dateutils';
import { Settings } from 'luxon';

describe('Test dateutils', () => {
  beforeAll(() => {
    Settings.defaultZone = 'UTC+3';
    Settings.defaultLocale = 'en-FI';
    Settings.now = () => new Date('Wed, 06 Apr 2022 20:00:00 +0300').valueOf();
  });

  afterAll(() => {
    Settings.defaultZone = 'local';
    Settings.defaultLocale = DateTime.now().resolvedLocaleOptions().locale;
  });

  describe('RFC2822ToTimeOrDate', () => {
    test('Should return time', () => {
      const time = RFC2822ToTimeOrDate('Wed, 06 Apr 2022 18:00:00 +0300');
      expect(time).toBe('18.00');
    });

    test('Should return date', () => {
      const date = RFC2822ToTimeOrDate('Thu, 31 Mar 2022 18:00:00 +0300');
      expect(date).toBe('31/03/2022');
    });
  });

  describe('RFC2822ToDateTime', () => {
    test('Should return date', () => {
      const dateTime = RFC2822ToDateTime('Thu, 31 Mar 2022 18:00:00 +0300');
      expect(dateTime).toBe('31/03/2022, 18.00');
    });
  });
});
