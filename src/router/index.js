import Router from 'vue-router'
const Home = () => import('../pages/Home.vue')
const Tide = () => import('../pages/Tide.vue')
const Settings = () => import('../pages/Settings.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tide',
    name: 'tide',
    component: Tide
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
];

export default new Router({
  base: __dirname,
  routes,
  mode: 'history'
})