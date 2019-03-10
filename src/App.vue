<template lang="pug">
.grid-y.medium-grid-frame.grid-padding-x.grid-padding-y
  .cell.shrink.top-bar
    ul.menu
      li
        router-link(to="/") Editor
      li
        router-link(to="/about") About
  .cell.medium-auto.medium-cell-block-container
    router-view

  .cell.shrink.top-bar
    .top-bar-right.grid-x.grid-padding-x
      a.cell.shrink(
        href="https://gitlab.com/Redbow/fhtagn-character-editor/tags"
        target="_blank")
        small Version {{appVersion}}
      a.cell.shrink.bug-report-link(
        @click="isBugReportOpen = true")
        small
          span.bug-report-link__icon.material-icons bug_report
          | Bug melden

  modal(
    :isVisible="isBugReportOpen"
    @modal-closed="isBugReportOpen = false")
    h3(slot="header") Einen Fehler melden
    p Hast du einen Bug gefunden?
    p Bitte
      a(target="_blank" href="mailto: incoming+redbow-fhtagn-character-editor-9841490-issue-@incoming.gitlab.com")  schreib mir eine E-Mail
      | , dann kümmere ich mich darum. Danke!

  notifications(group="default")
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal,
  },
  computed: {
    ...mapGetters({
      appVersion: 'common/appVersion',
    }),
  },
  data() {
    return {
      isBugReportOpen: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bug-report-link {
  &__icon {
    vertical-align: -7px;
  }
}
</style>
