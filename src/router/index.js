import Router from 'vue-router'
const Home = () => import('../pages/Home.vue')
const Tide = () => import('../pages/Tide.vue')
const Settings = () => import('../pages/Settings.vue')
const Tides = () => import('../pages/Tides.vue')
const Profile = () => import('../pages/Profile.vue')
const Following = () => import('../pages/Following.vue')
const Followers = () => import('../pages/Followers.vue')
const UserTides = () => import('../pages/UserTides.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tides',
    name: 'tides',
    component: Tides
  },
  {
    path: '/tide/:id',
    name: 'tide',
    component: Tide
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/:username',
    component: Profile,
    children: [
      {
        path: '', redirect: 'tides'
      },
      {
        name: 'userTides',
        path: 'tides',
        component: UserTides,
      },
      {
        path: 'favorites',
        component: Following
      },
      {
        path: 'following',
        component: Following
      },
      {
        path: 'followers',
        component: Followers
      }
    ]
  }
];

export default new Router({
  base: __dirname,
  routes,
  mode: 'history'
})