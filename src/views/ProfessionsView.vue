<template lang="pug">
div
  h2.text-center Beruf wählen
  ul.overflow-scroll.h-48.border.p-1
    li.profession-list__profession(
      :class="{'is-active': selectedProfession == index}"
      v-for="(profession, index) in rulesystemStore.professions"
      @click="setProfession(index)"
    ) {{profession.name}}

  div(v-if="selectedProfession > -1")
    h3.mt-5.mb-2 {{currProf.name}}
      small  (
        span(v-for="(attr, index) in currProf.recommendedAttributes")
          span(v-if="index != 0") ,&nbsp;
          | {{attr}}
        | )
    ul.columns-2
      li.mb-2(v-for="variant in currProf.variants")
        input.mr-1(type="radio" :id="variant" v-model="selectedVariant" :value="variant" @change="updateVariant")
        label(:for="variant") {{variant}}
      li.mb-2
        input.mr-1(type="radio" v-model="selectedVariant" value="custom" @change="updateVariant")
        label
          input(type="text" v-model="customVariant" placeholder="Eigene Ausprägung" @input="updateVariant")
    blockquote.border-l-4.my-5.pl-3.italic {{currProf.background}}
    div.mt-5(v-if="!characterStore.isProfessionLoading")
      h5.mb-2 Berufsfertigkeiten:
      ul.xl_columns-2
        li(v-for="skill in skillsStore.professionalSkills")
          combined-skill.break-inside-avoid(
            v-if="skill.conjunctionId && skill.conjunctionId !== 'duplicate'"
            :conjunctionId="skill.conjunctionId"
            modType="professional"
          )
          single-skill.break-inside-avoid(
            v-else-if="!skill.conjunctionId"
            :skillId="skill.skillId"
            :canAddSpecialisations="false"
            :canRemoveSpecialisations="false")
      optional-skill-list.mt-5(
        f-if="currProf"
        :professionId="selectedProfession"
      )
      h5.mt-5 Verbindungen: {{currProf.connections}}
  modal-box(
    :isVisible="isErrorOpen"
    @modal-closed="isErrorOpen = false")
    h3(slot="header") Fehlende Auswahl
    p Bitte wähle einen Beruf, bevor du weitermachst!

</template>

<script>
import { mapStores } from "pinia";
import { useCommonStore } from "../stores/common";
import { useRulesystemStore } from "../stores/rulesystem";
import { useCharacterStore } from "../stores/character";
import { useSkillsStore } from "../stores/skills";

import OptionalSkillList from "@/components/OptionalSkillList.vue";
import SingleSkill from "@/components/SingleSkill.vue";
import CombinedSkill from "@/components/CombinedSkill.vue";
import ModalBox from "@/components/ModalBox.vue";

export default {
  props: {},
  components: {
    OptionalSkillList,
    SingleSkill,
    CombinedSkill,
    ModalBox,
  },
  data() {
    return {
      selectedProfession: -1,
      selectedVariant: "",
      customVariant: "",
      isErrorOpen: false,
      conjunctions: [],
    };
  },
  computed: {
    ...mapStores(
      useCommonStore,
      useRulesystemStore,
      useCharacterStore,
      useSkillsStore
    ),
    currProf() {
      return this.rulesystemStore.professions[this.selectedProfession];
    },
    currentVariant() {
      if (this.selectedVariant === "custom") {
        return this.customVariant;
      }
      return this.selectedVariant;
    },
  },
  created() {
    this.checkForError(this.currentVariant);
  },
  beforeRouteLeave(to, from, next) {
    const currentRouteIndex = this.commonStore.editorSteps.findIndex(
      (record) => from.name === record.name
    );
    const nextRouteIndex = this.commonStore.editorSteps.findIndex(
      (record) => to.name === record.name
    );
    if (currentRouteIndex < nextRouteIndex) {
      if (this.selectedProfession === -1) {
        next(false);
        this.isErrorOpen = true;
      } else {
        next();
      }
    } else {
      next();
    }
  },
  methods: {
    setProfession(index) {
      this.selectedProfession = index;
      this.characterStore.setProfession(this.selectedProfession);
    },
    updateVariant() {
      this.checkForError(this.currentVariant);
      this.characterStore.professionVariant = this.currentVariant;
    },
    checkForError(variant) {
      if (!variant) {
        this.commonStore.addWarning("missingVariant");
      } else {
        this.commonStore.removeWarning("missingVariant");
      }

      if (variant === "custom" && !this.customVariant) {
        this.commonStore.addWarning("missingCustomVariant");
      } else {
        this.commonStore.removeWarning("missingCustomVariant");
      }
    },
  },
};
</script>

<style scoped>
.profession-list {
  height: 21vh;
  overflow-x: scroll;
  border: 1px solid 1px;
  margin: 0 0 30px;
}

.profession-list__profession {
  padding: 30px/2;
  cursor: pointer;
}
.profession-list__profession:hover {
  background: theme-color("light");
}

.profession-list__profession.is-active {
  background: transparentize(theme-color("light"), 0.5);
}

@media screen and (min-width: 768px) {
  .profession-list__profession {
    padding: 30px/4;
  }
}

@media screen and (min-width: 1024px) {
  .variant-list,
  .skill-list {
    column-count: 2;
  }
}

@media screen and (min-width: 1440px) {
  .variant-list,
  .skill-list {
    column-count: 3;
  }
}

.no-break {
  break-inside: avoid;
}
</style>
