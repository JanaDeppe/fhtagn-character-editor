import { defineStore } from "pinia";
import routes from "@/router/routes";

export const useCommonStore = defineStore("common", {
  state: () => ({
    currentWarnings: [],
    warnings: {
      attributePointsRemaining: {
        type: "warning",
      },
      optionalSkillsRemaining: {
        type: "warning",
      },
      missingCustomVariant: {
        type: "warning",
      },
      missingVariant: {
        type: "warning",
      },
      bonusSkillsRemaining: {
        type: "warning",
      },
      missingConnections: {
        type: "warning",
      },
      missingMotivations: {
        type: "warning",
      },
      missingPersonalInformation: {
        type: "warning",
      },
    },
  }),
  getters: {
    editorSteps: () => routes[0].children,
    warningDataByKey: (state) => (key) => state.warnings[key],
  },
  actions: {
    addWarning(payload) {
      const index = this.currentWarnings.indexOf(payload);
      if (index === -1) this.currentWarnings.push(payload);
    },
    removeWarning(payload) {
      const index = this.currentWarnings.indexOf(payload);
      if (index > -1)
        this.currentWarnings.splice(this.currentWarnings.indexOf(payload), 1);
    },
    flushWarnings() {
      this.currentWarnings = [];
    },
  },
});
