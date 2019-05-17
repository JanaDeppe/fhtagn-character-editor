<template lang="pug">
div
  h4.text-center Zusammenfassung&nbsp;<br>
    span(v-if="personalInformation.Vorname || personalInformation.Nachname") "{{personalInformation.Vorname}} {{personalInformation.Nachname}}"
  .grid-x
    .cell.small-6(v-if="personalInformation.Geschlecht") {{personalInformation.Geschlecht}}
    .cell.small-6(v-if="personalInformation.Alter") {{personalInformation.Alter}}
    .cell.small-12(v-if="personalInformation.Aussehen") {{personalInformation.Aussehen}}

  // Attribute
  h6(v-if="Object.keys(attributeValues).length") Attribute:
  ul.small-list.attribute-list(v-if="attributeValues")
    li(v-for="(value, abbr) in attributeValues").grid-x
      .cell.small-4 {{abbr}}:
      .cell.small-8 {{value}}

  // Beruf
  h6(v-if="profession > -1") Beruf:&nbsp;
    span(v-if="professionVariant") {{professionVariant}} ({{currProf.name}})
    span(v-else) {{currProf.name}}

  // Skills
  ul.skill-list.small-list(v-if="profession > -1")
    li: h6 Fertigkeiten:
    li(v-for="skill in getModifiedSkills")
      skill(
        :canAddSpecialisations="false"
        :canRemoveSpecialisation="false"
        :showCalculatedValue="true"
        :skill="skill.skill"
        :index="skill.index")

  // Verbindungen
  ul.small-list(v-if="connections.length > 0")
    li: h6 Verbindungen:
    li(v-for="conn in connections" v-if="conn.length > 0") {{conn}}

  // Facetten
  ul.small-list(v-if="facettes.length > 0")
    li: h6 Facetten:
    li(v-for="facette in facettes") {{facette}}

  // Motivationen
  ul.small-list(v-if="motivations.length > 0")
    li: h6 Motivationen:
    li(v-for="motivation in motivations" v-if="motivation.length > 0") {{motivation}}

</template>

<script>
import { mapState, mapGetters } from 'vuex';

// import store from '@/store';

import Skill from '@/components/Skill.vue';

export default {
  props: {},
  components: {
    Skill,
  },
  computed: {
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
      'getModifiedSkills',
    ]),
    currProf() {
      return this.professions[this.profession];
    },
  },
};
</script>

<style lang="scss" scoped>

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
  li {
    margin-bottom: .1rem;
  }
}

</style>
