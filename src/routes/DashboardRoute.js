// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'

// core components/views
import DashboardPage from '../views/Dashboard/Dashboard.js'
import Test from '../views/Test/Test.js'
import Page404 from '../views/404/404.js'

const DashboardRoutes = [
  {
    path: '/',
    // to: '/index',
    // redirect: true,
    sidebarName: 'Index',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: Test,
  },
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/list',
    sidebarName: 'List',
    navbarName: 'List',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    // redirect: true,
    path: '*',
    // to: '/404',
    navbarName: 'Redirect',
    component: Page404,
  },
  // { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
];

export default DashboardRoutes
