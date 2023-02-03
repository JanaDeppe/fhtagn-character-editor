<template lang="pug">
section.flex.flex-col.gap-3.mt-3
  .basis-full
    h2.text-center {{ $t("views.attributes.standard.distributeAttributes")}}
  .basis-full.text-right {{ $t("views.attributes.standard.remainingPoints") }}: {{remainingPoints}}
  .basis-full
    .block.border.text-center.border-red-600.bg-red-100.my-3.p-2(v-if="error") {{errorTypes[error]}}
  .flex.gap-3(v-for="attribute in rulesystemStore.attributes")
      .basis-full.md_basis-4-12.text-right.self-center
        label(:for="attribute.abbr") {{ $t(`rulesystem.attributes.name.${attribute.name}`)}}
      .basis-full.md_basis-8-12.lg_basis-6-12
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
