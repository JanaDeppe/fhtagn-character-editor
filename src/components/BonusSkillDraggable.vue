<template lang="pug">
  draggable.bonus-draggable(
      @add="onAdd"
      @remove="onRemove"
      :value="value"
      :list="list"
      :ghost-class="'ghost'"
      group="bonusSkills")
    .bonus-badge.label(v-for="(i, index) in realValue" :key="index") +20% Bonus
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable,
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    onAdd() {
      this.$emit('input', 'add');
    },
    onRemove() {
      this.$emit('input', 'remove');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/settings";

$badge-width: 95px;

.bonus-draggable {
  min-height: 1rem;
  background: theme-color("light");
  flex-basis: $badge-width;
  border-radius: $border-radius;
}
</style>
