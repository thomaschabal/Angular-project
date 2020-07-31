import { IMAGES_FOLDER, SUFFIX_SVG } from '@src/app/constants/Support';

export const NUMBER_AUTH_BG_PICS = 4;
export const NUMBER_OF_LAST_EVENTS_HOME = 3;

export const PATH_AUTH_VIDEO = IMAGES_FOLDER + 'video-auth.mp4';
export const PATH_AUTH_PHOTO = IMAGES_FOLDER + 'auth_pics/font1.jpg';

export const PATH_LOADING_SPINNER = IMAGES_FOLDER + 'camera-fast-spinner.svg';

export const PATH_LOGO_PONTHE_SVG = IMAGES_FOLDER + 'logo-ponthe' + SUFFIX_SVG;
export const PATH_MOVIES_SVG = IMAGES_FOLDER + 'svg_movies' + SUFFIX_SVG;
export const PATH_PICS_SVG = IMAGES_FOLDER + 'svg_pics' + SUFFIX_SVG;
export const PATH_CRUSH_SVG = IMAGES_FOLDER + 'svg_crush' + SUFFIX_SVG;
export const PATH_DASHBOARD_SVG = IMAGES_FOLDER + 'svg_dashboard' + SUFFIX_SVG;
export const PATH_MEMBERS_SVG = IMAGES_FOLDER + 'svg_members' + SUFFIX_SVG;
export const PATH_MATOS_SVG = IMAGES_FOLDER + 'svg_matos' + SUFFIX_SVG;
export const PATH_LOGOUT_SVG = IMAGES_FOLDER + 'svg_logout' + SUFFIX_SVG;
export const PATH_NOT_FOUND_IMAGE = IMAGES_FOLDER + 'logo' + SUFFIX_SVG;
export const PATH_GEAR = IMAGES_FOLDER + 'gear.svg';

export const NUMBER_PICS_BY_PONTHE_TEAM = {
  '015': 1,
  '016': 1,
  '017': 1,
  '018': 1,
  '019': 1,
  '020': 5,
  '021': 5,
};

const teamFolder = '~/assets/images/ponthe_teams/';

export const PONTHE_PROMO_IMAGES = {
    '019': [teamFolder + '019.jpg'],
    '020': [
        teamFolder + '020.jpg',
        teamFolder + '020_pulls.jpg',
        teamFolder + '020_trombi.jpg',
        teamFolder + '020_completed.jpg',
        teamFolder + '020_021.jpg'],
    '021': [
        teamFolder + '021.jpg',
        teamFolder + '021_trombi.jpg',
        teamFolder + '021_passa.jpg',
        teamFolder + '021_pulls.jpg',
        teamFolder + '020_021_gala.jpeg']
};
