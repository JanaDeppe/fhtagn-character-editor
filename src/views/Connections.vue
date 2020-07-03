<template lang="pug">
.row
  .col-12
    h2.text-center Verbindungen
    p Schreibe deine Verbindungen und eine kurze Beschreibung dazu!
  .col-12(v-for="(connection, index) in connections")
    .form-group
      label Verbindung \#{{index+1}}
      input.form-control(
        type="text"
        placeholder="Name der Verbindung"
        @change="handleConnectionsChange($event, index)")
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
  },
  created() {
    this.checkForError(this.currentConnections);
  },
  methods: {
    ...mapActions({
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
      updateConnection: act.UPDATE_CONNECTION,
    }),
    handleConnectionsChange(e, index) {
      this.updateConnection({
        index,
        value: e.currentTarget.value,
      }).then(() => this.checkForError());
    },
    checkForError() {
      let isComplete = true;
      this.connections.forEach(element => {
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
