<template lang="pug">
.d-flex.flex-column
  .row: .col: h2.text-center Attribute vergeben
  .row.text-right
    .col-10.h4 Restliche Punkte: {{remainingPoints}}
  .h4
    .d-block.badge.badge-warning(v-if="error") {{errorTypes[error]}}
  div(v-for="attribute in rulesystemStore.attributes")
    .row.form-group
      .col-12.col-md-4.text-right.align-self-center
        label(:for="attribute.abbr") {{attribute.name}}
      .col-12.col-md-8.col-lg-6
        attribute-spinner(
          :input-id="attribute.abbr"
          v-model:points="currentAttributes[attribute.abbr]"
          @update:points="updateAttributeValues"
        )

</template>

<script>
import { mapStores } from "pinia";
import { useRulesystemStore } from "../stores/rulesystem";
import { useCommonStore } from "../stores/common";

import AttributeSpinner from "@/components/AttributeSpinner.vue";

export default {
  props: {
    attributeValues: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:attributeValues"],
  components: {
    AttributeSpinner,
  },
  data() {
    return {
      availablePoints: 72,
      currentAttributes: {},
      error: false,
      errorTypes: {
        negative: "Du hast mehr als 72 Attributspunkte verteilt.",
      },
    };
  },
  computed: {
    ...mapStores(useCommonStore, useRulesystemStore),
    currentPointsTotal() {
      let total = 0;
      Object.keys(this.currentAttributes).forEach((item) => {
        total += parseInt(this.currentAttributes[item], 10);
      });
      return total;
    },
    remainingPoints() {
      return this.availablePoints - this.currentPointsTotal;
    },
  },
  created() {
    this.setInitAttributes();
  },
  activated() {
    if (Object.keys(this.attributeValues).length === 0)
      this.setInitAttributes();
  },
  methods: {
    setInitAttributes() {
      this.rulesystemStore.attributes.forEach((item) => {
        this.currentAttributes[item.abbr] = 3;
        this.$emit("update:attributeValues", this.currentAttributes);
      });
    },
    updateAttributeValues() {
      this.checkForError();
      this.$emit("update:attributeValues", this.currentAttributes);
    },
    checkForError() {
      if (this.remainingPoints < 0) {
        this.error = "negative";
        this.commonStore.removeWarning("attributePointsRemaining");
      } else if (this.remainingPoints === 0) {
        this.error = false;
        this.commonStore.removeWarning("attributePointsRemaining");
      } else if (this.remainingPoints > 0) {
        this.error = false;
        this.commonStore.addWarning("attributePointsRemaining");
      }
    },
  },
};
</script>

<style scoped>
.field-container {
  margin: 0.3rem 0;
}
</style>
