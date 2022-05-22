import { defineStore } from 'pinia';
import Vue from 'vue';
import Vuex from 'vuex';

import common from './common.module';
import rulesystem from './rulesystem.module';
import character from './character.module';
import skills from './skills.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    rulesystem,
    character,
    skills,
  },
});
