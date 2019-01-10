import Vue from 'vue';
import Vuex from 'vuex';

import common from './common.module';
import rulesystem from './rulesystem.module';
import character from './character.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    rulesystem,
    character,
  },
});
