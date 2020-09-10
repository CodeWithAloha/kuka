import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import HomeView from './views/home/AgendaListView';
import LoadingScreen from './components/LoadingScreen';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';

type Routes = {
  exact?: boolean;
  path?: string | string[];
  guard?: any;
  layout?: any;
  component?: any;
  routes?: Routes;
}[];


// see https://gist.github.com/maxacarvalho/6734b066891bc25bcf1dff033207fd2d
export const renderRoutes = (routes: Routes = []): JSX.Element => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);


const routes: Routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/errors/NotFoundView'))
  },

  // Guest Section, requires unauthenticated access
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('./views/auth/RegisterView'))
  },

  // User Section (requires authentication)
  {
    path: '/user',
    guard: AuthGuard,
    layout: PublicLayout,
    routes: [
      {
        exact: true,
        path: '/user/account',
        component: lazy(() => import('./views/account/AccountView'))
      }
    ]
  },

  // Admin Section, TODO: requires admin privileges
  {
    path: '/admin',
    guard: AuthGuard, // TODO: make AdminGuard
    layout: AdminLayout,
    routes: [

      {
        exact: true,
        path: '/admin/agenda-list',
        component: lazy(() => import('./views/admin/AdminAgendaListView'))
      },
      {
        exact: true,
        path: '/admin/agenda-detail/:id/edit',
        component: lazy(() => import('./views/admin/AdminAgendaEditView'))
      },
      {
        exact: true,
        path: '/admin/agenda-create',
        component: lazy(() => import('./views/admin/AdminAgendaCreateView'))
      },
      {
        exact: true,
        path: '/admin',
        // By default, go to agenda list.
        component: () => <Redirect to="/admin/agenda-list" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },

  // Public Section
  {
    path: '*',
    layout: PublicLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: HomeView
      },
      {
        exact: true,
        path: '/agenda/:id',
        component: lazy(() => import('./views/home/AgendaDetailView'))
      },
      {
        exact: true,
        path: '/agenda/:agendaId/testimony/:testimonyId',
        component: lazy(() => import('./views/home/TestimonyDetailView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
