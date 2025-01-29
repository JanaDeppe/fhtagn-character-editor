<template lang="pug">
transition(name="modalBox" appear)
  .overlay
    .modal-container
      .flex.mb-3.gap-3
        .header.grow: h6 {{ $t("views.summary.characterSheet") }}
        button(v-if="hasCloseButton" class="close material-icons" @click="close()")
      .body.mb-3
        .text-center.my-3
          a.button(href="") {{ $t("views.summary.downloadCharactersheet", { name: this.characterSheetName}) }}
        iframe.pdf-document-viewer(ref="pdfDocumentViewer")
      .footer

</template>

<script>
import ModalBox from "@/components/ModalBox.vue";

export default {
  extends: ModalBox,
  props: {
    characterData: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      characterSheetHtml: "",
      characterSheetServiceInitiated: false,
    };
  },
  computed: {
    characterSheetName() {
      const { firstName, lastName } =
        this.characterData.characterData.personalInformation;
      if (firstName || lastName) {
        return `Fhtagn${`-${firstName}`}${`-${lastName}`}.pdf`;
      }
      return "Fhtagn-Character.pdf";
    },
  },
  mounted() {
    const self = this;
    console.log(JSON.stringify(this.characterData))
    // self.characterSheetService.init().then(() => {
    //   self.createPDFDocument();
    // });
  },
  methods: {
    createPDFDocument() {
    },
  },
};
</script>

<style scoped>
.modal-container {
  width: 95%;
  height: 95%;
  max-width: none;
}

.body {
  overflow: scroll;
}

.pdf-document-viewer {
  width: 100%;
  height: 100%;
}
</style>
