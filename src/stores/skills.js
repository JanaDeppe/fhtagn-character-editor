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
  getters: {
    modifiedSkills: (state) => {
      const skillIds = Object.keys(state.characterSkills).filter((id) => {
        const mods = state.characterSkills[id].modIds.map(
          (modId) => state.modifications[modId]
        );
        return isModifiedSkill(mods);
      });
      const modSkillArray = skillIds.map((id) => ({
        skillId: id,
        ...state.characterSkills[id],
      }));

      return modSkillArray.sort((a, b) =>
        a.skillname.localeCompare(b.skillname, "de")
      );
    },
    professionalSkills: (state) => {
      const conjunctions = [];
      const profModIds = Object.keys(state.modifications).filter(
        (mod) => state.modifications[mod].type === "professional"
      );

      const profSkillArray = profModIds.map((mod) => {
        let { conjunctionId } = state.modifications[mod];

        if (conjunctions.indexOf(conjunctionId) > -1)
          conjunctionId = "duplicate";
        else if (typeof conjunctionId === "string")
          conjunctions.push(conjunctionId);
        else conjunctionId = null;

        return {
          skillId: state.modifications[mod].skillId,
          ...state.characterSkills[state.modifications[mod].skillId],
          conjunctionId,
        };
      });
      return profSkillArray.sort((a, b) =>
        a.skillname.localeCompare(b.skillname, "de")
      );
    },
    optionalSkills: (state) => {
      const conjunctions = [];
      const profModIds = Object.keys(state.modifications).filter(
        (mod) => state.modifications[mod].type === "optional"
      );

      const profSkillArray = profModIds.map((mod) => {
        let { conjunctionId } = state.modifications[mod];

        if (conjunctions.indexOf(conjunctionId) > -1)
          conjunctionId = "duplicate";
        else if (typeof conjunctionId === "string")
          conjunctions.push(conjunctionId);
        else conjunctionId = null;

        return {
          skillId: state.modifications[mod].skillId,
          ...state.characterSkills[state.modifications[mod].skillId],
          conjunctionId,
        };
      });
      return profSkillArray.sort((a, b) =>
        a.skillname.localeCompare(b.skillname, "de")
      );
    },
    optionalSkillCount: (state) => {
      const skillModificationsSelectedIds = Object.keys(
        state.modifications
      ).filter((mod) => state.modifications[mod].type === "selected");
      let count = skillModificationsSelectedIds.length;
      let andConjunctions = 0;

      // Count how many AND conjunctions the selected skills include
      skillModificationsSelectedIds.forEach((selectedModId) => {
        const allModIds =
          state.characterSkills[state.modifications[selectedModId].skillId]
            .modIds;
        const optionalModId = allModIds.find(
          (id) => state.modifications[id].type === "optional"
        );
        const { conjunctionId } = state.modifications[optionalModId];
        if (conjunctionId && state.conjunctions[conjunctionId].type === "and")
          andConjunctions += 1;
      });

      count -= andConjunctions / 2;

      return count;
    },
    skillById: (state) => (skillId) => {
      const rulesystemStore = useRulesystemStore();
      const skill = state.characterSkills[skillId];
      const skillRuleset = rulesystemStore.skills[skill.skillname];

      const professionalMod = skill.modIds.find(
        (modId) => state.modifications[modId].type === "professional"
      );
      const isProfessional = !!professionalMod;

      const optionalMod = skill.modIds.find(
        (modId) => state.modifications[modId].type === "optional"
      );
      const isOptional = !!optionalMod;

      const isSelected = !!skill.modIds.find(
        (modId) => state.modifications[modId].type === "selected"
      );
      const isSelectedProfessional = !!skill.modIds.find(
        (modId) => state.modifications[modId].type === "selectedProfessional"
      );

      // const conjunctionModId = skill.modIds.find(modId => !!(state.modifications[modId].conjunctionId));
      // const conjunctionId = conjunctionModId ? state.modifications[conjunctionModId].conjunctionId : null;
      // const conjunction = conjunctionId ? state.conjunctions[conjunctionId] : null;

      let professionalValue;
      if (isProfessional)
        professionalValue =
          state.modifications[professionalMod].professionalValue;
      if (isOptional)
        professionalValue = state.modifications[optionalMod].professionalValue;

      return {
        skillname: skill.skillname,
        specialisationName: skill.specialisation,
        hasSpecialisation: !!skillRuleset.specialisation,
        baseValue: skillRuleset.value,
        professionalValue: professionalValue || null,
        isProfessional,
        isOptional,
        isSelected,
        isSelectedProfessional,
        bonusCount: skill.modIds.filter(
          (modId) => state.modifications[modId].type === "bonus"
        ).length,
        // conjunction,
      };
    },
    bonusSkillCount: (state) => {
      return Object.keys(state.modifications).filter(
        (mod) => state.modifications[mod].type === "bonus"
      ).length;
    },
    completeSkillMap: (state) => {
      const skillArray = Object.keys(state.skillMap);
      const reducedSkillArray = [];
      skillArray.forEach((skillname) => {
        if (state.skillMap[skillname].length) {
          state.skillMap[skillname].forEach((skillId) =>
            reducedSkillArray.push({ skillId, skillname })
          );
        } else {
          reducedSkillArray.push({ skillname });
        }
      });
      return reducedSkillArray;
    },
  },
  actions: {
    createCharacterSkill(skillname, specialisation) {
      const newID = createID();
      this.characterSkills[newID] = {
        skillname,
        specialisation,
        modIds: [],
      };
      this.skillMap[skillname].push(newID);
      return newID;
    },
    createModification(skillId, type, professionalValue) {
      const newID = createID();
      this.modifications[newID] = {
        type,
        skillId,
        professionalValue,
      };
      return newID;
    },
    createConjunction(skillIds, modIds, type) {
      const newID = createID();
      this.conjunctions[newID] = {
        skillIds,
        modIds,
        type,
      };
      return newID;
    },
    removeCharacterSkill(skillId) {
      const { skillname } = this.characterSkills[skillId];
      delete this.characterSkills[skillId];
      this.skillMap[skillname].splice(
        this.skillMap[skillname].findIndex((id) => id === skillId),
        1
      );
    },
    removeModificationFromSkill(modId, skillId) {
      // Remove modification from skill
      const { modIds } = this.characterSkills[skillId];
      modIds.splice(modIds.indexOf(modId), 1);
    },
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
    removeProfessionSkills() {
      const professionalModIds = Object.keys(this.modifications).filter(
        (modId) => {
          const mod = this.modifications[modId];
          return (
            mod.type === "professional" ||
            mod.type === "selectedProfessional" ||
            mod.type === "optional" ||
            mod.type === "selected"
          );
        }
      );

      // Remove the modification, the modId from the skill and
      // if the skill has no more modifications, that as well
      professionalModIds.forEach((modId) => {
        const { skillId } = this.modifications[modId];
        delete this.modifications[modId];
        const { modIds } = this.characterSkills[skillId];
        modIds.splice(modIds.indexOf(modId), 1);

        if (
          !this.characterSkills[skillId].modIds.length &&
          !this.characterSkills[skillId].name
        ) {
          this.removeCharacterSkill(skillId);
        }
      });

      this.conjunctions = {};
    },
    async setProfessionalSkill(skillname, skill, type) {
      const rulesystemStore = useRulesystemStore();
      const currentCharacterSkills = this.skillMap[skillname];
      const skillRuleset = rulesystemStore.skillByName(skillname);

      // If a specialisation is possible OR this skill does not exist yet,
      // always add a new skill and a new modification
      // If not, add the new modification to the existing skill
      const isNewSkillNeeded =
        skillRuleset.hasSpecialisation || currentCharacterSkills.length === 0;

      // Determine whether a specialisation exists and if it's predefined
      let hasConjunction = false;
      let isSpecialisationPredefined = false;
      let specialisation = "";

      if (typeof skill === "object") {
        hasConjunction = !!skill.conjunction;
        isSpecialisationPredefined =
          typeof skill.specialisation !== "undefined";
      }
      if (isSpecialisationPredefined) specialisation = skill.specialisation;

      // if "professional" type skills have conjunctions, they might not be automatically selected
      const isAutomaticallySelected =
        type === "professional" && !hasConjunction;

      const skillId = isNewSkillNeeded
        ? this.createCharacterSkill(skillname, specialisation)
        : currentCharacterSkills[0];

      const professionalValue =
        isSpecialisationPredefined || hasConjunction ? skill.value : skill;
      const modId = this.createModification(skillId, type, professionalValue);

      let modIdSelected;
      if (isAutomaticallySelected) {
        modIdSelected = this.createModification(
          skillId,
          "selectedProfessional"
        );
      }

      this.characterSkills[skillId].modIds.push(modId);
      if (modIdSelected)
        this.characterSkills[skillId].modIds.push(modIdSelected);
      if (hasConjunction) {
        this.conjunctionCache.push({
          skillname,
          skillId,
          modId,
          conjunction: skill.conjunction,
          combinedSkill: skill.combinedSkill,
        });
      }

      return modId;
    },
    async handleProfessionalSkillDefinition(skillname, skill, type) {
      // If there are multiple specialisations for a single skill,
      // I need to call this function for each one of these
      if (Array.isArray(skill)) {
        await Promise.all(
          skill.map(async (singleSkill) =>
            this.setProfessionalSkill(skillname, singleSkill, type)
          )
        );

        // Regular skills
      } else {
        await this.setProfessionalSkill(skillname, skill, type);
      }
    },
    async setConjunctions() {
      const preventDuplicates = [];
      this.conjunctionCache.forEach((itemA) => {
        this.conjunctionCache.forEach(async (itemB) => {
          const modificationTypeA = this.modifications[itemA.modId].type;
          const modificationTypeB = this.modifications[itemB.modId].type;

          if (itemA.skillId === itemB.skillId) return;
          if (itemA.skillname !== itemB.combinedSkill) return;
          if (modificationTypeA !== modificationTypeB) return;

          const preventDuplicate = `${[itemA.skillname, itemB.skillname]
            .sort()
            .join("-")}-${modificationTypeA}`;
          const indexDuplicate = preventDuplicates.indexOf(preventDuplicate);
          if (indexDuplicate > -1) return;
          preventDuplicates.push(preventDuplicate);

          const conjunctionId = await this.createConjunction(
            [itemA.skillId, itemB.skillId],
            [itemA.modId, itemB.modId],
            itemA.conjunction
          );

          this.modifications[itemA.modId].conjunctionId = conjunctionId;
          this.modifications[itemB.modId].conjunctionId = conjunctionId;
        });
      });

      this.conjunctionCache = [];
    },
    async setProfessionalSkills(professionId) {
      const rulesystemStore = useRulesystemStore();
      const professionalSkills =
        rulesystemStore.professionalSkillsById(professionId);
      const optionalSkills = rulesystemStore.optionalSkillsById(professionId);

      const promisesProfessional = Object.keys(professionalSkills).map(
        async (skillname) => {
          await this.handleProfessionalSkillDefinition(
            skillname,
            professionalSkills[skillname],
            "professional"
          );
        }
      );

      const promisesOptional = Object.keys(optionalSkills).map(
        async (skillname) => {
          await this.handleProfessionalSkillDefinition(
            skillname,
            optionalSkills[skillname],
            "optional"
          );
        }
      );

      await Promise.all([...promisesProfessional, ...promisesOptional]);
      await this.setConjunctions();
    },
    async toggleProfessionalSkill(skillId) {
      // Check if this skill is already selected
      const { modIds } = this.characterSkills[skillId];
      const modId = modIds.find(
        (id) => this.modifications[id].type === "selectedProfessional"
      );

      if (modId) {
        // Remove the modification
        delete this.modification[modId];
        this.removeModificationFromSkill(modId, skillId);
      } else {
        // Create a selected modification and add it to the skill
        const newModId = this.createModification(
          skillId,
          "selectedProfessional"
        );
        this.characterSkills[skillId].modIds.push(newModId);
      }
    },
    async toggleOptionalSkill(skillId) {
      // Check if this skill is already selected
      const { modIds } = this.characterSkills[skillId];
      const modId = modIds.find(
        (id) => this.modifications[id].type === "selected"
      );

      if (modId) {
        // Remove the modification
        delete this.modifications[modId];
        this.removeModificationFromSkill(modId, skillId);
      } else {
        // Create a selected modification and add it to the skill
        const newModId = this.createModification(skillId, "selected");
        this.characterSkills[skillId].modIds.push(newModId);
      }
    },
    async addSpecialisation(skillname, isOptional) {
      const newSkillId = this.createCharacterSkill(skillname, "");

      if (isOptional) {
        const newModId = this.createModification(newSkillId, "optional");
        this.characterSkills[newSkillId].modIds.push(newModId);
      }
    },
    modifySpecialisation(skillId, specialisation) {
      this.characterSkills[skillId].specialisation = specialisation;
    },
    removeSpecialisation(skillId) {
      this.removeCharacterSkill(skillId);
      Object.keys(this.modifications).forEach((modId) => {
        if (this.modifications[modId].skillId === skillId) {
          delete this.modifications[modId];
        }
      });
    },
    async addBonusSkill(skillname, skillId, specialisation) {
      // Create new skill if no skillId has been determined
      const newSkillId =
        skillId || this.createCharacterSkill(skillname, specialisation);
      const newModId = this.createModification(newSkillId, "bonus");
      this.characterSkills[newSkillId].modIds.push(newModId);
    },
    removeBonusSkill(skillId) {
      const skill = this.characterSkills[skillId];
      const modId = skill.modIds.find(
        (id) => this.modifications[id].type === "bonus"
      );

      delete this.modifications[modId];
      this.removeModificationFromSkill(modId, skillId);

      if (
        !this.characterSkills[skillId].modIds.length &&
        !this.characterSkills[skillId].specialisation
      ) {
        this.removeCharacterSkill(skillId);
      }
    },
  },
});
