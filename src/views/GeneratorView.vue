<template lang="pug">
.flex.gap-3.my-3
  .basis-full.md_basis-8-12
    router-view(v-slot="{ Component }")
      keep-alive
        component(:is="Component")
    .flex.mt-3
      .basis-1-2
        router-link.button(
          v-if="showPrevButton"
          :to="'/' + prevStep.path") Vorheriger Schritt
      .basis-1-2.text-right
        router-link.button(
          v-if="showNextButton"
          :to="'/' + nextStep.path") Nächster Schritt
    

  .flex.basis-full.md_basis-4-12
    .border-l.grow
      sidebar-summary

</template>

<script>
import { mapStores } from "pinia";
import { useCommonStore } from "@/stores/common";
import { useCharacterStore } from "@/stores/character";

import Prompts from "@/components/Prompts.vue";
import SidebarSummary from "@/components/SidebarSummary.vue";

export default {
  components: {
    SidebarSummary,
    Prompts,
  },
  props: "",
  data() {
    return {
      prevStep: false,
      nextStep: false,
    };
  },
  computed: {
    ...mapStores(useCommonStore, useCharacterStore),
    showPrevButton() {
      return !!this.prevStep;
    },
    showNextButton() {
      return (
        (!!this.nextStep && this.nextStep.name !== "attributes") ||
        (this.nextStep.name === "attributes" &&
          this.characterStore.isCharacterStarted)
      );
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      /* eslint-disable no-param-reassign */
      const nextRouteIndex = vm.commonStore.editorSteps.findIndex(
        (record) => to.name === record.name
      );

      if (nextRouteIndex === 0) vm.prevStep = false;
      else vm.prevStep = vm.commonStore.editorSteps[nextRouteIndex - 1];

      if (nextRouteIndex === vm.commonStore.editorSteps.length - 1)
        vm.nextStep = false;
      else vm.nextStep = vm.commonStore.editorSteps[nextRouteIndex + 1];
      /* eslint-enable no-param-reassign */
    });
  },
  beforeRouteUpdate(to, from, next) {
    const nextRouteIndex = this.commonStore.editorSteps.findIndex(
      (record) => to.name === record.name
    );
    if (nextRouteIndex === 0) this.prevStep = false;
    else this.prevStep = this.commonStore.editorSteps[nextRouteIndex - 1];

    if (nextRouteIndex === this.commonStore.editorSteps.length - 1)
      this.nextStep = false;
    else this.nextStep = this.commonStore.editorSteps[nextRouteIndex + 1];

    if (this.commonStore.currentWarnings.length) {
      this.commonStore.currentWarnings.forEach((item) => {
        const currentWarningData = this.commonStore.warningDataByKey(item);
        this.$notify({
          group: "default",
          type: "warn",
          title: currentWarningData.title,
          text: currentWarningData.text,
        });
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
