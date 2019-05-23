import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import SetUpOne from './views/setup/SetUpOne';
import SetUpTwo from './views/setup/SetUpTwo';
import SetUpThree from './views/setup/SetUpThree';
import ReportOne from './views/report/ReportOne';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/setupone',
      name: 'setupone',
      component: SetUpOne,
    },
    {
      path: '/setuptwo',
      name: 'setuptwo',
      component: SetUpTwo,
    },
    {
      path: '/setupthree',
      name: 'setuphree',
      component: SetUpThree,
    },
    {
      path: '/reportone',
      name: 'reportone',
      component: ReportOne,
    },
  ],
});
