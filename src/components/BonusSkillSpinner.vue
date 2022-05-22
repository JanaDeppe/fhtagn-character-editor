<template lang="pug">
div.container
  button.btn.btn-outline-secondary.btn-sm(
    @click="onRemove"
    :disabled="!(bonusCount)"
  ) -
  button.btn.btn-outline-secondary.btn-sm(@click="onAdd") +
</template>

<script>
export default {
  components: {
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    bonusCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
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

<style scoped>
.container {
  display: flex;
  margin-left: 3px;
}

button {
  flex-basis: 50%;
  margin: 0;
  font-weight: bold;
}

button:first-child {
  border-radius: 35% 0 0 35%;
  margin-right: 1px;
}

button:last-child {
  border-radius: 0 35% 35% 0;
}
</style>
