import Vue from 'vue';

import { get, act } from './type';

const state = {
  skills: {},
};

function reduceSkillList(skillList, filterFunction) {
  const reducedList = [];
  Object.keys(skillList).forEach((skill) => {
    const currentSkill = skillList[skill];
    currentSkill.specialisations.forEach((specialisation, index) => {
      if (filterFunction(specialisation)) {
        reducedList.push({
          skill,
          hasSpecialisation: currentSkill.hasSpecialisation,
          baseValue: currentSkill.baseValue,
          name: specialisation.name,
          value: specialisation.value,
          index,
          isBonus: specialisation.isBonus,
        });
      }
    });
  });
  return reducedList;
}

const getters = {
  [get.PROFESSIONAL_SKILLS](state) {
    return reduceSkillList(state.skills, item => item.isProfessional);
  },
  [get.OPTIONAL_SKILLS](state) {
    return reduceSkillList(state.skills, item => item.isOptional);
  },
  [get.MODIFIED_SKILLS](state) {
    return reduceSkillList(state.skills, item => item.isProfessional || item.isBonus || item.isSelected);
  },
  [get.REDUCED_SKILLS](state) {
    return reduceSkillList(state.skills, () => true);
  },
  [get.OPTIONAL_SKILL_COUNT](state) {
    let optionalSkillCount = 0;
    Object.keys(state.skills).forEach((skill) => {
      state.skills[skill].specialisations.forEach((specialisation) => {
        if (specialisation.isSelected) {
          optionalSkillCount += 1;
        }
      });
    });
    return optionalSkillCount;
  },
  [get.SKILL_BY_NAME]: state => (skill, index) => {
    const currentSkill = state.skills[skill];
    const currentSpecialisation = currentSkill.specialisations[index];

    return {
      hasSpecialisation: currentSkill.hasSpecialisation,
      baseValue: currentSkill.baseValue,
      name: currentSpecialisation.name,
      value: currentSpecialisation.value,
      isProfessional: currentSpecialisation.isProfessional,
      isOptional: currentSpecialisation.isOptional,
      isSelected: currentSpecialisation.isSelected,
      isBonus: currentSpecialisation.isBonus,
    };
  },
  [get.CALCULATED_SKILL_VALUE_BY_NAME]: (state, getters) => (skill, index) => {
    const currentSkill = getters[get.SKILL_BY_NAME](skill, index);
    let value = currentSkill.value ? currentSkill.value : currentSkill.baseValue;

    if (currentSkill.isBonus) value += 20;

    return value;
  },
};

const mutations = {
  setSkillList(context, skills) {
    Vue.set(context, 'skills', skills);
  },
  setSkillValue(context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'value', value);
  },
  setProfessionalSkill(context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isProfessional', typeof value === 'boolean' ? value : !currentSpecialisation.isProfessional);
  },
  setOptionalSkill(context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isOptional', typeof value === 'boolean' ? value : !currentSpecialisation.isOptional);
  },
  selectOptionalSkill(context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isSelected', typeof value === 'boolean' ? value : !currentSpecialisation.isSelected);
  },
  setBonusSkill(context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isBonus', typeof value === 'boolean' ? value : !currentSpecialisation.isBonus);
  },
  addSpecialisation(context, {
    skill, specialisation, value, isProfessional = false, isOptional = false, isSelected = false, isBonus = false,
  }) {
    context.skills[skill].specialisations.push({
      name: specialisation,
      value,
      isProfessional,
      isOptional,
      isSelected,
      isBonus,
    });
  },
  modifySpecialisation(context, { skill, specialisation, index }) {
    Vue.set(context.skills[skill].specialisations[index || 0], 'name', specialisation);
  },
  deleteSpecialisation(context, { skill, index }) {
    context.skills[skill].specialisations.splice(index || 0, 1);
  },
};

const actions = {
  [act.TOGGLE_SKILL]({ commit }, {
    skill, index, type, value,
  }) {
    let mutationName;
    switch (type) {
    case 'optional':
      mutationName = 'selectOptionalSkill';
      break;
    case 'bonus':
      mutationName = 'setBonusSkill';
      break;
    default:
      mutationName = '';
    }
    commit(mutationName, { skill, index, value });
  },
  [act.NEW_SPECIALISATION]({ commit }, {
    skill, specialisation, isProfessional, isOptional, isSelected, isBonus,
  }) {
    commit('addSpecialisation', {
      skill,
      specialisation,
      isProfessional,
      isOptional,
      isSelected,
      isBonus,
    });
  },
  [act.CHANGE_SPECIALISATION]({ commit }, { skill, specialisation, index }) {
    commit('modifySpecialisation', {
      skill,
      specialisation,
      index,
    });
  },
  [act.REMOVE_SPECIALISATION]({ commit }, { skill, index }) {
    commit('deleteSpecialisation', {
      skill,
      index,
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
