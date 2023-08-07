module.exports = `import {TCustomRoute} from 'types/route.type';
import {protectedRoutesList, privateRoutesList, publicRoutesList} from 'routes';
import CustomErrorBoundary from 'components/CustomErrorBoundary/CustomErrorBoundary.component';
import {redirect, RouteObject} from 'react-router-dom';

/*
 *
 ******************************************DON'T TOUCH****************************************
 *
 *
 *
 * DON'T MODIFY THIS FILE, If you have any issue please contact to DPE Team.
 * MAIL ID : dpe@konverge.ai
 *
 *
 *
 *
 ********************************************DON'T TOUCH**************************************
 */

/*
 *
 * Please provide "Route URL" which will be redirect to the same,
 * When you are login or you have aut_token in your local settings.
 *
 */
export const withLoginTokenRedirect = (import.meta.env.VITE_WITH_LOGIN_TOKEN_REDIRECT as string) || '/home';
/*
 *
 * Please provide "Route URL" which will be redirect to the same,
 * When you are not login or you don't have aut_token in your local settings.
 *
 */
export const withOutLoginTokenRedirect = (import.meta.env.VITE_WITHOUT_LOGIN_TOKEN_REDIRECT as string) || '/sign-in';

/**
@author      : AD
@date        : 2023-02-14
@description : Here maintain route list, don't change anything here.. Don't touch this code...
@params      : public, private, protected routes imported here...
@return      : Return route list
*/
const routesList: TCustomRoute = {
  protected: protectedRoutesList,
  private: privateRoutesList,
  public: publicRoutesList,
};

/**
@author      : AD
@date        : 2023-02-15
@description : Get all private routes and if auth token is missing to redirect to login page
@params      : List of all private custom routes
@return      : List of all private Route objects list
*/

const getPrivateRouteList = (privateRouteList: TCustomRoute['private']): RouteObject[] => {
  if (privateRouteList && privateRouteList.length > 0) {
    return privateRouteList.map((item: RouteObject) => ({
      ...item,
      errorElement: <CustomErrorBoundary />,
      loader: () => {
        const authToken = localStorage.getItem('auth_token');
        if (!authToken) return redirect(withOutLoginTokenRedirect);
        return null;
      },
    }));
  }
  return [] as RouteObject[];
};

/**
@author      : AD
@date        : 2023-02-15
@description : Get all protected routes and if auth token is valid, will redirect to Main page.
@params      : List of all protected custom routes
@return      : List of all protected Route objects list
*/

const getProtectedRouteList = (protectedRouteList: TCustomRoute['protected']): RouteObject[] => {
  if (protectedRouteList && protectedRouteList.length > 0) {
    return protectedRouteList.map((item: RouteObject) => ({
      ...item,
      errorElement: <CustomErrorBoundary />,
      loader: () => {
        const authToken = localStorage.getItem('auth_token');
        const role = localStorage.getItem('userRole');
        if ((authToken && authToken !== '') && (role === 'admin' || role === 'superAdmin')) {
          return true;
        }
        return redirect(withOutLoginTokenRedirect);
      },
    }));
  }
  return [] as RouteObject[];
};

/**
@author      : AD
@date        : 2023-02-15
@description : Get all public routes and there no relation to auth token
@params      : List of all public custom routes
@return      : List of all public Route objects list
*/

const getPublicRouteList = (publicRouteList: TCustomRoute['public']): RouteObject[] => {
  if (publicRouteList && publicRouteList.length > 0) {
    return publicRouteList.map((item: RouteObject) => ({
      ...item,
      errorElement: <CustomErrorBoundary />,
    }));
  }
  return [] as RouteObject[];
};

/**
@author      : AD
@date        : 2023-02-16
@description : Get All Update Custom Route with RouteObject
@params      : No Inputs
@return      : Return Get All Update Custom Route...
*/

export const getAllUpdatedRouteList = (): RouteObject[] => {
  let routeUpdatedCollection: RouteObject[] = [] as RouteObject[];
  if (routesList) {
    if (routesList.private) {
      routeUpdatedCollection = [...routeUpdatedCollection, ...getPrivateRouteList(routesList.private)];
    }
    if (routesList.public) {
      routeUpdatedCollection = [...routeUpdatedCollection, ...getPublicRouteList(routesList.public)];
    }
    if (routesList.protected) {
      routeUpdatedCollection = [...routeUpdatedCollection, ...getProtectedRouteList(routesList.protected)];
    }
  }
  return routeUpdatedCollection;
};
`;
