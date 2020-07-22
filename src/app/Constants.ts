import {
  NUMBER_AUTH_BG_PICS,
  NUMBER_OF_LAST_EVENTS_HOME,
  PATH_AUTH_VIDEO,
  PATH_AUTH_PHOTO,
  PATH_LOADING_SPINNER,
  PATH_NOT_FOUND_IMAGE,
} from './constants/Images';
import { LINKS, BUTTON_LINKS_ADMIN } from './constants/ExternalLinks';
import { LANGUAGES, FLAGS_BY_LANG } from './constants/Languages';
import { BREAKPOINTS } from './constants/Breakpoints';

export const CAS_BASE_URL = 'https://cas.enpc.fr/cas/login?service=';

export const EXTENSION_MAILS_ENPC = '@eleves.enpc.fr';

// The oldest promotion allowed to create an account is Prom 013.
// Change this value for allowing older promotions.
const FIRST_PROMO = 13;
// Update the current promotion every year
const CURRENT_PROMO = 22;

const AVAILABLE_PROMOTIONS = [];
for (let promo = FIRST_PROMO; promo <= CURRENT_PROMO; promo++) {
  AVAILABLE_PROMOTIONS.push('0' + promo);
}
AVAILABLE_PROMOTIONS.reverse();

// Randomly defined first year of all events.
// You can't create an event before 2010 unless you change the following value.
const FIRST_YEAR_EVENTS = 2010;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
// The school year is changed on August 1st
export const CURRENT_YEAR = (currentDate.getMonth() > 7) ? currentYear : currentYear - 1;

const YEARS_SLUGS = [];
const SCHOOL_YEARS_SLUGS = [];
for (let year = FIRST_YEAR_EVENTS; year <= CURRENT_YEAR; year++) {
  SCHOOL_YEARS_SLUGS.push(year + '-' + (year + 1));
  YEARS_SLUGS.push(year);
}
SCHOOL_YEARS_SLUGS.reverse();
YEARS_SLUGS.reverse();

export const GALLERY_TYPES = ['Photo', 'Video'];


export {
  NUMBER_AUTH_BG_PICS,
  NUMBER_OF_LAST_EVENTS_HOME,
  PATH_AUTH_VIDEO,
  PATH_AUTH_PHOTO,
  PATH_LOADING_SPINNER,
  PATH_NOT_FOUND_IMAGE,
  LINKS,
  BUTTON_LINKS_ADMIN,
  LANGUAGES,
  FLAGS_BY_LANG,
  BREAKPOINTS,
  AVAILABLE_PROMOTIONS,
  YEARS_SLUGS,
  SCHOOL_YEARS_SLUGS
};
