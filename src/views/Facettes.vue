<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Facetten
    p Füge, wenn du möchtest, deinem Charakter Facetten hinzu!
  .cell(v-for="(facette, name) in facettes").callout
    .grid-x.grid-padding-x
      .cell.shrink
        input(type="checkbox" v-model="selectedFacettes" v-bind:value="name" @change="handleFacettesChange")
      .cell.auto
        h4 {{name}}
        p {{facette.description}}
        p
          strong Vorteil:
          |  {{facette.advantage}}
        p
          strong Nachteil:
          |  {{facette.disadvantage}}
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { act } from '@/store/type';

export default {
  props: '',
  data() {
    return {
      selectedFacettes: [],
    };
  },
  computed: {
    ...mapState({
      facettes: state => state.rulesystem.facettes,
      characterFacettes: state => state.character.facettes,
    }),
  },
  methods: {
    ...mapActions({
      updateFacettes: act.UPDATE_FACETTES,
    }),
    handleFacettesChange() {
      this.updateFacettes(this.selectedFacettes);
    },
  },
};
</script>
