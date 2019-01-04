<template lang="pug">
span
  .button-group.tiny.display-inline-block.margin-0
    button.button(
      v-if="canAddSpecialisations"
      @click="add"
    )
      span.material-icons add
    button.button(
      @click="open"
    )
      span.material-icons create
    button.button(
      v-if="canRemoveSpecialisation"
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
              label {{skill}}:
                input(type="text" v-model="specialisationName")
          .footer
            slot(name="footer")
              button.default-button(class="button" @click="modify") OK

</template>
<script>
import Modal from '@/components/Modal.vue';

export default {
  extends: Modal,
  props: {
    skill: {
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
    canRemoveSpecialisation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      specialisationName: this.specialisation,
    };
  },
  methods: {
    modify() {
      this.$emit('modify-specialisation', this.specialisationName);
      this.close();
    },
    add() {
      this.$emit('add-specialisation');
    },
    remove() {
      this.$emit('remove-specialisation');
    },
  },
};
</script>
<style lang="scss" scoped>
.material-icons {
  font-size: 1rem;
}
</style>
