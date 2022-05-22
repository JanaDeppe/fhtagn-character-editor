<template lang="pug">
.row.no-gutters
  .col
    input.form-control(
      min="0"
      type="number"
      :id="inputId"
      v-model="currentPoints"
      @input="onInput"
      v-bind:class="{'is-invalid-input': error}"
    )
  .flex-shrink-1.button-container
    button.btn.btn-outline-secondary.btn-sm(@click="onIncrementalChange") -1
    button.btn.btn-outline-secondary.btn-sm(@click="onIncrementalChange") +1
  .flex-shrink-1.button-container
    button.btn.btn-outline-secondary.btn-sm(@click="onIncrementalChange") -5
    button.btn.btn-outline-secondary.btn-sm(@click="onIncrementalChange") +5
  .col-12.mt-1(v-if="error")
    .h5
      .d-block.badge.badge-warning {{errorTypes[error]}}

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
  },
  model: {
    prop: 'points',
    event: 'pointsUpdated',
  },
  data() {
    return {
      error: false,
      errorTypes: {
        tooLow: 'Kein Attributswert darf unter 3 bleiben.',
        tooHigh: 'Kein Attributswert darf höher als 18 sein.',
      },
    };
  },
  computed: {
    currentPoints: {
      get() { return this.points; },
      set(newValue) {
        if (Number.isNaN(parseInt(newValue, 10))) this.$emit('pointsUpdated', 0);
        else this.$emit('pointsUpdated', newValue);
      },
    },
  },
  methods: {
    onInput(e) {
      this.checkForError(e.currentTarget.value);
    },
    onIncrementalChange(e) {
      const newValue = parseInt(this.currentPoints, 10) + parseInt(e.currentTarget.textContent, 10);
      if (newValue < 0) return;

      this.checkForError(newValue);
      this.currentPoints = newValue;
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

<style scoped>
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
