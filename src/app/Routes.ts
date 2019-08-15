// These are the application's routes
// Change the valeues to change the urls
export const routesApp = {
  auth: 'auth',
  newAccount: 'new-account',
  cgu: 'cgu',
  reset: 'reset',
  home: 'home',
  galeries: 'galeries',
  dashboard: 'dashboard',
  members: 'members',
  material: 'material',
  moderation: 'moderation',
  notFound: 'not-found',
};

export const routesAppFromRoot = Object.assign({}, routesApp);
Object.keys(routesAppFromRoot).map(
  (key, route) => { routesAppFromRoot[key] = '/' + routesAppFromRoot[key]; }
);
