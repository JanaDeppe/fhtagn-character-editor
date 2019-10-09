<template lang="pug">
.grid-x.grid-margin-x.grid-margin-y
  .cell.medium-8.medium-cell-block-y
    keep-alive
      router-view
    .grid-x
      .cell.small-6
        router-link.button(
          v-if="showPrevButton"
          :to="'/' + prevStep.path") Vorheriger Schritt
      .cell.small-6.text-right
        router-link.button(
          v-if="showNextButton"
          :to="'/' + nextStep.path") Nächster Schritt

  .cell.medium-4.medium-cell-block-y.callout
    sidebar-summary

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Prompts from '@/components/Prompts.vue';
import SidebarSummary from '@/components/SidebarSummary.vue';

export default {
  components: {
    SidebarSummary,
    Prompts,
  },
  props: '',
  data() {
    return {
      prevStep: false,
      nextStep: false,
    };
  },
  computed: {
    ...mapGetters('common', [
      'editorSteps',
      'currentWarnings',
      'warningDataByKey',
    ]),
    showPrevButton() { return !!(this.prevStep); },
    showNextButton() { return !!(this.nextStep) || this.nextStep.name === 'start-generation'; },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      /* eslint-disable no-param-reassign */
      const nextRouteIndex = vm.editorSteps.findIndex(record => to.name === record.name);
      if (nextRouteIndex === 0) vm.prevStep = false;
      else vm.prevStep = vm.editorSteps[nextRouteIndex - 1];

      if (nextRouteIndex === vm.editorSteps.length - 1) vm.nextStep = false;
      else vm.nextStep = vm.editorSteps[nextRouteIndex + 1];
      /* eslint-enable no-param-reassign */
    });
  },
  beforeRouteUpdate(to, from, next) {
    const nextRouteIndex = this.editorSteps.findIndex(record => to.name === record.name);
    if (nextRouteIndex === 0) this.prevStep = false;
    else this.prevStep = this.editorSteps[nextRouteIndex - 1];

    if (nextRouteIndex === this.editorSteps.length - 1) this.nextStep = false;
    else this.nextStep = this.editorSteps[nextRouteIndex + 1];

    next();
  },
  beforeRouteLeave(to, from, next) {
    if (this.currentWarnings.length) {
      this.currentWarnings.forEach((item) => {
        const currentWarningData = this.warningDataByKey(item);
        this.$notify({
          group: 'default',
          type: 'warn',
          title: currentWarningData.title,
          text: currentWarningData.text,
        });
      });
      this.flushWarnings();
    }
    next();
  },
  methods: {
    ...mapActions('common', {
      flushWarnings: 'flushWarnings',
    }),
  },
};
</script>
