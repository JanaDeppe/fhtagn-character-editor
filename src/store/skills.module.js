import Vue from 'vue';
import { get, act } from './type';

const state = {
  characterSkills: {},
  skillMap: {},
  skillModifications: {},
};

const getters = {
  [get.MODIFIED_SKILLS](state) {
    const skillIds = Object.keys(state.characterSkills)
      .filter(id => {
        const mods = state.characterSkills[id].modIds.map(modId => state.skillModifications[modId]);

        // Filter out all skills which do not have modifications
        if (!mods.length) return false;

        // Filter out all optional skills which are not selected
        if (mods.find(mod => mod.type === 'optional')) {
          if (mods.find(mod => mod.type === 'selected')) return true;

          // unless they have other modifications
          if (mods.length > 1) return true;
          return false;
        }

        return true;
      });
    const modSkillArray = skillIds.map(id => ({ skillId: id, ...state.characterSkills[id] }));

    return modSkillArray.sort((a, b) => a.skillname.localeCompare(b.skillname, 'de'));
  },
  [get.SKILL_MAP](state) {
    const skillArray = Object.keys(state.skillMap);
    const reducedSkillArray = [];
    skillArray.forEach(skillname => {
      if (state.skillMap[skillname].length) {
        state.skillMap[skillname].forEach(skillId => reducedSkillArray.push({ skillId, skillname }));
      } else {
        reducedSkillArray.push({ skillname });
      }
    });
    return reducedSkillArray;
  },
  [get.PROFESSIONAL_SKILLS]: state => {
    const profModIds = Object
      .keys(state.skillModifications)
      .filter(mod => state.skillModifications[mod].type === 'professional');

    const profSkillArray = profModIds.map(mod => ({
      skillId: state.skillModifications[mod].skillId,
      ...state.characterSkills[state.skillModifications[mod].skillId],
    }));
    return profSkillArray.sort((a, b) => a.skillname.localeCompare(b.skillname, 'de'));
  },
  [get.OPTIONAL_SKILLS]: state => {
    const profModIds = Object
      .keys(state.skillModifications)
      .filter(mod => state.skillModifications[mod].type === 'optional');

    const profSkillArray = profModIds.map(mod => ({
      skillId: state.skillModifications[mod].skillId,
      ...state.characterSkills[state.skillModifications[mod].skillId],
    }));
    return profSkillArray.sort((a, b) => a.skillname.localeCompare(b.skillname, 'de'));
  },
  [get.OPTIONAL_SKILL_COUNT](state) {
    return Object.keys(state.skillModifications).filter(mod => state.skillModifications[mod].type === 'selected').length;
  },
  [get.SKILL_BY_ID]: (state, getters, rootState) => skillId => {
    const skill = state.characterSkills[skillId];
    const skillRuleset = rootState.rulesystem.skills[skill.skillname];
    const isProfessional = !!(skill.modIds.find(modId => state.skillModifications[modId].type === 'professional'));
    const isOptional = !!(skill.modIds.find(modId => state.skillModifications[modId].type === 'optional'));
    const isSelected = !!(skill.modIds.find(modId => state.skillModifications[modId].type === 'selected'));
    let professionalSkill;
    let professionalValue;

    if (isProfessional || isOptional) {
      professionalSkill = rootState.rulesystem.professions[rootState.character.profession].skills[isProfessional ? 'fixed' : 'optional'][skill.skillname];
      professionalValue = Number.isInteger(professionalSkill) ? professionalSkill : professionalSkill.value;
    }

    return {
      skillname: skill.skillname,
      specialisationName: skill.specialisation,
      hasSpecialisation: !!(skillRuleset.specialisation),
      baseValue: skillRuleset.value,
      professionalValue: professionalValue || null,
      isProfessional,
      isOptional,
      isSelected,
      bonusCount: skill.modIds.filter(modId => state.skillModifications[modId].type === 'bonus').length,
    };
  },
};

const mutations = {
  resetSkillsState(context) {
    Object.keys(context).forEach(stateObject => Object.assign(stateObject, {}));
  },
  initSkillMap(context, payload) {
    Object.keys(payload).forEach(skill => Vue.set(context.skillMap, skill, []));
  },
  newCharacterSkill(context, { skillname, specialisation, id }) {
    Vue.set(context.characterSkills, id, {
      skillname,
      specialisation,
      modIds: [],
    });

    // Update skill map
    context.skillMap[skillname].push(id);
  },
  newSkillModification(context, { type, skillId, id }) {
    Vue.set(context.skillModifications, id, {
      type,
      skillId,
    });
  },
  removeCharacterSkill(context, { skillId }) {
    const { skillname } = context.characterSkills[skillId];
    Vue.delete(context.characterSkills, skillId);
    Vue.delete(context.skillMap[skillname], context.skillMap[skillname].findIndex(id => id === skillId));
  },
  modIdToSkill(context, { skillId, modId }) {
    context.characterSkills[skillId].modIds.push(modId);
  },
  removeModification(context, { modId }) {
    Vue.delete(context.skillModifications, modId);
  },
  removeModificationFromSkill(context, { modId, skillId }) {
    const { modIds } = context.characterSkills[skillId];
    modIds.splice(modIds.indexOf(modId), 1);
  },
  changeSpecialisation(context, { skillId, specialisation }) {
    Vue.set(context.characterSkills[skillId], 'specialisation', specialisation);
  },
};

function createID() {
  const dateInt = new Date().getTime();
  const randomInt = Math.floor(Math.random() * 50000);
  return `${dateInt}-${randomInt}`;
}

