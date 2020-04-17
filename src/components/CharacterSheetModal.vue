<template lang="pug">
transition(name="modal" appear)
  .overlay
    .modal-container
      button(v-if="hasCloseButton" class="close material-icons" @click="close()")
      .header Charakterbogen
      .body
        iframe.pdf-document-viewer(ref="pdfDocumentViewer")
      .footer

</template>

<script>
import CharacterSheetService from '@/common/character-sheet-service';
import Modal from '@/components/Modal.vue';

export default {
  extends: Modal,
  props: {
    characterData: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      characterSheetHtml: '',
      characterSheetServiceInitiated: false,
    };
  },
  computed: {
    characterSheetService() {
      return new CharacterSheetService(this.characterData);
    },
  },
  mounted() {
    const self = this;
    self.characterSheetService.init()
      .then(() => {
        self.createPDFDocument();
      });
  },
  methods: {
    createPDFDocument() {
      this.characterSheetService
        .generateDocumentURL()
        .then(url => {
          this.$refs.pdfDocumentViewer.src = url;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/settings";

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
