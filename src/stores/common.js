import { defineStore } from 'pinia';
import routes from '@/router/routes'

export const useCommonStore = defineStore('common', {
  state: () => ({
    currentWarnings: [],
    warnings: {
      attributePointsRemaining: {
        type: 'warning',
        title: 'Restliche Attributspunkte',
        text: 'Du hast noch übrige Attributspunkte zu vergeben.',
      },
      optionalSkillsRemaining: {
        type: 'warning',
        title: 'Restliche Fertigkeiten',
        text: 'Du kannst noch weitere Berufsfertigkeiten auswählen.',
      },
      missingCustomVariant: {
        type: 'warning',
        title: 'Keine Ausprägung ausgedacht',
        text: 'Du hast eine eigene Ausprägung ausgewählt, aber das Feld dafür leer gelassen.',
      },
      missingVariant: {
        type: 'warning',
        title: 'Keine Ausprägung ausgewählt',
        text: 'Du hast keine Ausprägung für deinen Beruf ausgewählt.',
      },
      bonusSkillsRemaining: {
        type: 'warning',
        title: 'Restliche Bonusfertigkeiten',
        text: 'Du hast noch übrige Bonusfertigkeiten zu vergeben.',
      },
      missingConnections: {
        type: 'warning',
        title: 'Fehlende Verbindung',
        text: 'Du hast nicht alle Verbindungen ausgefüllt.',
      },
      missingMotivations: {
        type: 'warning',
        title: 'Fehlende Motivationen',
        text: 'Du hast nicht alle Motivationen ausgefüllt.',
      },
      missingPersonalInformation: {
        type: 'warning',
        title: 'Fehlende persönliche Informationen',
        text: 'Du hast nicht alle persönlichen Informationen ausgefüllt.',
      },
    },
  }),
  getters: {
    editorSteps: () => routes[0].children,
    warningDataByKey: state => key => state.warnings[key]
  },
  actions: {
    addWarning (payload) {
      const index = this.currentWarnings.indexOf(payload);
      if (index === -1) this.currentWarnings.push(payload);
    },
    removeWarning (payload) {
      const index = this.currentWarnings.indexOf(payload);
      if (index > -1) this.currentWarnings.splice(this.currentWarnings.indexOf(payload), 1);
    },
    flushWarnings () {this. currentWarnings = []}
  }
});