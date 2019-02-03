<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Verbindungen
    p Schreibe deine Verbindungen und eine kurze Beschreibung dazu!
  .cell(v-for="(connection, index) in currentConnections")
    label Verbindung \#{{index+1}}
      input(type="text" placeholder="Name der Verbindung" v-model="currentConnections[index].name" @change="updateConnections")
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  UPDATE_CONNECTIONS,
} from '@/store/mutations.type';

import store from '@/store';

export default {
  props: '',
  data() {
    return {
      currentConnections: [],
    };
  },
  activated() {
    const connectionsToAdd = this.availableConnections - this.currentConnections.length;
    if (connectionsToAdd > 0) {
      for (let i = 0; i < connectionsToAdd; i += 1) {
        this.currentConnections.push({
          name: '',
        });
      }
    } else if (connectionsToAdd < 0) {
      for (let i = 0; i < Math.abs(connectionsToAdd); i += 1) {
        this.currentConnections.pop();
      }
    }
  },
  computed: {
    availableConnections() {
      return this.professions[this.characterProfession].connections;
    },
    ...mapState({
      professions: state => state.rulesystem.professions,
      characterProfession: state => state.character.profession,
      connections: state => state.character.connections,
    }),
  },
  created() {
    this.checkForError(this.currentConnections);
  },
  methods: {
    ...mapActions('common', [
      'addWarning',
      'removeWarning',
    ]),
    updateConnections() {
      this.checkForError(this.currentConnections);
      store.commit(UPDATE_CONNECTIONS, this.currentConnections);
    },
    checkForError(connections) {
      let isComplete = true;
      connections.forEach((element) => {
        if (element.name === '') {
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