const actions = {
  [act.INIT_CHARACTER_SKILLS]({ commit, rootState }) {
    commit('resetSkillsState');
    commit('initSkillMap', rootState.rulesystem.skills);
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
  async setProfessionalSkill({
    commit, dispatch, state, rootGetters,
  }, { skillname, skill, type }) {
    const currentCharacterSkills = state.skillMap[skillname];
    const skillRuleset = rootGetters[get.SKILL_BY_NAME](skillname);
    const isSpecialisationPredefined = typeof skill === 'object';

    // If a specialisation is possible OR this skill does not exist yet,
    // always add a new skill and a new modification
    // If notskillname, isOptional, add the new modification to the existing skill
    const isNewSkillNeeded = skillRuleset.hasSpecialisation || currentCharacterSkills.length === 0;
    const specialisation = isSpecialisationPredefined ? skill.specialisation : '';

    const skillId = isNewSkillNeeded
      ? await dispatch(act.NEW_CHARACTER_SKILL, { skillname, specialisation })
      : currentCharacterSkills[0];

    const modId = await dispatch(act.NEW_SKILL_MODIFICATION, { type, skillId });
    commit('modIdToSkill', { skillId, modId });
  },
  async [act.SET_PROFESSION_SKILLS]({ dispatch, rootGetters }, professionId) {
    const professionalSkills = rootGetters[get.PROFESSIONAL_SKILLS_BY_ID](professionId);
    const optionalSkills = rootGetters[get.OPTIONAL_SKILLS_BY_ID](professionId);

    const promisesProfessional = Object.keys(professionalSkills).map(async skillname => {
      await dispatch('setProfessionalSkill', { skillname, skill: professionalSkills[skillname], type: 'professional' });
    });

    const promisesOptional = Object.keys(optionalSkills).map(async skillname => {
      await dispatch('setProfessionalSkill', { skillname, skill: optionalSkills[skillname], type: 'optional' });
    });

    await Promise.all([...promisesProfessional, ...promisesOptional]);
  },
  [act.REMOVE_PROFESSION_SKILLS]({ commit, state }) {
    const professionalModIds = Object.keys(state.skillModifications).filter(modId => {
      const mod = state.skillModifications[modId];
      return mod.type === 'professional' || mod.type === 'optional' || mod.type === 'selected';
    });

    // Remove the modification, the modId from the skill and
    // if the skill has no more modifications, that as well
    professionalModIds.forEach(modId => {
      const { skillId } = state.skillModifications[modId];
      commit('removeModification', { modId });
      commit('removeModificationFromSkill', { skillId, modId });

      if (!state.characterSkills[skillId].modIds.length && !state.characterSkills[skillId].name) {
        commit('removeCharacterSkill', { skillId });
      }
    });
  },
  async [act.ADD_BONUS_SKILL]({ commit, dispatch }, { skillname, skillId, specialisation }) {
    // Create new skill if no skillId has been determined
    const newSkillId = skillId || await dispatch(act.NEW_CHARACTER_SKILL, { skillname, specialisation });
    const newModId = await dispatch(act.NEW_SKILL_MODIFICATION, { type: 'bonus', skillId: newSkillId });
    commit('modIdToSkill', { skillId: newSkillId, modId: newModId });
  },
  [act.REMOVE_BONUS_SKILL]({ commit, state }, { skillId }) {
    const skill = state.characterSkills[skillId];
    const modId = skill.modIds.find(id => state.skillModifications[id].type === 'bonus');

    commit('removeModification', { modId });
    commit('removeModificationFromSkill', { skillId, modId });

    if (!state.characterSkills[skillId].modIds.length && !state.characterSkills[skillId].specialisation) {
      commit('removeCharacterSkill', { skillId });
    }
  },
  async [act.TOGGLE_OPTIONAL_SKILL]({ commit, state, dispatch }, { skillId }) {
    // Check if this skill is already selected
    const { modIds } = state.characterSkills[skillId];
    const modId = modIds.find(id => state.skillModifications[id].type === 'selected');

    if (modId) {
      // Remove the modification
      commit('removeModification', { modId });
      commit('removeModificationFromSkill', { skillId, modId });
    } else {
      // Create a selected modification and add it to the skill
      const newModId = await dispatch(act.NEW_SKILL_MODIFICATION, { type: 'selected', skillId });
      commit('modIdToSkill', { skillId, modId: newModId });
    }
  },
  async [act.ADD_SPECIALISATION]({ commit, dispatch }, { skillname, isOptional }) {
    const newSkillId = await dispatch(act.NEW_CHARACTER_SKILL, { skillname, specialisation: '' });

    if (isOptional) {
      const newModId = await dispatch(act.NEW_SKILL_MODIFICATION, { type: 'optional', skillId: newSkillId });
      commit('modIdToSkill', { skillId: newSkillId, modId: newModId });
    }
  },
  [act.MODIFY_SPECIALISATION]({ commit }, { skillId, specialisation }) {
    commit('changeSpecialisation', { skillId, specialisation });
  },
  [act.REMOVE_SPECIALISATION]({ commit, dispatch }, { skillId }) {
    commit('removeCharacterSkill', { skillId });
    dispatch(act.REMOVE_SKILL_FROM_MODIFICATIONS, { skillId });
  },
  [act.REMOVE_SKILL_FROM_MODIFICATIONS]({ commit, state }, { skillId }) {
    Object.keys(state.skillModifications).forEach(modId => {
      if (state.skillModifications[modId].skillId === skillId) {
        commit('removeModification', { modId });
      }
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
