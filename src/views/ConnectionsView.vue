<template lang="pug">
.row
  .col-12
    h2.text-center Verbindungen
    p Schreibe deine Verbindungen und eine kurze Beschreibung dazu!
  .col-12(v-for="(connection, index) in characterStore.connections")
    .form-group
      label Verbindung \#{{index+1}}
      input.form-control(
        type="text"
        placeholder="Name der Verbindung"
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
        .updateConnection({
          index,
          value: e.currentTarget.value,
        })
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
