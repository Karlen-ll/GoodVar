import { routeNames } from './routes'
import DefaultLayout from '../layouts/DefaultLayout.vue'

export const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        component: () => import('../views/HomePage.vue'),
        name: routeNames.HOME,
      },
      {
        path: '/generator',
        component: () => import('../views/GeneratorPage.vue'),
        name: routeNames.GENERATOR,
      },
      {
        path: '/test',
        component: () => import('../views/TestPage.vue'),
        name: routeNames.TEST,
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/NotFoundPage.vue'),
        name: routeNames.NOT_FOUND,
        meta: { hidden: true },
      },
    ],
  },
]
