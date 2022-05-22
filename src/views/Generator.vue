<template lang="pug">
.container-fluid
  .row
    .col-12.col-md-8
      keep-alive
        router-view
      .row.mt-3
        .col-6
          router-link.btn.btn-secondary(
            v-if="showPrevButton"
            :to="'/' + prevStep.path") Vorheriger Schritt
        .col-6.text-right
          router-link.btn.btn-secondary(
            v-if="showNextButton"
            :to="'/' + nextStep.path") Nächster Schritt

    .col-12.col-md-4.d-flex
      .border-left.p-3.flex-grow-1
        //- sidebar-summary

</template>

<script>
import { mapStores } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { useCharacterStore } from '@/stores/character';

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
    ...mapStores(useCommonStore, useCharacterStore),
    showPrevButton() { return !!(this.prevStep); },
    showNextButton() {
      return (!!(this.nextStep) && this.nextStep.name !== 'attributes')
        || (this.nextStep.name === 'attributes' && this.characterStore.isCharacterStarted);
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      /* eslint-disable no-param-reassign */
      const nextRouteIndex = vm.commonStore.editorSteps.findIndex(record => to.name === record.name);
      if (nextRouteIndex === 0) vm.prevStep = false;
      else vm.prevStep = vm.commonStore.editorSteps[nextRouteIndex - 1];

      if (nextRouteIndex === vm.commonStore.editorSteps.length - 1) vm.nextStep = false;
      else vm.nextStep = vm.commonStore.editorSteps[nextRouteIndex + 1];
      /* eslint-enable no-param-reassign */
    });
  },
  beforeRouteUpdate(to, from, next) {
    const nextRouteIndex = this.commonStore.editorSteps.findIndex(record => to.name === record.name);
    if (nextRouteIndex === 0) this.prevStep = false;
    else this.prevStep = this.commonStore.editorSteps[nextRouteIndex - 1];

    if (nextRouteIndex === this.commonStore.editorSteps.length - 1) this.nextStep = false;
    else this.nextStep = this.commonStore.editorSteps[nextRouteIndex + 1];

    if (this.commonStore.currentWarnings.length) {
      this.commonStore.currentWarnings.forEach(item => {
        const currentWarningData = this.commonStore.warningDataByKey(item);
        console.log(currentWarningData);
        // TODO: fire notifications with new plugin
        // this.$notify({
        //   group: 'default',
        //   type: 'warn',
        //   title: currentWarningData.title,
        //   text: currentWarningData.text,
        // });
      });
      this.commonStore.flushWarnings();
    }

    next();
  },
  created() {
    this.characterStore.createNewCharacter();
  },
};
</script>
