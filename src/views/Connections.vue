<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Verbindungen
    p Schreibe deine Verbindungen und eine kurze Beschreibung dazu!
  .cell(v-for="(connection, index) in currentConnections")
    label Verbindung \#{{index+1}}
      input(
        type="text"
        placeholder="Name der Verbindung"
        v-model="currentConnections[index]")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

export default {
  props: '',
  computed: {
    ...mapGetters({
      getAvailableConnectionsCount: get.AVAILABLE_CONNECTIONS_COUNT_BY_ID,
      professionId: get.PROFESSION_ID,
      connections: get.CONNECTIONS,
    }),
    availableConnections() {
      return this.getAvailableConnectionsCount(this.professionId);
    },
    currentConnections: {
      get() { return this.connections; },
      set(newValue) {
        this.checkForError(newValue);
        this.updateConnections(newValue);
      },
    },
  },
  created() {
    this.checkForError(this.currentConnections);
  },
  activated() {
    const connectionsToAdd = this.availableConnections - this.currentConnections.length;
    if (connectionsToAdd > 0) {
      for (let i = 0; i < connectionsToAdd; i += 1) {
        this.currentConnections.push('');
      }
    } else if (connectionsToAdd < 0) {
      for (let i = 0; i < Math.abs(connectionsToAdd); i += 1) {
        this.currentConnections.pop();
      }
    }
  },
  methods: {
    ...mapActions({
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
      updateConnections: act.UPDATE_CONNECTIONS,
    }),
    checkForError(connections) {
      let isComplete = true;
      connections.forEach((element) => {
        if (element.trim() === '') {
          isComplete = false;
        }
      });
      if (isComplete) {
        this.removeWarning('missingConnections');
      } else {
        this.addWarning('missingConnections');
      }
    },
  },
};
</script>
