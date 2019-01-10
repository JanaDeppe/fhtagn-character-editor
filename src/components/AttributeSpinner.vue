<template lang="pug">
.grid-x.align-stretch
  .cell.auto
    input(
      min="0"
      type="number"
      :id="inputId"
      v-model="currentPoints"
      @input="onInput"
      v-bind:class="{'is-invalid-input': error}"
    )
  .cell.shrink.button-container
    button.tiny.button.primary(@click="onIncrementalChange") -1
    button.tiny.button.primary(@click="onIncrementalChange") +1
  .cell.shrink.button-container
    button.tiny.button.primary(@click="onIncrementalChange") -5
    button.tiny.button.primary(@click="onIncrementalChange") +5
  .cell.small-12.label.warning(v-if="error") {{errorTypes[error]}}

</template>

<script>

export default {
  props: {
    inputId: {
      type: String,
      default: '',
    },
    points: {
      type: Number,
      default: 3,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  model: {
    event: 'pointsUpdated',
  },
  computed: {
  },
  data() {
    return {
      error: false,
      currentPoints: this.points,
      errorTypes: {
        tooLow: 'Kein Attributswert darf unter 3 bleiben.',
        tooHigh: 'Kein Attributswert darf höher als 18 sein.',
      },
    };
  },
  methods: {
    onInput(e) {
      this.checkForError(e.currentTarget.value);
      this.$emit('pointsUpdated', this.currentPoints);
    },
    onIncrementalChange(e) {
      const newValue = parseInt(this.currentPoints, 10) + parseInt(e.currentTarget.textContent, 10);
      if (newValue < 0) return;

      this.checkForError(newValue);
      this.currentPoints = newValue;
      this.$emit('pointsUpdated', this.currentPoints);
    },
    checkForError(newValue) {
      if (newValue > 18) {
        this.error = 'tooHigh';
      } else if (newValue < 3) {
        this.error = 'tooLow';
      } else {
        this.error = false;
      }
    },
  },
};

</script>

<style lang="scss" scoped>
  input {
    height: 100%;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    margin-left: 3px;
  }

  button {
    flex-basis: 50%;
    margin: 0;
    font-weight: bold;
  }

  button:first-child {
    border-radius: 35% 35% 0 0;
    margin-bottom: 1px;
  }

  button:last-child {
    border-radius: 0 0 35% 35%;
    margin-top: 1px;
  }

  .label {
    margin-top: 3px;
  }
</style>
