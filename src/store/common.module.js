import router from '@/router';

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

/* eslint-disable no-param-reassign */
const mutations = {
  addWarning(state, payload) { state.currentWarnings.push(payload); },
  removeWarning(state, payload) { state.currentWarnings.splice(state.currentWarnings.indexOf(payload), 1); },
  flushWarnings(context) { context.currentWarnings = []; },
};
/* eslint-enable no-param-reassign */

const actions = {
  addWarning({ commit, state }, payload) {
    const index = state.currentWarnings.indexOf(payload);
    if (index === -1) commit('addWarning', payload);
  },
  removeWarning({ commit, state }, payload) {
    const index = state.currentWarnings.indexOf(payload);
    if (index > -1) commit('removeWarning', payload);
  },
  flushWarnings({ commit }) { commit('flushWarnings'); },
};

const getters = {
  editorSteps: () => router.options.routes[0].children,
  currentWarnings: state => state.currentWarnings,
  warningDataByKey: state => key => state.warnings[key],
  appVersion: context => context.version,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
