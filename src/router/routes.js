export default [
  {
    path: "/",
    component: () => import("@/views/GeneratorView.vue"),
    children: [
      {
        path: "",
        name: "start-generation",
        component: () => import("@/views/StartGeneration.vue"),
      },
      {
        path: "attributes",
        name: "attributes",
        component: () => import("@/views/AttributesView.vue"),
      },
      {
        path: "professions",
        name: "professions",
        component: () => import("@/views/Professions.vue"),
      },
      // {
      //   path: 'bonus-skills',
      //   name: 'bonus-skills',
      //   component: () => import('@/views/BonusSkills.vue'),
      // },
      // {
      //   path: 'connections',
      //   name: 'connections',
      //   component: () => import('@/views/Connections.vue'),
      // },
      // {
      //   path: 'facettes',
      //   name: 'facettes',
      //   component: () => import('@/views/Facettes.vue'),
      // },
      // {
      //   path: 'motivations',
      //   name: 'motivations',
      //   component: () => import('@/views/Motivations.vue'),
      // },
      // {
      //   path: 'personal-information',
      //   name: 'personal-information',
      //   component: () => import('@/views/PersonalInformation.vue'),
      // },
      // {
      //   path: 'character-summary',
      //   name: 'character-summary',
      //   component: () => import('@/views/CharacterSummary.vue'),
      // },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  // },
];
