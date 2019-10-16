<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Facetten
    p Füge, wenn du möchtest, deinem Charakter Facetten hinzu!
  .cell(v-for="(facette, name) in facettesList").callout
    .grid-x.grid-padding-x
      .cell.shrink
        input(
          type="checkbox"
          v-model="selectedFacettes"
          :value="name")
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
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

export default {
  props: '',
  computed: {
    ...mapGetters({
      facettes: get.FACETTES,
      facettesList: get.FACETTES_LIST,
    }),
    selectedFacettes: {
      get() { return this.facettes; },
      set(newValue) { this.updateFacettes(newValue); },
    },
  },
  methods: {
    ...mapActions({
      updateFacettes: act.UPDATE_FACETTES,
    }),
  },
};
</script>
