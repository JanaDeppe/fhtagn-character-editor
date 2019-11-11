import Vue from 'vue';
import { get, act } from './type';

const state = {
  characterSkills: {},
  skillMap: {},
  skillModifications: {},
};

const getters = {
  [get.MODIFIED_SKILLS](state) {
    return state.characterSkills.filter(skill => skill.modIds > 0);
  },
  [get.OPTIONAL_SKILL_COUNT](state) {
    return state.skillModifications.filter(spec => spec.type === 'optional').length;
  },
  [get.SKILL_BY_ID]: ({ state, rootState }) => (skillId) => {
    const skill = state.characterSkills[skillId];
    const skillRuleset = rootState.skills[skill.skillname];
    const isProfessional = !!(skill.modIds.filter(modId => state.skillModifications[modId].type === 'professional').length);
    const isOptional = !!(skill.modIds.filter(modId => state.skillModifications[modId].type === 'optional').length);
    const professionalSkill = rootState.professions[rootState.profession].skills[isProfessional ? 'fixed' : 'optional'][skill.skillname];

    return {
      skillname: skill.skillname,
      specialisationname: skill.specialisation,
      hasSpecialisation: !!(skillRuleset.specialisation),
      baseValue: skillRuleset.value,
      professionalValue: Number.isInteger(professionalSkill) ? professionalSkill : professionalSkill.value,
      isProfessional,
      isOptional,
      bonusCount: skill.modIds.filter(modId => state.skillModifications[modId].type === 'bonus').length,
    };
  },

  [get.CALCULATED_SKILL_VALUE_BY_ID]: ({ state, rootState }) => (skillId) => {
    const skill = state.characterSkills[skillId];
    const skillRuleset = rootState.skills[skill.skillname];
    const isProfessional = !!(skill.modIds.filter(modId => state.skillModifications[modId].type === 'professional').length);
    const bonusCount = skill.modIds.filter(modId => state.skillModifications[modId].type === 'bonus').length;

    let { value } = skillRuleset;

    if (isProfessional) {
      const professionalSkill = rootState.professions[rootState.profession].skills[isProfessional ? 'fixed' : 'optional'][skill.skillname];
      const professionalValue = Number.isInteger(professionalSkill) ? professionalSkill : professionalSkill.value;
      value = professionalValue;
    }

    for (let i = 0; i < bonusCount; i++) value += 20;

    return value;
  },

};

const mutations = {
  resetSkillsState(context) {
    Object.keys(context).forEach(stateObject => Object.assign(stateObject, {}));
  },
  newCharacterSkill(context, { skillname, specialisation, id }) {
    Vue.set(context.characterSkills, id, {
      skillname,
      specialisation,
      modIds: [],
    });
  },
  newSkillModification(context, { type, skillId, id }) {
    Vue.set(context.skillModifications, id, {
      type,
      skillId,
    });
  },
  modIdToSkill(context, { skillId, modId }) {
    context.characterSkills[skillId].modIds.push(modId);
  },
  removeModification(context, { modId }) {
    delete context.skillModifications[modId];
  },
  removeModificationFromSkill(context, { modId, skillId }) {
    const { modIds } = context.characterSkills[skillId];
    modIds.splice(modIds.indexOf(modId), 1);
  },
  changeSpecialisation(context, { skillId, specialisation }) {
    context.characterSkills[skillId].specialisation = specialisation;
  },
};

function createID() {
  const dateInt = (new Date()).value;
  const randomInt = Math.floor(Math.random() * 5);
  return `${dateInt}-${randomInt}`;
}

