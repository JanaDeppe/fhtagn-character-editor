<template lang="pug">
transition(name="modal" appear)
  .overlay(v-if="isActive")
    .modal-container
      button(v-if="hasCloseButton" class="close material-icons" @click="close()")
      .header
        slot(name="header")
      .body
        slot default body
      .footer
        slot(name="footer")
          button.default-button.btn.btn-secondary(@click="close()") OK
</template>
<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasCloseButton: true,
      isActive: false,
    };
  },
  watch: {
    isVisible(current) {
      if (current) this.open();
      else this.close();
    },
  },
  methods: {
    open() {
      this.isActive = true;
      this.$emit("modal-opened");
    },
    close() {
      this.isActive = false;
      this.$emit("modal-closed");
    },
  },
};
</script>

<style>
.overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  min-width: 400px;
  max-width: 50%;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.header h3 {
  margin-top: 0;
  flex-shrink: 1;
}

.close {
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.body {
  flex-grow: 1;
}

.footer {
  flex-shrink: 1;
  display: flex;
  justify-content: space-around;
}

.default-button {
  float: right;
  margin: 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
