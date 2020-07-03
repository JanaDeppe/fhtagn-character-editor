import Vue from 'vue';
import Router from 'vue-router';

import config from '@/router/router.config';
import store from '@/store';

Vue.use(Router);

const router = new Router(config);

router.beforeEach((to, from, next) => {
  const hasNoAttributes = !store.getters.isCharacterStarted;
  const toRouteIndex = config.routes[0].children.findIndex(route => to.name === route.name);
  const isRestrictedRoute = toRouteIndex > 1;

  if (hasNoAttributes && isRestrictedRoute) {
    next('/');
  } else next();
});

export default router;
