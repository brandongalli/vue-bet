const routes = [
  {
    // Routes that must be in full mode...
    path: '/',
    component: () => import('layouts/Full.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/welcome', component: () => import('pages/Welcome.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') },
      { path: '/:experience/login', component: () => import('pages/Login.vue'), props: true },
      { path: '/:experience/welcome', component: () => import('pages/Welcome.vue'), props: true },
      { path: '/:experience/settings', component: () => import('pages/Settings.vue'), props: true }
    ]
  },
  {
    // Routes that can be defined in settings...
    path: '/',
    component: () => import('layouts/Loader.vue'),
    children: [
      { path: '/', component: () => import('pages/Experience.vue') },
      { path: '/:experience', component: () => import('pages/Experience.vue'), props: true }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('layouts/Full.vue'),
    children: [
      { path: '*', component: () => import('pages/NotFound.vue') }
    ]
  })
}

export default routes
