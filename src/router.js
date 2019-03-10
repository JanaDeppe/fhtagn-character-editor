import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "about" */ './views/Generator.vue'),
      children: [
        {
          path: '',
          name: 'start-generation',
          component: () => import(/* webpackChunkName: "about" */ './views/StartGeneration.vue'),
        },
        {
          path: 'attributes',
          name: 'attributes',
          component: () => import(/* webpackChunkName: "generator" */ './views/Attributes.vue'),
        },
        {
          path: 'professions',
          name: 'professions',
          component: () => import(/* webpackChunkName: "generator" */ './views/Professions.vue'),
        },
        {
          path: 'bonus-skills',
          name: 'bonus-skills',
          component: () => import(/* webpackChunkName: "generator" */ './views/BonusSkills.vue'),
        },
        {
          path: 'connections',
          name: 'connections',
          component: () => import(/* webpackChunkName: "generator" */ './views/Connections.vue'),
        },
        {
          path: 'facettes',
          name: 'facettes',
          component: () => import(/* webpackChunkName: "generator" */ './views/Facettes.vue'),
        },
        {
          path: 'motivations',
          name: 'motivations',
          component: () => import(/* webpackChunkName: "generator" */ './views/Motivations.vue'),
        },
        {
          path: 'personal-information',
          name: 'personal-information',
          component: () => import(/* webpackChunkName: "generator" */ './views/PersonalInformation.vue'),
        },
        {
          path: 'character-summary',
          name: 'character-summary',
          component: () => import(/* webpackChunkName: "generator" */ './views/CharacterSummary.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
