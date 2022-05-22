import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('character', {
  state: () => ({
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
    professionId: -1,
    professionVariant: '',
    isProfessionLoading: true,
  }),
  getters: {
    characterData: ({
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
    derivedValues: state => {
      const { ST, KO, EN } = state.attributeValues;
      const hitpoints = Math.ceil((ST + KO) / 2);
      const willpowerPoints = EN;
      const stabilityPoints = EN * 5;
      const breakingPoint = stabilityPoints - EN;

      return {
        hitpoints, willpowerPoints, stabilityPoints, breakingPoint,
      };
    },
    isCharacterStarted: state => Number.isInteger(state.attributeValues.ST),
  },
  actions: {
    toggleProfessionLoading: () => this.isProfessionLoading = !this.isProfessionLoading,
    createNewCharacter () {
      this.$reset();
      // TODO: create an appropriately sized array for the motivations (see old store)
      // commit('setMotivations', new Array(rootGetters[get.AVAILABLE_MOTIVATIONS]).fill(''));
      // TODO: init character skills (from skills)
      // dispatch(act.INIT_CHARACTER_SKILLS);
    }
  }
});