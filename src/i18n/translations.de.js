export default {
  common: {},
  views: {
    startGeneration: {
      createANewCharacter: "Erstelle einen neuen FHTAGN Charakter!",
      startANewCharacter: "Neuen Charakter starten",
      steps: {
        distributeAttributes: "Attribute verteilen",
        chooseProfession: "Beruf wählen",
        pickSkills: "Fähigkeiten auswählen",
        createConnections: "Bindungen erstellen",
        writeMotivations: "Motivationen schreiben",
        giveName: "Namen geben",
      },
    },
    generator: {
      prevStep: "Vorheriger Schritt",
      nextStep: "Nächster Schritt",
    },
    attributes: {
      question: "Mit welcher Methode möchtest du die Attribute generieren?",
      chooseDifferentMethod: "Andere Methode auswählen",
      standard: {
        title: "Standard",
        description:
          "Punkte können frei auf verschiedene Attribute verteilt werden.",
        distributeAttributes: "Attribute vergeben",
        remainingPoints: "Restliche Punkte",
      },
      list: {
        title: "Liste",
        description: "Attributswerte werden aus einer Liste verteilt.",
      },
      dice: {
        title: "Würfeln",
        description:
          "Attributswerte werden zuerst ausgewürfelt, dann verteilt.",
      },
      automated: {
        title: "Automatisch",
        description:
          "Attributswerte werden zufällig aus einer Liste auf die Attribute verteilt.",
      },
    },
  },
  rulesystem: {
    attributes: {
      name: {
        strength: "Stärke",
        constitution: "Konstitution",
        dexterity: "Geschicklichkeit",
        intelligence: "Intelligenz",
        determination: "Entschlossenheit",
        charisma: "Charisma",
      },
      abbr: {
        str: "ST",
        con: "KO",
        dex: "GE",
        int: "IN",
        det: "EN",
        cha: "CH",
      },
    },
  },
};
