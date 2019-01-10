<template lang="pug">
.grid-y.medium-grid-frame.grid-padding-x.grid-padding-y
  .cell.shrink.top-bar
    ul.menu
      li
        router-link(to="/") Home
      li
        router-link(to="/editor") Editor
      li
        router-link(to="/about") About
  .cell.medium-auto.medium-cell-block-container
    router-view

  .cell.shrink.top-bar
    .top-bar-right
      a: small(
        href="https://gitlab.com/Redbow/fhtagn-character-editor/tags"
        target="_blank") Version {{getAppVersion}}

  notifications(group="default")
//- #app
  #nav
</template>

<script>
import { mapGetters } from 'vuex';

import store from '@/store';
import {
  FETCH_PAGES,
} from '@/store/actions.type';

import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal,
  },
  computed: {
    ...mapGetters([
      'common/pages',
      'getAppVersion',
    ]),
  },
  data() {
    return {
      currentPageIndex: 0,
      modalIsActive: false,
    };
  },
  methods: {
    fetchArticles() {
      store.dispatch(FETCH_PAGES);
    },
    prevPage() {
      this.currentPageIndex -= 1;
    },
    nextPage() {
      this.currentPageIndex += 1;
    },
  },
};
</script>
