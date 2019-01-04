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
import { mapState } from 'vuex';
import {
  ADD_WARNING,
  REMOVE_WARNING,
} from '@/store/mutations.type';

import store from '@/store';

import AttributeSpinner from '@/components/AttributeSpinner.vue';

export default {
  props: {},
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
    this.attributes.forEach((item) => {
      this.$set(this.currentAttributes, item.abbr, 3);
      this.$emit('update:attributeValues', this.currentAttributes);
    });
  },
  methods: {
    updateAttributeValues() {
      this.checkForError(this.remainingPoints);
      this.$emit('update:attributeValues', this.currentAttributes);
    },
    checkForError(newValue) {
      if (newValue < 0) {
        this.error = 'negative';
        store.commit(REMOVE_WARNING, 'attributePointsRemaining');
      } else if (newValue > 0) {
        store.commit(ADD_WARNING, 'attributePointsRemaining');
      } else {
        store.commit(REMOVE_WARNING, 'attributePointsRemaining');
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
