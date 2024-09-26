import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  // { path: '/', redirect: '/home' },
  {path: '/', name: 'home', alias: '/home', component: () => import('#root/pages/HomePage.vue') },
  { path: '/about', component: () => import('#root/pages/AboutPage.vue') },
  { path: '/books/:id?', component: () => import('#root/pages/BooksPage.vue'), props: true },
  { path: '/idbm/:id?', component: () => import('#root/pages/IdbmPage.vue'), props: true },
  { path: '/user',
    children: [
      { path: '', component: () => import('#root/pages/UserPage.vue') },
      { path: 'main', component: () => import('#root/components/UserMain.vue') },
      { path: 'settings', component: () => import('#root/components/UserSettings.vue') },
    ]
  },
]

const router = createRouter({
  linkExactActiveClass: 'underline',
  history: createWebHistory(),
  routes,
})

export {router}
