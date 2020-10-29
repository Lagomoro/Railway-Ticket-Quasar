const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/buy-ticket-search',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BuyTicketSearch.vue') }
    ]
  },
  {
    path: '/buy-ticket',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BuyTicket.vue') }
    ]
  },
  {
    path: '/schedule-search',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ScheduleSearch.vue') }
    ]
  },
  {
    path: '/schedule',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Schedule.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
