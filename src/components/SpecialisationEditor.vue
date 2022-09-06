<template lang="pug">
div
  .btn-group.d-inline-block
    button.leading-3.p-1(
      v-if="canAddSpecialisations"
      @click="add"
    )
      span.material-icons add
    button.leading-3.p-1.ml-1(
      v-if="canModifySpecialisations"
      @click="open"
    )
      span.material-icons create
    button.leading-3.p-1.ml-1(
      v-if="canRemoveSpecialisations"
      @click="remove"
    )
      span.material-icons remove
  transition(name="modalBox" appear)
    .overlay(v-if="isActive")
      .modal-container
        .flex.mb-3.gap-3
          .header.grow
            slot(name="header")
              h6 Bitte bezeichne diese Fertigkeit genauer!
          button.p-1.shrink.material-icons.close(
            v-if="hasCloseButton"
            @click="close()"
          )
        .body.mb-3
          slot(name="body")
            .form-group
              label {{skillname}}:
              input.form-control(type="text" v-model="specialisationName")
        .footer
          slot(name="footer")
            button.default-button.btn.btn-secondary(@click="close") OK

</template>
<script>
import ModalBox from "@/components/ModalBox.vue";

export default {
  extends: ModalBox,
  props: {
    skillname: {
      type: String,
      default: "",
    },
    specialisation: {
      type: String,
      default: undefined,
    },
    canAddSpecialisations: {
      type: Boolean,
      default: true,
    },
    canModifySpecialisations: {
      type: Boolean,
      default: true,
    },
    canRemoveSpecialisations: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    specialisationName: {
      get() {
        return this.specialisation;
      },
      set(newValue) {
        this.$emit("modify-specialisation", newValue);
      },
    },
  },
  methods: {
    add() {
      this.$emit("add-specialisation");
    },
    remove() {
      this.$emit("remove-specialisation");
    },
    onEditorOpen() {
      this.$emit("editor-opened");
    },
  },
};
</script>
<style scoped>
.material-icons {
  font-size: 0.875rem;
  vertical-align: -2px;
}

.btn.btn-secondary:not(:last-child) {
  margin-right: 2px;
}
</style>
