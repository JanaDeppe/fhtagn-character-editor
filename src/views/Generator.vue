<template lang="pug">
.grid-x.grid-margin-x.grid-margin-y
  .cell.medium-8.medium-cell-block-y
    keep-alive
      component(
        :is="steps[currentStep]"
        @back-to-start="resetStep"
        )
    .grid-x
      .cell.small-6
        button.button(v-show="currentStep > 0" @click="prevStep") Vorheriger Schritt
      .cell.small-6.text-right
        button.button(
            v-show="currentStep > 0 && currentStep < steps.length-1"
            @click="nextStep"
        ) Nächster Schritt

  .cell.medium-4.medium-cell-block-y.callout
    sidebar-summary

</template>

<script>
import { mapState } from 'vuex';
import {
  PREV_STEP,
  NEXT_STEP,
  RESET_STEP,
  FLUSH_WARNINGS,
} from '@/store/mutations.type';

import store from '@/store';

import StartGeneration from '@/views/StartGeneration.vue';
import Attributes from '@/views/Attributes.vue';
import Professions from '@/views/Professions.vue';
import BonusSkills from '@/views/BonusSkills.vue';
import Connections from '@/views/Connections.vue';
import Facettes from '@/views/Facettes.vue';
import Motivations from '@/views/Motivations.vue';
import PersonalInformation from '@/views/PersonalInformation.vue';
import CharacterSummary from '@/views/CharacterSummary.vue';
import Prompts from '@/components/Prompts.vue';

import SidebarSummary from '@/components/SidebarSummary.vue';

export default {
  components: {
    StartGeneration,
    Attributes,
    Professions,
    BonusSkills,
    Connections,
    Facettes,
    Motivations,
    PersonalInformation,
    CharacterSummary,
    SidebarSummary,
    Prompts,
  },
  props: '',
  computed: {
    ...mapState({
      currentStep: state => state.common.currentStepIndex,
      steps: state => state.common.generatorSteps,
      warnings: state => state.common.warnings,
      currentWarnings: state => state.common.currentWarnings,
    }),
  },
  methods: {
    prevStep() {
      store.commit(PREV_STEP);
    },
    nextStep() {
      if (this.currentWarnings.length) {
        this.currentWarnings.forEach((item) => {
          this.$notify({
            group: 'default',
            type: 'warn',
            title: this.warnings[item].title,
            text: this.warnings[item].text,
          });
        });
        store.commit(FLUSH_WARNINGS);
      }
      store.commit(NEXT_STEP);
    },
    resetStep() {
      store.commit(RESET_STEP);
    },
  },
};
</script>
