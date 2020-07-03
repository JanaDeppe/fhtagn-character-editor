<template lang="pug">
.d-flex.flex-column.app-container.border.m-3
  .flex-shrink-1.navbar.justify-content-end
    ul.nav
      li.nav-item
        router-link(to="/" class="nav-link") Zurück zum Anfang
  .flex-grow-1
    router-view

  .flex-shrink-1.navbar.justify-content-end
    .row
      //- a.col-auto(
        href="https://gitlab.com/Redbow/fhtagn-character-editor/tags"
        target="_blank")
        small Version {{appVersion}}
      a.col-auto.bug-report-link(
        @click="isBugReportOpen = true")
        small
          span.bug-report-link__icon.material-icons bug_report
          | Bug melden oder Idee mitteilen

  modal(
    :isVisible="isBugReportOpen"
    @modal-closed="isBugReportOpen = false")
    h3(slot="header") Hast du einen Bug gefunden?
    p &nbsp;
    p Oder eine Idee für eine neue Funktion?
    p Bitte
      a(target="_blank" href="mailto: incoming+redbow-fhtagn-character-editor-9841490-issue-@incoming.gitlab.com")  schreib mir eine E-Mail
      | , dann kümmere ich mich darum. Danke!

  notifications(group="default")
</template>

<script>
import { mapGetters } from 'vuex';
import { get } from '@/store/type';

import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      isBugReportOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      appVersion: get.APP_VERSION,
    }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 630px;
  overflow: auto;
}

.bug-report-link {
  &__icon {
    vertical-align: -7px;
  }
}
</style>
