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
        span {{ $t(step) }}


</template>

<script>
import { mapStores } from "pinia";
import { useCharacterStore } from "../stores/character";

export default {
  props: "",
  computed: {
    ...mapStores(useCharacterStore),
  },
  data() {
    return {
      steps: [
        "views.startGeneration.steps.distributeAttributes",
        "views.startGeneration.steps.chooseProfession",
        "views.startGeneration.steps.pickSkills",
        "views.startGeneration.steps.createConnections",
        "views.startGeneration.steps.writeMotivations",
        "views.startGeneration.steps.giveName",
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