const actions = {
  [act.INIT_CHARACTER_SKILLS]({ commit }) {
    commit('resetSkillsState');
  },
  [act.NEW_CHARACTER_SKILL]({ commit }, { skillname, specialisation }) {
    const newID = createID();
    commit('newCharacterSkill', { skillname, specialisation, id: newID });
    return newID;
  },
  [act.NEW_SKILL_MODIFICATION]({ commit }, { skillId, type }) {
    const newID = createID();
    commit('newSkillModification', { id: newID, type, skillId });
    return newID;
  },
  // payload: Integer 'professionId'
  [act.SET_PROFESSION_SKILLS]({
    commit, dispatch, state, rootGetters,
  }, payload) {
    const professionalSkills = rootGetters[get.PROFESSIONAL_SKILLS_BY_ID](payload);

    Object.keys(professionalSkills).forEach((skillname) => {
      const skill = professionalSkills[skillname];
      const currentCharacterSkills = state.skillMap[skillname];
      const isSpecialisationPredefined = typeof skill === 'object';

      // If specialisation is predefined or this skill does not exist yet,
      // always add a new skill and a new modification
      // If not, add the new modification to the existing skill
      const skillId = isSpecialisationPredefined || currentCharacterSkills.length < 1
        ? dispatch(act.NEW_CHARACTER_SKILL, { skillname, specialisation: skill.specialisation })
        : currentCharacterSkills[0];

      const newModId = dispatch(act.NEW_SKILL_MODIFICATION, { type: 'professional ', skillId });
      commit('modIdToSkill', { skillId, modId: newModId });
    });
  },
  [act.REMOVE_PROFESSION_SKILLS]({ commit, state }) {
    const professionalModIds = Object.keys(state.skillModifications).filter((modId) => {
      const mod = state.skillModifications[modId];
      return mod.type === 'professional' || mod.type === 'optional';
    });

    // Remove the modification, the modId from the skill and
    // if the skill has no more modifications, that as well
    professionalModIds.forEach((modId) => {
      const { skillId } = state.skillModifications[modId];
      commit('removeModification', { modId });
      commit('removeModificationFromSkill', { skillId, modId });

      if (!state.characterSkills[skillId].modIds.length && !state.characterSkills[skillId].name) {
        commit('removeCharacterSkill', { skillId });
      }
    });
  },
  // payload: String 'skillname'
  [act.ADD_BONUS_SKILL]({ commit, dispatch }, { skillname, skillId, specialisation }) {
    // Create new skill if no skillId has been determined
    const newSkillId = skillId || dispatch(act.NEW_CHARACTER_SKILL, { skillname, specialisation });
    const newModId = dispatch(act.NEW_SKILL_MODIFICATION, { type: 'bonus', skillId: newSkillId });
    commit('modIdToSkill', { skillId: newSkillId, modId: newModId });
  },
  [act.REMOVE_BONUS_SKILL]({ commit, state }, { skillId }) {
    const skill = state.characterSkills[skillId];
    const modId = skill.modIds.find(id => state.skillModifications[id].type === 'bonus');

    commit('removeModification', { modId });
    commit('removeModificationFromSkill', { skillId, modId });
  },
  // payload: String 'skillname'
  [act.TOGGLE_OPTIONAL_SKILL]({ commit, state, dispatch }, {
    skillname, skillId, specialisation, modId,
  }) {
    // If the modId is defined, the modification is to be removed
    // otherwise, it will be created and added
    if (modId) {
      commit('removeModification', { modId });
      commit('removeModificationFromSkill', { skillId: state.skillModifications.modId.skillId, modId });
    } else if (skillname) {
      const newSkillId = skillId || dispatch(act.NEW_CHARACTER_SKILL, { skillname, specialisation });
      const newModId = dispatch(act.NEW_SKILL_MODIFICATION, { type: 'optional ', newSkillId });
      commit('modIdToSkill', { skillId: newSkillId, modId: newModId });
    }
  },
  // payload: String 'skillname'
  [act.ADD_SPECIALISATION]({ dispatch }, skillname) {
    dispatch(act.NEW_CHARACTER_SKILL, { skillname, specialisation: '' });
  },
  // payload: String 'uniqueSkillID', String 'newValue'
  [act.MODIFY_SPECIALISATION]({ commit }, { skillId, specialisation }) {
    commit('changeSpecialisation', { skillId, specialisation });
  },
  // payload: String 'uniqueSkillID'
  [act.REMOVE_SPECIALISATION]({ commit }, { skillId }) {
    commit('removeCharacterSkill', { skillId });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
