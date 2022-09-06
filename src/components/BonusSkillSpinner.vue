<template lang="pug">
div.flex.ml-2.justify-end
  button.p-2.leading-3(
    @click="onRemove"
    :disabled="!(bonusCount > 0)"
  ) -
  button.ml-1.p-2.leading-3(@click="onAdd") +
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
button:first-child {
  border-radius: 35% 0 0 35%;
}

button:last-child {
  border-radius: 0 35% 35% 0;
}
</style>
