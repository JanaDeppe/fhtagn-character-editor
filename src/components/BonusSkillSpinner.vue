<template lang="pug">
div.container
  button.btn.btn-outline-secondary.btn-sm(
    @click="onRemove"
    :disabled="!(bonusCount.length)"
  ) -
  button.btn.btn-outline-secondary.btn-sm(@click="onAdd") +
</template>

<script>
export default {
  props: {
    bonusCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:bonusCount"],
  data() {
    return {};
  },
  methods: {
    onAdd() {
      this.$emit("update:bonusCount", "add");
    },
    onRemove() {
      this.$emit("update:bonusCount", "remove");
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
