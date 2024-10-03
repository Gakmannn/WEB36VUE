import { createWebHistory, createRouter } from 'vue-router'
import { useUser } from '#root/stores/user'

const routes = [
  // { path: '/', redirect: '/home' },
  { path: '/', name: 'home', alias: '/home', component: () => import('#root/pages/HomePage.vue') },
  { path: '/lk', name: 'lk', alias: '/lk2', component: () => import('#root/pages/LKPage.vue') },
  { path: '/login', name: 'login', component: () => import('#root/pages/LoginPage.vue') },
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

router.beforeEach((to, from, next) => {
  const userStore = useUser()
  if (!userStore.user && to.path.includes('/lk')) next('/login')
  else next()
})

export {router}
