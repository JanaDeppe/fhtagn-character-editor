import { get, act } from './type';

const state = {
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
  },
  profession: -1,
  professionVariant: '',
};

const getters = {
  [get.PROFESSION_ID]: state => state.profession,
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
  [get.DERIVED_VALUES]: (state) => {
    const { ST, KO, EN } = state.attributeValues;
    const hitpoints = Math.ceil((ST + KO) / 2);
    const willpowerPoints = EN;
    const stabilityPoints = EN * 5;
    const breakingPoint = stabilityPoints - EN;

    return {
      hitpoints, willpowerPoints, stabilityPoints, breakingPoint,
    };
  },
};

const mutations = {
  setAttributeValues(context, payload) {
    context.attributeValues = payload;
  },
  updateProfession(context, professionIndex) {
    context.profession = professionIndex;
  },
  setProfessionVariant(context, variant) {
    context.professionVariant = variant;
  },
  updateConnections(context, payload) {
    context.connections = payload;
  },
  updateFacettes(context, payload) {
    context.facettes = payload;
  },
  updateMotivations(context, payload) {
    context.motivations = payload;
  },
  setPersonalInformation(context, payload) {
    context.personalInformation = Object.assign({}, payload);
  },
};

const actions = {
  [act.CREATE_NEW_CHARACTER]({ commit, rootGetters }) {
    commit('setAttributeValues', {});
    commit('updateProfession', -1);
    commit('setProfessionVariant', '');
    commit('updateConnections', []);
    commit('updateFacettes', []);
    commit('updateMotivations', []);
    commit('setPersonalInformation', {
      Vorname: '',
      Nachname: '',
      Geschlecht: '',
      Alter: '',
      Aussehen: '',
    });

    const allSkills = rootGetters[get.SKILL_LIST];
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
    commit('setSkillList', characterSkillList);
  },
  [act.SET_PROFESSION]({
    commit, rootGetters, rootState,
  }, payload) {
    const professionalSkills = rootGetters[get.PROFESSIONAL_SKILLS_BY_ID](payload);
    const optionalSkills = rootGetters[get.OPTIONAL_SKILLS_BY_ID](payload);
    const characterSkills = rootState.skills.skills;

    function assignSkills(skillsObject, toggleMethod) {
      Object.keys(skillsObject).forEach((skill) => {
        const currSkill = characterSkills[skill];
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

          commit('setSkillValue', {
            skill,
            index: 0,
            value: isSpecialisationPredefined ? value.value : value,
          });

          if (isSpecialisationPredefined) {
            commit('modifySpecialisation', {
              skill,
              index: 0,
              specialisation: value.specialisation,
            });
          }
        } else {
          commit('addSpecialisation', {
            skill,
            specialisation: isSpecialisationPredefined ? value.specialisation : undefined,
            value: isSpecialisationPredefined ? value.value : value,
            [toggleMethod === 'setProfessionalSkill' ? 'isProfessional' : 'isOptional']: true,
          });
        }
      });
    }

    assignSkills(professionalSkills, 'setProfessionalSkill');
    assignSkills(optionalSkills, 'setOptionalSkill');

    commit('updateProfession', payload);
    commit('setProfessionVariant', '');
  },

};

export default {
  state,
  getters,
  mutations,
  actions,
};
