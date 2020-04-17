<template lang="pug">
div
  .btn-group.d-inline-block
    button.btn.btn-secondary.btn-sm.add-specialisation(
      v-if="canAddSpecialisations"
      @click="add"
    )
      span.material-icons add
    button.btn.btn-secondary.btn-sm(
      v-if="canModifySpecialisations"
      @click="open"
    )
      span.material-icons create
    button.btn.btn-secondary.btn-sm(
      v-if="canRemoveSpecialisations"
      @click="remove"
    )
      span.material-icons remove
  transition(name="modal" appear)
    .overlay(v-if="isActive")
      .modal-container
        button.material-icons.close(
          v-if="hasCloseButton"
          @click="close()"
        )
        .header
          slot(name="header")
            h6 Bitte bezeichne diese Fertigkeit genauer!
        .body
          slot(name="body")
            .form-group
              label {{skillname}}:
              input.form-control(type="text" v-model="specialisationName")
        .footer
          slot(name="footer")
            button.default-button.btn.btn-secondary(@click="close") OK

</template>
<script>
import Modal from '@/components/Modal.vue';

export default {
  extends: Modal,
  props: {
    skillname: {
      type: String,
      default: '',
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
      get() { return this.specialisation; },
      set(newValue) {
        this.$emit('modify-specialisation', newValue);
      },
    },
  },
  methods: {
    add() {
      this.$emit('add-specialisation');
    },
    remove() {
      this.$emit('remove-specialisation');
    },
    onEditorOpen() {
      this.$emit('editor-opened');
    },
  },
};
</script>
<style lang="scss" scoped>
.material-icons {
  font-size: .875rem;
  vertical-align: -2px;
}

.btn.btn-secondary:not(:last-child) {
  margin-right: 2px;
}
</style>
