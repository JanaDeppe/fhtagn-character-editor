<template lang="pug">
p DragnDropAttributes
</template>

<script>
import { mapGetters } from 'vuex';
import { get } from '@/store/type';

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
    ...mapGetters({
      attributeList: get.ATTRIBUTE_LIST,
    }),
  },
  method: {
    updateAttributeValues() {
      this.$emit('update:attributeValues', this.attributeValues);
    },
  },
};
</script>
