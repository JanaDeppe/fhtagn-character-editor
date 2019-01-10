<template lang="pug">
p DragnDropAttributes
</template>

<script>
import { mapState } from 'vuex';
// import store from '@/store';

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
    ...mapState({
      attributes: state => state.rulesystem.attributes,
    }),
  },
  method: {
    updateAttributeValues() {
      this.$emit('update:attributeValues', this.attributeValues);
    },
  },
};
</script>
