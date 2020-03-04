const galeriesRoot = 'galeries';
export const photosSubpath = 'pics';
export const videosSubpath = 'movies';

// These are the application's routes
// Change the values to change the urls
export const routesApp = {
  auth: 'auth',
  newAccount: 'new-account',
  cgu: 'cgu',
  reset: 'reset',
  home: 'home',
  galeries: galeriesRoot,
  pics: galeriesRoot + '/' + photosSubpath,
  videos: galeriesRoot + '/' + videosSubpath,
  crush: 'crush',
  dashboard: 'dashboard',
  members: 'members',
  material: 'material',
  moderation: 'moderation',
  notFound: 'not-found',
};

export const routesAppFromRoot = Object.assign({}, routesApp);
Object.keys(routesAppFromRoot).map(
  (key) => { routesAppFromRoot[key] = '/' + routesAppFromRoot[key]; }
);
