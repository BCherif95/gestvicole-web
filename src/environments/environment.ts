// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    baseUrl: 'http://localhost:8080/gestion-avicole',
    serviceUrl: 'http://localhost:8080/gestion-avicole/api',
    /*serviceUrl: '/gestion-avicole/api',*/
    authTitle: 'AUTHENTIFICATION',
    errorMessage: 'Une erreur est survenue',
    errorNetworkMessage: 'Echec de connexion au serveur',
    notAuthorizedUserMessage: 'Vous n\'êtes pas autorisé à vous connecter sur cette application'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
