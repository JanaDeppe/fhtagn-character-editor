import { defineStore } from "pinia";
import { useRulesystemStore } from "@/stores/rulesystem";

function isModifiedSkill(mods) {
  const hasModifications = !mods.length;
  const hasBonus = mods.find((mod) => mod.type === "bonus");
  const isOptional = mods.find((mod) => mod.type === "optional");
  const isSelected = mods.find((mod) => mod.type === "selected");
  const isProfessional = mods.find((mod) => mod.type === "professional");
  const isProfessionalSelected = mods.find(
    (mod) => mod.type === "selectedProfessional"
  );

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

function createID() {
  const dateInt = new Date().getTime();
  const randomInt = Math.floor(Math.random() * 50000);
  return `${dateInt}-${randomInt}`;
}

export const useSkillsStore = defineStore("skills", {
  state: () => ({
    characterSkills: {},
    skillMap: {},
    modifications: {},
    conjunctions: {},
    conjunctionCache: [],
  }),
  getters: {},
  actions: {
    initCharacterSkills() {
      this.$reset();

      // Assign an empty array with the skillname as a key for every possible skill
      const skillsRulesystem = useRulesystemStore().skills;
      Object.keys(skillsRulesystem).forEach((skill) => {
        this.$patch((state) => {
          state.skillMap[skill] = [];
        });
      });
    },
  },
});
