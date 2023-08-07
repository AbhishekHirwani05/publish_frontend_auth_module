module.exports = `/** Imports */
import AdminDashboard from 'components/Auth/Admin/AdminDashboard.component';
import RoleManagementDashboard from 'components/Auth/RoleManagement/RoleManagementDashboard.component';
import {TRouteType} from 'types';

/** Lazy imports */

export const protectedRoutesList: TRouteType[] = [
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/rolemanagement',
    element: <RoleManagementDashboard />,
  },
];
`;
