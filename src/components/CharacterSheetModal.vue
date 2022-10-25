<template lang="pug">
transition(name="modalBox" appear)
  .overlay
    .modal-container
      .flex.mb-3.gap-3
        .header.grow: h6 Charakterbogen
        button(v-if="hasCloseButton" class="close material-icons" @click="close()")
      .body.mb-3
        .text-center.my-3
          a.button(href="") "{{characterSheetName}}" herunterladen
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
      console.log(
        "This should create the PDF document, but doesn't at the moment..."
      );
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
