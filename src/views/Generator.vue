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
      .border.p-3.flex-grow-1
        sidebar-summary

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

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
    ...mapGetters({
      editorSteps: get.EDITOR_STEPS,
      currentWarnings: get.CURRENT_WARNINGS,
      warningDataByKey: get.WARNING_DATA_BY_KEY,
    }),
    showPrevButton() { return !!(this.prevStep); },
    showNextButton() { return !!(this.nextStep) && this.nextStep.name !== 'attributes'; },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
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
      this.currentWarnings.forEach(item => {
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
  created() {
    this.createNewCharacter();
  },
  methods: {
    ...mapActions({
      flushWarnings: act.FLUSH_WARNINGS,
      createNewCharacter: act.CREATE_NEW_CHARACTER,
    }),
  },
};
</script>
