<template lang="pug">
span
  .button-group.tiny.display-inline-block.margin-0
    button.button.add-specialisation(
      v-if="canAddSpecialisations"
      @click="add"
    )
      span.material-icons add
    button.button(
      v-if="canModifySpecialisations"
      @click="open"
    )
      span.material-icons create
    button.button(
      v-if="canRemoveSpecialisations"
      @click="remove"
    )
      span.material-icons remove
  transition(name="modal" appear)
    .overlay(v-if="isActive")
      .container
        button.material-icons.close-button(
          v-if="hasCloseButton"
          @click="close()"
        ) close
        .header
          slot(name="header") default header
        .body
          slot(name="body") Bitte bezeichne diese Fertigkeit genauer:
          p
            label {{skillname}}:
              input(type="text" v-model="specialisationName")
        .footer
          slot(name="footer")
            button.default-button(class="button" @click="close") OK

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
  font-size: 1rem;
}
</style>
