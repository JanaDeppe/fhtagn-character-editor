<template lang="pug">
.flex.flex-wrap
  .basis-auto
    input.border.h-full(
      min="0"
      type="number"
      :id="inputId"
      v-model="currentPoints"
      @input="onInput"
      v-bind:class="{'border-red-600': error}"
    )
  .flex-shrink-1.flex.flex-col.ml-2
    button.rounded-t-xl.button.text-sm.p-1.mb-1(@click="onIncrementalChange") -1
    button.rounded-b-xl.button.text-sm.p-1(@click="onIncrementalChange") +1
  .flex-shrink-1.flex.flex-col.ml-2
    button.rounded-t-xl.button.text-sm.p-1.mb-1(@click="onIncrementalChange") -5
    button.rounded-b-xl.button.text-sm.p-1(@click="onIncrementalChange") +5
  .basis-full.mt-1(v-if="error")
    .h5
      .block.badge {{errorTypes[error]}}

</template>

<script>
export default {
  props: {
    inputId: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 3,
    },
  },
  emits: ["update:points"],
  data() {
    return {
      error: false,
      errorTypes: {
        tooLow: "Kein Attributswert darf unter 3 bleiben.",
        tooHigh: "Kein Attributswert darf höher als 18 sein.",
      },
    };
  },
  computed: {
    currentPoints: {
      get() {
        return this.points;
      },
      set(newValue) {
        if (Number.isNaN(parseInt(newValue, 10))) {
          this.$emit("update:points", 0);
        } else {
          this.$emit("update:points", newValue);
        }
      },
    },
  },
  methods: {
    onInput(e) {
      this.checkForError(e.currentTarget.value);
    },
    onIncrementalChange(e) {
      const newValue =
        parseInt(this.currentPoints, 10) +
        parseInt(e.currentTarget.textContent, 10);
      if (newValue < 0) return;

      this.checkForError(newValue);
      this.currentPoints = newValue;
    },
    checkForError(newValue) {
      if (newValue > 18) {
        this.error = "tooHigh";
      } else if (newValue < 3) {
        this.error = "tooLow";
      } else {
        this.error = false;
      }
    },
  },
};
</script>
