<template lang="pug">
.d-flex.flex-column
  .row: .col: h2.text-center Attribute vergeben
  .row.text-right
    .col-10.h4 Restliche Punkte: {{remainingPoints}}
  .h4
    .d-block.badge.badge-warning(v-if="error") {{errorTypes[error]}}
  .mb-3(v-for="attribute in attributes")
    .row.form-group
      .col-12.col-md-4.text-right.align-self-center
        label(:for="attribute.abbr") {{attribute.name}}
      .col-12.col-md-8.col-lg-6
        attribute-spinner(
          :input-id="attribute.abbr"
          v-model="currentAttributes[attribute.abbr]"
          @pointsUpdated="updateAttributeValues"
        )

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

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
    ...mapGetters({
      attributes: get.ATTRIBUTE_LIST,
    }),
    currentPointsTotal() {
      let total = 0;
      Object.keys(this.currentAttributes).forEach(item => {
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
    ...mapActions({
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),
    setInitAttributes() {
      this.attributes.forEach(item => {
        this.$set(this.currentAttributes, item.abbr, 3);
        this.$emit('input', this.currentAttributes);
      });
    },
    updateAttributeValues() {
      this.checkForError();
      this.$emit('input', this.currentAttributes);
    },
    checkForError() {
      if (this.remainingPoints < 0) {
        this.error = 'negative';
        this.removeWarning('attributePointsRemaining');
      } else if (this.remainingPoints === 0) {
        this.error = false;
        this.removeWarning('attributePointsRemaining');
      } else if (this.remainingPoints > 0) {
        this.error = false;
        this.addWarning('attributePointsRemaining');
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
