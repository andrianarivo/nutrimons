import {DateTime} from 'luxon';

export function readableDate(dateIso: string | undefined | null) {
  return DateTime.fromISO(dateIso || new Date().toISOString())
    .setLocale('en-US')
    .toLocaleString(DateTime.DATE_MED);
}
