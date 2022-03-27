import { DateTime } from 'luxon';

/**
 * For articles released today return time and date otherwise.
 * @param {string} pubDate - RFC2822 date
 * @returns {string} Formatted date
 */
export function RFC2822ToTimeOrDate(pubDate) {
  const dateObject = DateTime.fromRFC2822(pubDate);
  const formattedDate =
    dateObject.toRelativeCalendar() === 'today'
      ? dateObject.toLocaleString(DateTime.TIME_24_SIMPLE)
      : dateObject.toLocaleString(DateTime.DATE_SHORT);
  return formattedDate;
}

/**
 * @param {string} pubDate - RFC2822 date
 * @returns {string} Formatted date in DateTime format
 */
export function RFC2822ToDateTime(pubDate) {
  const dateObject = DateTime.fromRFC2822(pubDate);
  const formattedDate = dateObject.toLocaleString(DateTime.DATETIME_SHORT);
  return formattedDate;
}
