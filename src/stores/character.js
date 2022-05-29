import { defineStore } from "pinia";
import { useRulesystemStore } from "@/stores/rulesystem";
import { useSkillsStore } from "@/stores/skills";

export const useCharacterStore = defineStore("character", {
  state: () => ({
    attributeValues: {},
    connections: [],
    facettes: [],
    motivations: [],
    personalInformation: {
      Vorname: "",
      Nachname: "",
      Muttersprache: "",
      Alter: "",
      Aussehen: "",
      Ausrüstungsgegenstände: "",
      Notizen: "",
    },
    professionId: -1,
    professionVariant: "",
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
    derivedValues: (state) => {
      const { ST, KO, EN } = state.attributeValues;
      const hitpoints = Math.ceil((ST + KO) / 2);
      const willpowerPoints = EN;
      const stabilityPoints = EN * 5;
      const breakingPoint = stabilityPoints - EN;

      return {
        hitpoints,
        willpowerPoints,
        stabilityPoints,
        breakingPoint,
      };
    },
    isCharacterStarted: (state) => Number.isInteger(state.attributeValues.ST),
  },
  actions: {
    toggleProfessionLoading: () =>
      (this.isProfessionLoading = !this.isProfessionLoading),
    createNewCharacter() {
      // Remove all data from an old character
      this.$reset();

      // Create a new, appropriately sized array for the motivations
      const rulesystemStore = useRulesystemStore();
      this.motivations = Array(rulesystemStore.availableMotivations).fill("");

      const skillsStore = useSkillsStore();
      skillsStore.initCharacterSkills();
    },
  },
});
