import router from '@/router';
import { get, act } from './type';

const state = {
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
      text: 'Du hast nicht alle Motivationen ausgefüllt.',
    },
    missingPersonalInformation: {
      type: 'warning',
      title: 'Fehlende persönliche Informationen',
      text: 'Du hast nicht alle persönlichen Informationen ausgefüllt.',
    },
  },
  version: (process.env.PACKAGE_JSON || { version: '0.1.0' }).version,
};

/* eslint-disable no-param-reassign */
const mutations = {
  addWarning(state, payload) { state.currentWarnings.push(payload); },
  removeWarning(state, payload) { state.currentWarnings.splice(state.currentWarnings.indexOf(payload), 1); },
  flushWarnings(context) { context.currentWarnings = []; },
};
/* eslint-enable no-param-reassign */

const actions = {
  [act.ADD_WARNING]({ commit, state }, payload) {
    const index = state.currentWarnings.indexOf(payload);
    if (index === -1) commit('addWarning', payload);
  },
  [act.REMOVE_WARNING]({ commit, state }, payload) {
    const index = state.currentWarnings.indexOf(payload);
    if (index > -1) commit('removeWarning', payload);
  },
  [act.FLUSH_WARNINGS]({ commit }) { commit('flushWarnings'); },
};

const getters = {
  [get.EDITOR_STEPS]: () => router.options.routes[0].children,
  [get.CURRENT_WARNINGS]: state => state.currentWarnings,
  [get.WARNING_DATA_BY_KEY]: state => key => state.warnings[key],
  [get.APP_VERSION]: context => context.version,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
