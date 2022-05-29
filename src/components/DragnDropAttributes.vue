<template lang="pug">
p DragnDropAttributes
</template>

<script>
import { mapStores } from "pinia";
import { useRulesystemStore } from "../stores/rulesystem";

export default {
  props: {
    distributableAttributeValues: {
      type: Array,
      default() {
        return [];
      },
    },
    attributeValues: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapStores(useRulesystemStore),
  },
  method: {
    updateAttributeValues() {
      this.$emit("update:attributeValues", this.attributeValues);
    },
  },
};
</script>
