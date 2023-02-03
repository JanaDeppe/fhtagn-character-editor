<template lang="pug">
.flex.flex-wrap.items-stretch
  .basis-full.mb-3.lg_order-0
    h1.text-center {{ $t("views.startGeneration.createANewCharacter") }}
  .basis-full.text-center.mb-3.lg_mb-0.lg_mt-3.lg_order-2
    button.button(@click="createNewCharacter") {{ $t("views.startGeneration.startANewCharacter") }}
  
  - var i = 0;

  .basis-full.grid.gap-3.grid-cols-3.grid-rows-2.lg_order-1
    .border.p-5.text-center(v-for="(step, i) in steps")
      .h4
        .badge.mb-3= i+1 
        br
        span {{ step }}


</template>

<script>
import { mapStores } from "pinia";
import { useCharacterStore } from "../stores/character";
import i18n from "@/i18n";

export default {
  props: "",
  computed: {
    ...mapStores(useCharacterStore),
  },
  data() {
    return {
      steps: [
        i18n.global.t("views.startGeneration.steps.distributeAttributes"),
        i18n.global.t("views.startGeneration.steps.chooseProfession"),
        i18n.global.t("views.startGeneration.steps.pickSkills"),
        i18n.global.t("views.startGeneration.steps.createConnections"),
        i18n.global.t("views.startGeneration.steps.writeMotivations"),
        i18n.global.t("views.startGeneration.steps.giveName"),
      ],
    };
  },
  methods: {
    createNewCharacter() {
      this.characterStore.createNewCharacter();
      this.$router.push({ name: "attributes" });
    },
  },
};
</script>
