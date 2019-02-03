<template lang="pug">
.grid-y
  .cell.align-self-bottom.text-right.label.primary
    .h6.margin-vertical-0 Restliche Punkte: {{remainingPoints}}
  .cell.label.warning(v-if="error") {{errorTypes[error]}}
  .cell(v-for="attribute in attributes")
    .grid-x.grid-padding-x.field-container
      .cell.medium-4
        label.text-right.middle(:for="attribute.abbr") {{attribute.name}}
      .cell.medium-8.large-6
        attribute-spinner(
          :input-id="attribute.abbr"
          v-model="currentAttributes[attribute.abbr]"
          @pointsUpdated="updateAttributeValues"
        )

</template>

<script>
import { mapState, mapActions } from 'vuex';

import AttributeSpinner from '@/components/AttributeSpinner.vue';

export default {
  model: {
    prop: 'attributeValues',
  },
  props: {
    attributeValues: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    AttributeSpinner,
  },
  data() {
    return {
      availablePoints: 72,
      currentAttributes: {},
      error: false,
      errorTypes: {
        negative: 'Du hast mehr als 72 Attributspunkte verteilt.',
      },
    };
  },
  computed: {
    ...mapState({
      attributes: state => state.rulesystem.attributes,
    }),
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
    if (Object.keys(this.attributeValues).length === 0) this.setInitAttributes();
  },
  methods: {
    ...mapActions('common', [
      'addWarning',
      'removeWarning',
    ]),
    setInitAttributes() {
      this.attributes.forEach((item) => {
        this.$set(this.currentAttributes, item.abbr, 3);
        this.$emit('input', this.currentAttributes);
      });
    },
    updateAttributeValues() {
      this.checkForError(this.remainingPoints);
      this.$emit('input', this.currentAttributes);
    },
    checkForError(newValue) {
      if (newValue < 0) {
        this.error = 'negative';
        this.removeWarning('attributePointsRemaining');
      } else if (newValue > 0) {
        this.addWarning('attributePointsRemaining');
      } else {
        this.addWarning('attributePointsRemaining');
        this.error = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
    .field-container {
        margin: .3rem 0;
    }
</style>
