<template lang="pug">
.flex.flex-wrap
  .basis-full
    h2 {{ $tc("common.terms.facettes", 2) }}
    p {{ $t("views.facettes.addFacettes") }}
  .basis-full(v-for="facetteKey in rulesystemStore.facettes").callout
    .flex.my-3
      .mr-5
        input(
          type="checkbox"
          v-model="selectedFacettes"
          :value="$t(`rulesystem.facettes.${facetteKey}.name`)"
          :id="$t(`rulesystem.facettes.${facetteKey}.name`)")
      label.block.grow(:for="name")
        h4 {{$t(`rulesystem.facettes.${facetteKey}.name`)}}
        p {{$t(`rulesystem.facettes.${facetteKey}.description`)}}
        p
          strong {{ $t("common.terms.advantage") }}:
          |  {{$t(`rulesystem.facettes.${facetteKey}.advantage`)}}
        p
          strong {{ $t("common.terms.disadvantage") }}:
          |  {{$t(`rulesystem.facettes.${facetteKey}.disadvantage`)}}
</template>

<script>
import { mapStores } from "pinia";
import { useRulesystemStore } from "../stores/rulesystem";
import { useCharacterStore } from "../stores/character";

export default {
  props: "",
  computed: {
    ...mapStores(useRulesystemStore, useCharacterStore),
    selectedFacettes: {
      get() {
        return this.characterStore.facettes;
      },
      set(newValue) {
        this.characterStore.facettes = newValue;
      },
    },
  },
};
</script>
