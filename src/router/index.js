import { createRouter, createWebHashHistory } from "vue-router";

import routes from "@/router/routes";
import { useCharacterStore } from "../stores/character";

const router = new createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const characterStore = useCharacterStore();
  const hasNoAttributes = !characterStore.isCharacterStarted;
  const toRouteIndex = routes[0].children.findIndex(
    (route) => to.name === route.name
  );
  const isRestrictedRoute = toRouteIndex > 1;

  if (hasNoAttributes && isRestrictedRoute) {
    next("/");
  } else next();
});

export default router;
