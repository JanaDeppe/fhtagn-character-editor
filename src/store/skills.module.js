import Vue from 'vue';
import { get, act } from './type';

const state = {
  characterSkills: {},
  skillMap: {},
  modifications: {},
  conjunctions: {},
  conjunctionCache: [],
};

function isModifiedSkill(mods) {
  const hasModifications = !mods.length;
  const hasBonus = mods.find(mod => mod.type === 'bonus');
  const isOptional = mods.find(mod => mod.type === 'optional');
  const isSelected = mods.find(mod => mod.type === 'selected');
  const isProfessional = mods.find(mod => mod.type === 'professional');
  const isProfessionalSelected = mods.find(mod => mod.type === 'selectedProfessional');

  // Filter out all skills which do not have modifications
  if (hasModifications) return false;

  // If Skills have a bonus, they are always modified
  if (hasBonus) return true;

  // If skills are selected bonus or professional skills, they are also modified
  if (isOptional && isSelected) {
    return true;
  }
  if (isProfessional && isProfessionalSelected) {
    return true;
  }

  return false;
}

const getters = {
  [get.MODIFIED_SKILLS](state) {
    const skillIds = Object.keys(state.characterSkills)
      .filter(id => {
        const mods = state.characterSkills[id].modIds.map(modId => state.modifications[modId]);
        return isModifiedSkill(mods);
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
    const conjunctions = [];
    const profModIds = Object
      .keys(state.modifications)
      .filter(mod => state.modifications[mod].type === 'professional');

    const profSkillArray = profModIds.map(mod => {
      let { conjunctionId } = state.modifications[mod];

      if (conjunctions.indexOf(conjunctionId) > -1) conjunctionId = 'duplicate';
      else if (typeof conjunctionId === 'string') conjunctions.push(conjunctionId);
      else conjunctionId = null;

      return {
        skillId: state.modifications[mod].skillId,
        ...state.characterSkills[state.modifications[mod].skillId],
        conjunctionId,
      };
    });
    return profSkillArray.sort((a, b) => a.skillname.localeCompare(b.skillname, 'de'));
  },
  [get.OPTIONAL_SKILLS]: state => {
    const conjunctions = [];
    const profModIds = Object
      .keys(state.modifications)
      .filter(mod => state.modifications[mod].type === 'optional');

    const profSkillArray = profModIds.map(mod => {
      let { conjunctionId } = state.modifications[mod];

      if (conjunctions.indexOf(conjunctionId) > -1) conjunctionId = 'duplicate';
      else if (typeof conjunctionId === 'string') conjunctions.push(conjunctionId);
      else conjunctionId = null;

      return {
        skillId: state.modifications[mod].skillId,
        ...state.characterSkills[state.modifications[mod].skillId],
        conjunctionId,
      };
    });
    return profSkillArray.sort((a, b) => a.skillname.localeCompare(b.skillname, 'de'));
  },
  [get.OPTIONAL_SKILL_COUNT](state) {
    const skillModificationsSelectedIds = Object.keys(state.modifications).filter(mod => state.modifications[mod].type === 'selected');
    let count = skillModificationsSelectedIds.length;
    let andConjunctions = 0;

    // Count how many AND conjunctions the selected skills include
    skillModificationsSelectedIds.forEach(selectedModId => {
      const allModIds = state.characterSkills[state.modifications[selectedModId].skillId].modIds;
      const optionalModId = allModIds.find(id => state.modifications[id].type === 'optional');
      const { conjunctionId } = state.modifications[optionalModId];
      if (conjunctionId
        && state.conjunctions[conjunctionId].type === 'and') andConjunctions += 1;
    });

    count -= andConjunctions / 2;

    return count;
  },
  [get.BONUS_SKILL_COUNT](state) {
    return Object.keys(state.modifications).filter(mod => state.modifications[mod].type === 'bonus').length;
  },
  [get.SKILL_BY_ID]: (state, getters, rootState) => skillId => {
    const skill = state.characterSkills[skillId];
    const skillRuleset = rootState.rulesystem.skills[skill.skillname];

    const professionalMod = skill.modIds.find(modId => state.modifications[modId].type === 'professional');
    const isProfessional = !!(professionalMod);

    const optionalMod = skill.modIds.find(modId => state.modifications[modId].type === 'optional');
    const isOptional = !!(optionalMod);

    const isSelected = !!(skill.modIds.find(modId => state.modifications[modId].type === 'selected'));
    const isSelectedProfessional = !!(skill.modIds.find(modId => state.modifications[modId].type === 'selectedProfessional'));

    // const conjunctionModId = skill.modIds.find(modId => !!(state.modifications[modId].conjunctionId));
    // const conjunctionId = conjunctionModId ? state.modifications[conjunctionModId].conjunctionId : null;
    // const conjunction = conjunctionId ? state.conjunctions[conjunctionId] : null;

    let professionalValue;
    if (isProfessional) professionalValue = state.modifications[professionalMod].professionalValue;
    if (isOptional) professionalValue = state.modifications[optionalMod].professionalValue;

    return {
      skillname: skill.skillname,
      specialisationName: skill.specialisation,
      hasSpecialisation: !!(skillRuleset.specialisation),
      baseValue: skillRuleset.value,
      professionalValue: professionalValue || null,
      isProfessional,
      isOptional,
      isSelected,
      isSelectedProfessional,
      bonusCount: skill.modIds.filter(modId => state.modifications[modId].type === 'bonus').length,
      // conjunction,
    };
  },
  [get.CONJUNCTION_BY_ID]: state => conjunctionId => state.conjunctions[conjunctionId],
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
  newSkillModification(context, {
    type, skillId, id, professionalValue,
  }) {
    Vue.set(context.modifications, id, {
      type,
      skillId,
      professionalValue,
    });
  },
  newConjunction(context, {
    id, modIds, skillIds, type,
  }) {
    Vue.set(context.conjunctions, id, {
      skillIds,
      modIds,
      type,
    });
  },
  pushToConjunctionCache(context, payload) {
    context.conjunctionCache.push(payload);
  },
  removeConjunctionCache(context) {
    Vue.set(context, 'conjunctionCache', []);
  },
  wipeConjunctions(context) {
    Vue.set(context, 'conjunctions', {});
  },
  removeCharacterSkill(context, { skillId }) {
    const { skillname } = context.characterSkills[skillId];
    Vue.delete(context.characterSkills, skillId);
    Vue.delete(context.skillMap[skillname], context.skillMap[skillname].findIndex(id => id === skillId));
  },
  modIdToSkill(context, { skillId, modId }) {
    context.characterSkills[skillId].modIds.push(modId);
  },
  conjunctionIdToMod(context, { modId, conjunctionId }) {
    Vue.set(context.modifications[modId], 'conjunctionId', conjunctionId);
  },
  removeModification(context, { modId }) {
    Vue.delete(context.modifications, modId);
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
  createCharacterSkill({ commit }, { skillname, specialisation }) {
    const newID = createID();
    commit('newCharacterSkill', { skillname, specialisation, id: newID });
    return newID;
  },
  createModification({ commit }, { skillId, type, professionalValue }) {
    const newID = createID();
    commit('newSkillModification', {
      id: newID, type, skillId, professionalValue,
    });
    return newID;
  },
  createConjunction({ commit }, { skillIds, modIds, type }) {
    const newID = createID();
    commit('newConjunction', {
      id: newID, modIds, type, skillIds,
    });
    return newID;
  },
  async setProfessionalSkill({
    commit, dispatch, state, rootGetters,
  }, { skillname, skill, type }) {
    const currentCharacterSkills = state.skillMap[skillname];
    const skillRuleset = rootGetters[get.SKILL_BY_NAME](skillname);

    // If a specialisation is possible OR this skill does not exist yet,
    // always add a new skill and a new modification
    // If not, add the new modification to the existing skill
    const isNewSkillNeeded = skillRuleset.hasSpecialisation || currentCharacterSkills.length === 0;

    let hasConjunction = false;
    let isSpecialisationPredefined = false;
    let specialisation = '';

    if (typeof skill === 'object') {
      hasConjunction = !!(skill.conjunction);
      isSpecialisationPredefined = typeof skill.specialisation !== 'undefined';
    }

    const isAutomaticallySelected = type === 'professional' && !hasConjunction;

    if (isSpecialisationPredefined) specialisation = skill.specialisation;

    const skillId = isNewSkillNeeded
      ? await dispatch('createCharacterSkill', { skillname, specialisation })
      : currentCharacterSkills[0];

    const modId = await dispatch('createModification', {
      type,
      skillId,
      professionalValue: isSpecialisationPredefined || hasConjunction ? skill.value : skill,
    });

    let modIdSelected;
    if (isAutomaticallySelected) {
      modIdSelected = await dispatch('createModification', {
        type: 'selectedProfessional',
        skillId,
      });
    }

    commit('modIdToSkill', { skillId, modId });
    if (modIdSelected) commit('modIdToSkill', { skillId, modId: modIdSelected });
    if (hasConjunction) {
      commit('pushToConjunctionCache', {
        skillname, skillId, modId, conjunction: skill.conjunction, combinedSkill: skill.combinedSkill,
      });
    }

    return modId;
  },
  async conjunctionIdToMod({ commit }, { modId, conjunctionId }) {
    commit('conjunctionIdToMod', { modId, conjunctionId });
  },
  async setConjunctions({ commit, dispatch, state }) {
    const preventDuplicates = [];
    state.conjunctionCache.forEach(itemA => {
      state.conjunctionCache.forEach(async itemB => {
        const modificationTypeA = state.modifications[itemA.modId].type;
        const modificationTypeB = state.modifications[itemB.modId].type;

        if (itemA.skillId === itemB.skillId) return;
        if (itemA.skillname !== itemB.combinedSkill) return;
        if (modificationTypeA !== modificationTypeB) return;

        const preventDuplicate = `${[itemA.skillname, itemB.skillname].sort().join('-')}-${modificationTypeA}`;
        const indexDuplicate = preventDuplicates.indexOf(preventDuplicate);
        if (indexDuplicate > -1) return;
        preventDuplicates.push(preventDuplicate);

        const conjunctionId = await dispatch('createConjunction', {
          skillIds: [itemA.skillId, itemB.skillId],
          modIds: [itemA.modId, itemB.modId],
          type: itemA.conjunction,
        });

        commit('conjunctionIdToMod', { modId: itemA.modId, conjunctionId });
        commit('conjunctionIdToMod', { modId: itemB.modId, conjunctionId });
      });
    });

    commit('removeConjunctionCache');
  },
  async handleProfessionalSkillDefinition({ dispatch }, { skillname, skill, type }) {
    // If there are multiple specialisations for a single skill,
    // I need to call this function for each one of these
    if (Array.isArray(skill)) {
      await Promise.all(
        skill.map(async singleSkill => dispatch('setProfessionalSkill', { skillname, skill: singleSkill, type })),
      );

    // Regular skills
    } else {
      await dispatch('setProfessionalSkill', { skillname, skill, type });
    }
  },
  async [act.SET_PROFESSION_SKILLS]({ dispatch, rootGetters }, professionId) {
    const professionalSkills = rootGetters[get.PROFESSIONAL_SKILLS_BY_ID](professionId);
    const optionalSkills = rootGetters[get.OPTIONAL_SKILLS_BY_ID](professionId);

    const promisesProfessional = Object.keys(professionalSkills).map(async skillname => {
      await dispatch('handleProfessionalSkillDefinition', { skillname, skill: professionalSkills[skillname], type: 'professional' });
    });

    const promisesOptional = Object.keys(optionalSkills).map(async skillname => {
      await dispatch('handleProfessionalSkillDefinition', { skillname, skill: optionalSkills[skillname], type: 'optional' });
    });

    await Promise.all([...promisesProfessional, ...promisesOptional]);
    await dispatch('setConjunctions');
  },
  [act.REMOVE_PROFESSION_SKILLS]({ commit, state }) {
    const professionalModIds = Object.keys(state.modifications).filter(modId => {
      const mod = state.modifications[modId];
      return mod.type === 'professional'
        || mod.type === 'selectedProfessional'
        || mod.type === 'optional'
        || mod.type === 'selected';
    });

    // Remove the modification, the modId from the skill and
    // if the skill has no more modifications, that as well
    professionalModIds.forEach(modId => {
      const { skillId } = state.modifications[modId];
      commit('removeModification', { modId });
      commit('removeModificationFromSkill', { skillId, modId });

      if (!state.characterSkills[skillId].modIds.length && !state.characterSkills[skillId].name) {
        commit('removeCharacterSkill', { skillId });
      }
    });

    commit('wipeConjunctions');
  },
  async [act.ADD_BONUS_SKILL]({ commit, dispatch }, { skillname, skillId, specialisation }) {
    // Create new skill if no skillId has been determined
    const newSkillId = skillId || await dispatch('createCharacterSkill', { skillname, specialisation });
    const newModId = await dispatch('createModification', { type: 'bonus', skillId: newSkillId });
    commit('modIdToSkill', { skillId: newSkillId, modId: newModId });
  },
  [act.REMOVE_BONUS_SKILL]({ commit, state }, { skillId }) {
    const skill = state.characterSkills[skillId];
    const modId = skill.modIds.find(id => state.modifications[id].type === 'bonus');

    commit('removeModification', { modId });
    commit('removeModificationFromSkill', { skillId, modId });

    if (!state.characterSkills[skillId].modIds.length && !state.characterSkills[skillId].specialisation) {
      commit('removeCharacterSkill', { skillId });
    }
  },
  async [act.TOGGLE_PROFESSIONAL_SKILL]({ commit, state, dispatch }, { skillId }) {
    // Check if this skill is already selected
    const { modIds } = state.characterSkills[skillId];
    const modId = modIds.find(id => state.modifications[id].type === 'selectedProfessional');

    if (modId) {
      // Remove the modification
      commit('removeModification', { modId });
      commit('removeModificationFromSkill', { skillId, modId });
    } else {
      // Create a selected modification and add it to the skill
      const newModId = await dispatch('createModification', { type: 'selectedProfessional', skillId });
      commit('modIdToSkill', { skillId, modId: newModId });
    }
  },
  async [act.TOGGLE_OPTIONAL_SKILL]({ commit, state, dispatch }, { skillId }) {
    // Check if this skill is already selected
    const { modIds } = state.characterSkills[skillId];
    const modId = modIds.find(id => state.modifications[id].type === 'selected');

    if (modId) {
      // Remove the modification
      commit('removeModification', { modId });
      commit('removeModificationFromSkill', { skillId, modId });
    } else {
      // Create a selected modification and add it to the skill
      const newModId = await dispatch('createModification', { type: 'selected', skillId });
      commit('modIdToSkill', { skillId, modId: newModId });
    }
  },
  async [act.ADD_SPECIALISATION]({ commit, dispatch }, { skillname, isOptional }) {
    const newSkillId = await dispatch('createCharacterSkill', { skillname, specialisation: '' });

    if (isOptional) {
      const newModId = await dispatch('createModification', { type: 'optional', skillId: newSkillId });
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
    Object.keys(state.modifications).forEach(modId => {
      if (state.modifications[modId].skillId === skillId) {
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
