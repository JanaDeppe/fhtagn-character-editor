import Vue from 'vue';
import { get, act } from './type';

function initState() {
  return {
    attributeValues: {},
    connections: [],
    facettes: [],
    motivations: [],
    personalInformation: {
      Vorname: '',
      Nachname: '',
      Muttersprache: '',
      Alter: '',
      Aussehen: '',
      Ausrüstungsgegenstände: '',
      Notizen: '',
    },
    profession: -1,
    professionVariant: '',
    loadingState: {
      isProfessionLoading: true,
    },
  };
}

const state = initState();

const getters = {
  [get.PROFESSION_ID]: state => state.profession,
  [get.ATTRIBUTE_VALUES]: state => state.attributeValues,
  [get.CHARACTER_DATA]: ({
    attributeValues,
    connections,
    facettes,
    motivations,
    personalInformation,
    profession,
    professionVariant,
  }) => ({
    attributeValues,
    connections,
    facettes,
    motivations,
    personalInformation,
    profession,
    professionVariant,
  }),
  [get.DERIVED_VALUES]: state => {
    const { ST, KO, EN } = state.attributeValues;
    const hitpoints = Math.ceil((ST + KO) / 2);
    const willpowerPoints = EN;
    const stabilityPoints = EN * 5;
    const breakingPoint = stabilityPoints - EN;

    return {
      hitpoints, willpowerPoints, stabilityPoints, breakingPoint,
    };
  },
  [get.CONNECTIONS]: state => state.connections,
  [get.FACETTES]: state => state.facettes,
  [get.MOTIVATIONS]: state => state.motivations,
  [get.PERSONAL_INFORMATION]: state => state.personalInformation,
  [get.IS_PROFESSION_LOADING]: state => state.loadingState.isProfessionLoading,
  [get.IS_CHARACTER_STARTED]: state => Number.isInteger(state.attributeValues.ST),
};

const mutations = {
  resetCharacterState: context => {
    const s = initState();
    Object.keys(s).forEach(key => {
      context[key] = s[key];
    });
  },
  setAttributeValues(context, payload) {
    context.attributeValues = payload;
  },
  updateProfession(context, professionIndex) {
    context.profession = professionIndex;
  },
  setProfessionVariant(context, variant) {
    context.professionVariant = variant;
  },
  setConnections(context, payload) {
    Vue.set(context, 'connections', payload);
  },
  setFacettes(context, payload) {
    Vue.set(context, 'facettes', payload);
  },
  setMotivations(context, payload) {
    Vue.set(context, 'motivations', payload);
  },
  setPersonalInformation(context, payload) {
    context.personalInformation = { ...payload };
  },
  toggleProfessionLoading(context) {
    context.loadingState.isProfessionLoading = !(context.loadingState.isProfessionLoading);
  },
};

const actions = {
  [act.CREATE_NEW_CHARACTER]({ commit, dispatch, rootGetters }) {
    commit('resetCharacterState');
    commit('setMotivations', new Array(rootGetters[get.AVAILABLE_MOTIVATIONS]).fill(''));
    dispatch(act.INIT_CHARACTER_SKILLS);
  },
  [act.SET_ATTRIBUTE_VALUES]({ commit }, payload) {
    commit('setAttributeValues', payload);
  },
  [act.UPDATE_PROFESSION_VARIANT]({ commit }, payload) {
    commit('setProfessionVariant', payload);
  },
  [act.UPDATE_CONNECTION]({ commit, getters }, { index, value }) {
    const newConnections = getters[get.CONNECTIONS].slice();
    newConnections[index] = value;
    commit('setConnections', newConnections);
  },
  [act.UPDATE_FACETTES]({ commit }, payload) {
    commit('setFacettes', payload);
  },
  [act.UPDATE_MOTIVATION]({ commit, getters }, { index, value }) {
    const newMotivations = getters[get.MOTIVATIONS].slice();
    newMotivations[index] = value;
    commit('setMotivations', newMotivations);
  },
  [act.UPDATE_PERSONAL_INFORMATION]({ commit }, payload) {
    commit('setPersonalInformation', payload);
  },
  setConnectionsCount({ commit, getters, rootGetters }, payload) {
    const currentConnections = getters[get.CONNECTIONS] || [];
    const availableConnections = rootGetters[get.AVAILABLE_CONNECTIONS_COUNT_BY_ID](payload);
    const connectionsToAdd = availableConnections - currentConnections.length;
    const newConnections = currentConnections.slice();

    if (connectionsToAdd > 0) {
      for (let i = 0; i < connectionsToAdd; i += 1) {
        newConnections.push('');
      }
    } else if (connectionsToAdd < 0) {
      for (let i = 0; i < Math.abs(connectionsToAdd); i += 1) {
        newConnections.pop();
      }
    }

    commit('setConnections', newConnections);
  },
  async [act.SET_PROFESSION]({
    commit, dispatch,
  }, payload) {
    if (state.profession > -1) {
      commit('toggleProfessionLoading');
      await dispatch(act.REMOVE_PROFESSION_SKILLS);
    }

    commit('updateProfession', payload);
    commit('setProfessionVariant', '');

    await dispatch(act.SET_PROFESSION_SKILLS, payload);
    await dispatch('setConnectionsCount', payload);
    commit('toggleProfessionLoading');
  },

};

export default {
  state,
  getters,
  mutations,
  actions,
};
