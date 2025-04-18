<template lang="pug">
.flex.flex-wrap
  .basis-full
    h2 {{ $tc("common.terms.connections", 2) }}
    p {{ $t("views.connections.writeConnections") }}
  .basis-full.md_basis-7-12.my-3(v-for="(connection, index) in characterStore.connections")
    label.block {{ $tc("common.terms.connections", 1) }} \#{{index+1}}
    input.w-full(
      type="text"
      :placeholder="$t('views.connections.nameOfConnection')"
      @change="handleConnectionsChange($event, index)")
</template>

<script>
import { mapStores } from "pinia";
import { useCommonStore } from "../stores/common";
import { useCharacterStore } from "../stores/character";

export default {
  props: "",
  computed: {
    ...mapStores(useCharacterStore, useCommonStore),
  },
  created() {
    this.checkForError(this.currentConnections);
  },
  methods: {
    handleConnectionsChange(e, index) {
      this.characterStore
        .updateConnection(index, e.currentTarget.value)
        .then(() => this.checkForError());
    },
    checkForError() {
      let isComplete = true;
      this.characterStore.connections.forEach((element) => {
        if (element.trim() === "") {
          isComplete = false;
        }
      });
      if (isComplete) {
        this.commonStore.removeWarning("missingConnections");
      } else {
        this.commonStore.addWarning("missingConnections");
      }
    },
  },
};
</script>
