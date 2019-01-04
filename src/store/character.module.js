import Vue from 'vue';

import {
  SET_ATTRIBUTE_VALUES,

  UPDATE_PROFESSION,
  SET_PROFESSION_VARIANT,

  SET_SKILL_LIST,
  SET_SKILL_VALUE,
  SET_PROFESSIONAL_SKILL,
  SET_OPTIONAL_SKILL,
  SELECT_OPTIONAL_SKILL,
  SET_BONUS_SKILL,

  ADD_SPECIALISATION,
  MODIFY_SPECIALISATION,
  DELETE_SPECIALISATION,

  UPDATE_CONNECTIONS,
  UPDATE_FACETTES,
  UPDATE_MOTIVATIONS,
  SET_PERSONAL_INFORMATION,
} from './mutations.type';

import {
  CREATE_NEW_CHARACTER,
  SET_PROFESSION,
  TOGGLE_SKILL,
  NEW_SPECIALISATION,
  CHANGE_SPECIALISATION,
  REMOVE_SPECIALISATION,
} from './actions.type';


const state = {
  attributeValues: {},
  connections: [],
  derivedValues: {},
  facettes: [],
  motivations: [],
  personalInformation: {
    Vorname: '',
    Nachname: '',
    Geschlecht: '',
    Alter: '',
    Aussehen: '',
  },
  profession: -1,
  professionVariant: '',
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
  getDerivedValues(state) {
    return state.derivedValues;
  },
  getProfessionId: state => state.profession,
  getProfessionalSkills(state) {
    return reduceSkillList(state.skills, item => item.isProfessional);
  },
  getOptionalSkills(state) {
    return reduceSkillList(state.skills, item => item.isOptional);
  },
  getModifiedSkills(state) {
    return reduceSkillList(state.skills, item => item.isProfessional || item.isBonus || item.isSelected);
  },
  getReducedSkills(state) {
    return reduceSkillList(state.skills, () => true);
  },
  getOptionalSkillCount(state) {
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
  getSkillByName: state => (skill, index) => {
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
  getCalculatedSkillValueByName: (state, getters) => (skill, index) => {
    const currentSkill = getters.getSkillByName(skill, index);
    let value = currentSkill.value ? currentSkill.value : currentSkill.baseValue;

    if (currentSkill.isBonus) value += 20;

    return value;
  },
};

const mutations = {
  [SET_ATTRIBUTE_VALUES](context, payload) {
    context.attributeValues = payload;
  },
  [UPDATE_PROFESSION](context, professionIndex) {
    context.profession = professionIndex;
  },
  [SET_PROFESSION_VARIANT](context, variant) {
    context.professionVariant = variant;
  },
  [SET_SKILL_LIST](context, skills) {
    Vue.set(context, 'skills', skills);
  },
  [SET_SKILL_VALUE](context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'value', value);
  },
  [SET_PROFESSIONAL_SKILL](context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isProfessional', typeof value === 'boolean' ? value : !currentSpecialisation.isProfessional);
  },
  [SET_OPTIONAL_SKILL](context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isOptional', typeof value === 'boolean' ? value : !currentSpecialisation.isOptional);
  },
  [SELECT_OPTIONAL_SKILL](context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isSelected', typeof value === 'boolean' ? value : !currentSpecialisation.isSelected);
  },
  [SET_BONUS_SKILL](context, { skill, index, value }) {
    const currentSpecialisation = context.skills[skill].specialisations[index || 0];
    Vue.set(currentSpecialisation, 'isBonus', typeof value === 'boolean' ? value : !currentSpecialisation.isBonus);
  },
  [ADD_SPECIALISATION](context, {
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
  [MODIFY_SPECIALISATION](context, { skill, specialisation, index }) {
    Vue.set(context.skills[skill].specialisations[index || 0], 'name', specialisation);
  },
  [DELETE_SPECIALISATION](context, { skill, index }) {
    context.skills[skill].specialisations.splice(index || 0, 1);
  },
  [UPDATE_CONNECTIONS](context, payload) {
    context.connections = payload;
  },
  [UPDATE_FACETTES](context, payload) {
    context.facettes = payload;
  },
  [UPDATE_MOTIVATIONS](context, payload) {
    context.motivations = payload;
  },
  [SET_PERSONAL_INFORMATION](context, payload) {
    context.personalInformation = Object.assign({}, payload);
  },
};

const actions = {
  [CREATE_NEW_CHARACTER]({ commit, rootGetters }) {
    /* mutations:
    * SET_SKILL_LIST
    */
    const allSkills = rootGetters.getSkillList;
    const characterSkillList = {};

    Object.keys(allSkills).forEach((skill) => {
      characterSkillList[skill] = {
        type: allSkills[skill].type,
        baseValue: allSkills[skill].value,
        hasSpecialisation: !!(allSkills[skill].specialisation),
        specialisations: [
          {
            name: undefined,
            value: undefined,
            isProfessional: false,
            isOptional: false,
            isSelected: false,
            isBonus: false,
          },
        ],
      };
    });
    commit(SET_SKILL_LIST, characterSkillList);
  },
  [SET_PROFESSION]({
    commit, dispatch, state, rootGetters,
  }, payload) {
    /* mutations:
    * DELETE_SPECIALISATION
    * TOGGLE_SKILL
    * UPDATE_PROFESSION
    * ADD_SPECIALISATION
    */
    dispatch(CREATE_NEW_CHARACTER);

    const professionalSkills = rootGetters.getProfessionalSkillsById(payload);
    const optionalSkills = rootGetters.getOptionalSkillsById(payload);

    function assignSkills(skillsObject, toggleMethod) {
      Object.keys(skillsObject).forEach((skill) => {
        const currSkill = state.skills[skill];
        const value = skillsObject[skill];
        const isSpecialisationPredefined = typeof value === 'object';
        const professionalSkillIndex = currSkill.specialisations.findIndex(specialisation => specialisation.isProfessional);

        // If there's no professional specialisation defined, just toggle the first specialisation
        if (professionalSkillIndex === -1) {
          commit(toggleMethod, {
            skill,
            index: 0,
            value: true,
          });

          commit(SET_SKILL_VALUE, {
            skill,
            index: 0,
            value: isSpecialisationPredefined ? value.value : value,
          });

          if (isSpecialisationPredefined) {
            commit(MODIFY_SPECIALISATION, {
              skill,
              index: 0,
              specialisation: value.specialisation,
            });
          }
        } else {
          commit(ADD_SPECIALISATION, {
            skill,
            specialisation: isSpecialisationPredefined ? value.specialisation : undefined,
            value: isSpecialisationPredefined ? value.value : value,
            [toggleMethod === SET_PROFESSIONAL_SKILL ? 'isProfessional' : 'isOptional']: true,
          });
        }
      });
    }

    assignSkills(professionalSkills, SET_PROFESSIONAL_SKILL);
    assignSkills(optionalSkills, SET_OPTIONAL_SKILL);

    commit(UPDATE_PROFESSION, payload);
    commit(SET_PROFESSION_VARIANT, '');
  },
  [TOGGLE_SKILL]({ commit }, {
    skill, index, type, value,
  }) {
    /* mutations:
    * SET_PROFESSIONAL_SKILL
    * SET_OPTIONAL_SKILL
    * SELECT_OPTIONAL_SKILL
    * SET_BONUS_SKILL
    */
    let mutationName;
    switch (type) {
    case 'optional':
      mutationName = SELECT_OPTIONAL_SKILL;
      break;
    case 'bonus':
      mutationName = SET_BONUS_SKILL;
      break;
    default:
      mutationName = '';
    }
    commit(mutationName, { skill, index, value });
  },
  [NEW_SPECIALISATION]({ commit }, {
    skill, specialisation, isProfessional, isOptional, isSelected, isBonus,
  }) {
    /* mutations:
    * ADD_SPECIALISATION
    * TOGGLE_SKILL
    */
    // TODO: change this action to use the mutations for toggling sill states
    commit(ADD_SPECIALISATION, {
      skill,
      specialisation,
      isProfessional,
      isOptional,
      isSelected,
      isBonus,
    });
  },
  [CHANGE_SPECIALISATION]({ commit }, { skill, specialisation, index }) {
    /* mutations:
    * MODIFY_SPECIALISATION
    */
    commit(MODIFY_SPECIALISATION, {
      skill,
      specialisation,
      index,
    });
  },
  [REMOVE_SPECIALISATION]({ commit }, { skill, index }) {
    /* mutations:
    * DELETE_SPECIALISATION
    */
    commit(DELETE_SPECIALISATION, {
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
