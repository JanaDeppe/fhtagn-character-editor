import {
// FETCH_PAGES,
} from './actions.type';
import {
  PREV_STEP,
  NEXT_STEP,
  RESET_STEP,
  ADD_WARNING,
  REMOVE_WARNING,
  FLUSH_WARNINGS,
} from './mutations.type';

const state = {
  currentStepIndex: 0,
  generatorSteps: [
    'start-generation',
    'attributes',
    'professions',
    'bonus-skills',
    'connections',
    'facettes',
    'motivations',
    'personal-information',
    'character-summary',
  ],
  pageContent: [],
  currentWarnings: [],
  warnings: {
    attributePointsRemaining: {
      type: 'warning',
      title: 'Restliche Attributspunkte',
      text: 'Du hast noch übrige Attributspunkte zu vergeben.',
    },
    optionalSkillsRemaining: {
      type: 'warning',
      title: 'Restliche Fertigkeiten',
      text: 'Du kannst noch weitere Berufsfertigkeiten auswählen.',
    },
    missingCustomVariant: {
      type: 'warning',
      title: 'Keine Ausprägung ausgedacht',
      text: 'Du hast eine eigene Ausprägung ausgewählt, aber das Feld dafür leer gelassen.',
    },
    missingVariant: {
      type: 'warning',
      title: 'Keine Ausprägung ausgewählt',
      text: 'Du hast keine Ausprägung für deinen Beruf ausgewählt.',
    },
    bonusSkillsRemaining: {
      type: 'warning',
      title: 'Restliche Bonusfertigkeiten',
      text: 'Du hast noch übrige Bonusfertigkeiten zu vergeben.',
    },
    missingConnections: {
      type: 'warning',
      title: 'Fehlende Verbindung',
      text: 'Du hast nicht alle Verbindungen ausgefüllt.',
    },
    missingMotivations: {
      type: 'warning',
      title: 'Fehlende Motivationen',
      text: 'Du hast nicht alle Verbindungen ausgefüllt.',
    },
    missingPersonalInformation: {
      type: 'warning',
      title: 'Fehlende persönliche Informationen',
      text: 'Du hast nicht alle persönlichen Informationen ausgefüllt.',
    },
  },
  version: (process.env.PACKAGE_JSON || { version: '0.1.0' }).version,
};

const getters = {
  currentStepIndex(context) {
    return context.currentStepIndex;
  },
  pages(context) {
    return context.generatorSteps;
  },
  getAppVersion: context => context.version,
};

const actions = {
  // [FETCH_PAGES]({ commit }) {
  //   // TODO: fetch page data from JSON file
  // },
};

/* eslint-disable no-param-reassign */
const mutations = {
  [PREV_STEP](context) {
    context.currentStepIndex -= 1;
  },
  [NEXT_STEP](context) {
    context.currentStepIndex += 1;
  },
  [RESET_STEP](context) {
    context.currentStepIndex = 0;
  },
  [ADD_WARNING](context, payload) {
    const index = context.currentWarnings.indexOf(payload);
    if (index === -1) context.currentWarnings.push(payload);
  },
  [REMOVE_WARNING](context, payload) {
    const index = context.currentWarnings.indexOf(payload);
    if (index > -1) context.currentWarnings.splice(index, 1);
  },
  [FLUSH_WARNINGS](context) {
    context.currentWarnings = [];
  },
};
/* eslint-enable no-param-reassign */

export default {
  state,
  getters,
  actions,
  mutations,
};
