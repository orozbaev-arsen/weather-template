import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../views/Weather.vue'
import News from '../views/News.vue'

Vue.use(VueRouter);
const title = 'Самое крутое SPA приложение';

const routes = [
  {
    path: '/',
    name: 'Weather',
    component: Weather,
    meta: {
      title: 'Просмотр погоды',
    },
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: {
      title: 'Новости',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} | ${title}`;
  } else {
    document.title = title;
  }
  next();
});

export default router;
