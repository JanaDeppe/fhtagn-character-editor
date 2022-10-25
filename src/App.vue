<template lang="pug">
.flex.flex-col.m-3
  .flex.shrink.justify-end
    ul.list-none
      li
        router-link(to="/" class="nav-link") Zurück zum Anfang
  .grow
    router-view

  .flex.shrink.justify-end
    .locale-changer.pr-3
      select(v-model="$i18n.locale")
        option(
          v-for="name, locale in locales"
          :key="`locale-${locale}`" 
          :value="locale"
        ) {{ name }}

    .flex
      a.block.bug-report-link(
        @click="isBugReportOpen = true")
        small
          span.bug-report-link__icon.material-icons bug_report
          | Bug melden oder Idee mitteilen

  modal-box(
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
import ModalBox from "@/components/ModalBox.vue";

export default {
  components: {
    ModalBox,
  },
  data() {
    return {
      locales: {
        de: "Deutsch",
        en: "English",
      },
      isBugReportOpen: false,
    };
  },
  methods: {},
};
</script>

<style lang="css" scoped>
.bug-report-link__icon {
  vertical-align: -7px;
}
</style>
