<template lang="pug">
.row
  .col-12
    h2.text-center Bonusfertigkeiten
    p Restliche Bonus-Fertigkeiten: {{ remainingBonusSkillCount }}
  .col-12
    ul.skill-list.cell
      li.border-bottom.skill-list__item.pb-2(
        v-for="skill in skillsStore.completeSkillMap"
        :key="skill.skillId || skill.skillname")
        single-skill(
          class="cell auto"
          :skillname="skill.skillname"
          :skillId="skill.skillId"
          :showBaseValue="true"
          :showCalculatedValue="true"
          :showBonusSpinner="true"
          @bonus-skill-changed="checkForError")


</template>

<script>
import { mapStores } from "pinia";
import { useSkillsStore } from "../stores/skills";
import { useCommonStore } from "../stores/common";

import SingleSkill from "@/components/SingleSkill.vue";

export default {
  props: {},
  components: {
    SingleSkill,
  },
  data() {
    return {
      availableSkills: 8,
      currentSkills: [],
    };
  },
  computed: {
    ...mapStores(useSkillsStore, useCommonStore),
    remainingBonusSkillCount() {
      return this.availableSkills - this.skillsStore.bonusSkillCount;
    },
  },
  created() {
    this.checkForError();
  },
  methods: {
    checkForError() {
      if (this.remainingBonusSkillCount > 0) {
        this.commonStore.addWarning("bonusSkillsRemaining");
      } else {
        this.commonStore.removeWarning("bonusSkillsRemaining");
      }
    },
    getKey(skillname) {
      const key = `${skillname}-${Math.floor(Math.random() * 50000)}`;
      return key;
    },
    onUseSkill() {
      this.usedSkills += 1;
    },
    onReturnSkill() {
      this.availableSkills.push(undefined);
      this.usedSkills -= 1;
    },
  },
};
</script>

<style scoped>
.bonus-list {
  background: #cccccc;
  min-height: 2rem;
}

.bonus-badge[draggable="false"] {
  display: none;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

@media screen and (min-width: 1024px) {
  .skill-list {
    column-count: 2;
    column-gap: 1rem;
  }
}

.skill-list__item {
  break-inside: avoid;
}
</style>
