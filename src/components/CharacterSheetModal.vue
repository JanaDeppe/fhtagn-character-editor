<template lang="pug">
transition(name="modalBox" appear)
  .overlay
    .modal-container
      button(v-if="hasCloseButton" class="close material-icons" @click="close()")
      .header Charakterbogen
      .body
        .text-center.my-3
          a.btn.btn-primary(ref="pdfLink") "{{characterSheetName}}" herunterladen
        iframe.pdf-document-viewer(ref="pdfDocumentViewer")
      .footer

</template>

<script>
import CharacterSheetService from "@/common/character-sheet-service";
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
      publicPath: process.env.BASE_URL,
      characterSheetHtml: "",
      characterSheetServiceInitiated: false,
    };
  },
  computed: {
    characterSheetService() {
      return new CharacterSheetService(this.characterData);
    },
    characterSheetName() {
      const { Vorname, Nachname } =
        this.characterData.characterData.personalInformation;
      if (Vorname || Nachname) {
        return `Fhtagn${`-${Vorname}`}${`-${Nachname}`}.pdf`;
      }
      return "Fhtagn-Character.pdf";
    },
  },
  mounted() {
    const self = this;
    self.characterSheetService.init().then(() => {
      self.createPDFDocument();
    });
  },
  methods: {
    createPDFDocument() {
      this.characterSheetService.generateDocumentURL().then((url) => {
        this.$refs.pdfDocumentViewer.src = `${url}`;
        this.$refs.pdfLink.href = `${url}`;
        this.$refs.pdfLink.download = this.characterSheetName;
      });
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
