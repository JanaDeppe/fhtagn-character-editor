<template lang="pug">
transition(name="modalBox" appear)
  .overlay
    .modal-container
      .flex.mb-3.gap-3
        .header.grow: h6 {{ $t("views.summary.characterSheet") }}
        button(v-if="hasCloseButton" class="close material-icons" @click="close()")
      .body.mb-3
        .text-center.my-3
          a.button(ref="pdfLink") {{ $t("views.summary.downloadCharactersheet", { name: this.characterSheetName}) }}
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
    console.log(JSON.stringify(this.characterData))
    this.fetchPDFDocument();
  },
  methods: {
    fetchPDFDocument() {
      const apiUrl = 'http://localhost:8000/pdf-character-sheet';
      const data = this.characterData;

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          const base64Pdf = "data:application/pdf;base64," + data;
          this.$refs.pdfDocumentViewer.src = `${base64Pdf}`;
          this.$refs.pdfLink.href = `${base64Pdf}`;
          this.$refs.pdfLink.download = this.characterSheetName;
        })
        .catch(error => {
          console.error

      ('Error:', error);
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
