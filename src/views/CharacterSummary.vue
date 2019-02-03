<template lang="pug">
div
  .grid-x.grid-padding-x.grid-padding-y(ref="characterSummaryContainer")
    .cell.small-12
      h4.text-center Zusammenfassung&nbsp;<br>
        span(v-if="personalInformation.Vorname || personalInformation.Nachname") "{{personalInformation.Vorname}} {{personalInformation.Nachname}}"
    .cell.small-12
      .grid-x
        .cell.small-6(v-if="personalInformation.Geschlecht") {{personalInformation.Geschlecht}}
        .cell.small-6(v-if="personalInformation.Alter") {{personalInformation.Alter}}
        .cell.small-12(v-if="personalInformation.Aussehen") {{personalInformation.Aussehen}}

    // Attribute
    .cell.small-12
      h5(v-if="Object.keys(attributeValues).length") Attribute:
      ul.small-list.attribute-list(v-if="attributeValues")
        li(v-for="(value, abbr) in attributeValues").grid-x
          .cell.small-4 {{abbr}}:
          .cell.small-8 {{value}}

    // Beruf
    .cell.small-12
      h5(v-if="profession > -1") Beruf:
        span(v-if="professionVariant") {{professionVariant}} ({{currProf.name}})
        span(v-else) {{currProf.name}}

    // Skills
    .cell.small-12
      ul.skill-list.small-list(v-if="profession > -1")
        li: h6 Fertigkeiten:
        li(v-for="skill in getReducedSkills")
          skill(
            :canAddSpecialisations="false"
            :canRemoveSpecialisation="false"
            :showCalculatedValue="true"
            :skill="skill.skill"
            :index="skill.index")

    .html2pdf__page-break

    // Verbindungen
    .cell.medium-6
      ul.small-list(v-if="connections.length > 0")
        li: h6 Verbindungen:
        li(v-for="conn in connections" v-if="conn.name.length > 0") {{conn.name}}
    .cell.medium-6
      // Facetten
      ul.small-list(v-if="facettes.length > 0")
        li: h6 Facetten:
        li(v-for="facette in facettes") {{facette}}
    .cell.medium-6
      // Motivationen
      ul.small-list(v-if="motivations.length > 0")
        li: h6 Motivationen:
        li(v-for="motivation in motivations" v-if="motivation.length > 0") {{motivation}}

  .grid-x
    .cell.small-12.button-group.align-center
      button.button(@click="generatePdf") PDF erstellen
      router-link.button.hollow(:to="{ name: 'start-generation' }") Zurück zum Anfang

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HtmlToPdf from 'html2pdf.js';

// import store from '@/store';

import Skill from '@/components/Skill.vue';

export default {
  props: {},
  components: {
    Skill,
  },
  computed: {
    skillList() {
      return Object.keys(this.skills).sort();
    },
    ...mapState({
      attributes: state => state.rulesystem.attributes,
      professions: state => state.rulesystem.professions,

      attributeValues: state => state.character.attributeValues,
      connections: state => state.character.connections,
      derivedValues: state => state.character.derivedValues,
      facettes: state => state.character.facettes,
      motivations: state => state.character.motivations,
      personalInformation: state => state.character.personalInformation,
      profession: state => state.character.profession,
      professionVariant: state => state.character.professionVariant,
    }),
    ...mapGetters([
      'getReducedSkills',
    ]),
    currProf() {
      return this.professions[this.profession];
    },
  },
  methods: {
    generatePdf() {
      HtmlToPdf(this.$refs.characterSummaryContainer);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../common/settings';

.small-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: .8em;
}

.attribute-list {
  column-count: 2;
}

.skill-list {
  @include breakpoint(medium) {
    column-count: 2;
  }
  li {
    margin-bottom: .1rem;
  }
}

</style>
