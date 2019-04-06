import Router from 'vue-router'
const Home = () => import('../pages/Home.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
];

export default new Router({
  base: __dirname,
  routes,
  mode: 'history'
})