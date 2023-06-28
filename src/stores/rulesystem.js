import { defineStore } from "pinia";

export const useRulesystemStore = defineStore("rulesystem", {
  state: () => ({
    attributes: [
      {
        name: "strength",
        abbr: "str",
      },
      {
        name: "constitution",
        abbr: "con",
      },
      {
        name: "dexterity",
        abbr: "dex",
      },
      {
        name: "intelligence",
        abbr: "int",
      },
      {
        name: "determination",
        abbr: "det",
      },
      {
        name: "charisma",
        abbr: "cha",
      },
    ],
    professions: [
      {
        name: "diplomat",
        recommendedAttributes: ["int", "cha"],
        variants: ["ambassador", "spy", "negotiator", "travelingSalesman"],
        skills: {
          fixed: {
            bureaucracy: 40,
            drive: 40,
            foreignLanguage: 40,
            navigate: 30,
            psychology: 60,
            law: 30,
            persuade: 60,
            disguise: 30,
            alertness: 40,
            unarmedCombat: 50,
          },
          optional: {
            anthropology: 40,
            accounting: 50,
            foreignLanguage: 40,
            history: 50,
            stealth: 50,
            criminology: 50,
            militaryScience: 40,
            religion: 50,
            firearms: 50,
            search: 60,
            observe: 40,
          },
          optionalAmount: 3,
        },
        connections: 3,
      },
      {
        name: "investigator",
        variants: [
          "privateInvestigator",
          "insuranceInvestigator",
          "environmentalInvestigator",
          "ghostHunter",
          "amateurInvestigator",
          "policeAdvisor",
        ],
        recommendedAttributes: ["int", "cha"],
        skills: {
          fixed: {
            accounting: {
              value: 50,
              conjunction: "or",
              combinedSkill: "bureaucracy",
            },
            bureaucracy: {
              value: 50,
              conjunction: "or",
              combinedSkill: "accounting",
            },
            stealth: 50,
            criminology: 40,
            psychology: 50,
            law: 30,
            search: 50,
            persuade: 50,
            alertness: 50,
            unarmedCombat: 50,
          },
          optional: {
            accounting: {
              value: 50,
              conjunction: "or",
              combinedSkill: "bureaucracy",
            },
            bureaucracy: {
              value: 50,
              conjunction: "or",
              combinedSkill: "accounting",
            },
            drive: 60,
            forensics: 40,
            foreignLanguage: 40,
            history: 50,
            computerScience: 40,
            art: 40,
            science: 40,
            occult: 50,
            firearms: 60,
            observe: 40,
            disguise: 50,
          },
          optionalAmount: 3,
        },
        connections: 3,
      },
      {
        name: "driver",
        variants: [
          "packageDriver",
          "pizzaDeliveryDriver",
          "truckDriver",
          "cabDriver",
          "getawayDriver",
          "chauffeur",
          "ambulanceDriver",
          "safariDriver",
          "cashInTransitDriver",
        ],
        recommendedAttributes: ["dex", "det"],
        skills: {
          fixed: {
            firstAid: 40,
            drive: 60,
            criminology: 30,
            navigate: 60,
            psychology: 40,
            persuade: 40,
            alertness: 50,
            unarmedCombat: 50,
          },
          optional: {
            accounting: 50,
            bureaucracy: 50,
            foreignLanguage: 40,
            craft: [
              {
                value: 40,
                specialisation: "Elektrotechnik",
              },
              {
                value: 40,
                specialisation: "Mechanik",
              },
            ],
            stealth: 50,
            medicine: 40,
            pharmacy: 40,
            firearms: 50,
            survival: 50,
          },
          optionalAmount: 3,
        },
        connections: 4,
      },
      {
        name: "businessman",
        variants: [
          "realtor",
          "businessAdvisor",
          "accountant",
          "antiquarian",
          "antiqueDealer",
          "artDealer",
          "armsDealer",
          "blackMarketDealer",
          "travelingMerchant",
        ],
        recommendedAttributes: ["det", "cha"],
        skills: {
          fixed: {
            accounting: 60,
            bureaucracy: 60,
            foreignLanguage: 40,
            psychology: 40,
            law: 40,
            persuade: 50,
          },
          optional: {
            anthropology: 40,
            firstAid: 50,
            foreignLanguage: 40,
            history: 50,
            criminology: 40,
            art: 40,
            medicine: 40,
            militaryScience: 40,
            navigate: 50,
            occult: 50,
            pharmacy: 40,
            computerScience: 40,
            firearms: 60,
            alertness: 60,
          },
          optionalAmount: 3,
        },
        connections: 3,
      },
      {
        name: "lawEnforcementOfficer",
        variants: [
          "nationalParkRanger",
          "patrolOfficer",
          "detective",
          "undercoverCop",
          "borderPatrolOfficer",
          "coastGuard",
          "militaryPoliceOfficer",
        ],
        recommendedAttributes: ["dex", "int", "cha"],
        skills: {
          fixed: {
            bureaucracy: 40,
            firstAid: 30,
            drive: 40,
            criminology: 40,
            navigate: 30,
            psychology: 50,
            law: 30,
            firearms: 50,
            search: 50,
            persuade: 50,
            alertness: 50,
            unarmedCombat: 50,
          },
          optional: {
            accounting: 50,
            forensics: 40,
            stealth: 50,
            computerScience: 40,
            militaryScience: 40,
            pharmacy: 40,
            ride: 50,
            swim: 60,
            demolitions: 40,
            pilot: {
              value: 40,
              specialisation: "Seefahrt",
            },
            survival: 40,
            observe: 40,
            disguise: 40,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
      {
        name: "faithRepresentative",
        recommendedAttributes: ["det", "cha"],
        variants: [
          "priest",
          "exorcist",
          "religiousScholar",
          "missionary",
          "nunMonk",
          "inquisitor",
          "shaman",
          "cultLeader",
          "occultist",
          "hermit",
          "religiousLeader",
          "fanatic",
          "mystic",
        ],
        skills: {
          fixed: {
            bureaucracy: 40,
            foreignLanguage: 50,
            art: 30,
            psychology: 50,
            psychotherapy: 30,
            religion: 60,
            persuade: 50,
          },
          optional: {
            anthropology: 30,
            accounting: 40,
            firstAid: 40,
            foreignLanguage: 30,
            history: 30,
            art: 30,
            occult: 40,
            law: 30,
            alertness: 50,
          },
          optionalAmount: 3,
        },
        connections: 4,
      },
      {
        name: "journalist",
        variants: [
          "reporter",
          "blogger",
          "vlogger",
          "photojournalist",
          "investigativeJournalist",
          "warCorrespondent",
        ],
        recommendedAttributes: ["int", "cha"],
        skills: {
          fixed: {
            bureaucracy: 50,
            foreignLanguage: 50,
            art: 60,
            psychology: 30,
            search: 40,
            persuade: 50,
            alertness: 40,
          },
          optional: {
            athletics: 60,
            anthropology: 40,
            foreignLanguage: 40,
            history: 50,
            stealth: 50,
            computerScience: 40,
            art: 40,
            criminology: 50,
            medicine: 40,
            militaryScience: 40,
            science: 40,
            navigate: 50,
            occult: 40,
            law: 40,
            survival: 50,
            observe: 40,
          },
          optionalAmount: 4,
        },
        connections: 3,
      },
      {
        name: "lawyer",
        recommendedAttributes: ["int", "cha"],
        variants: [
          "lawyer",
          "judge",
          "prosecutor",
          "legalAdvisor",
          "judicialOfficer",
          "jurist",
        ],
        skills: {
          fixed: {
            bureaucracy: 50,
            criminology: 50,
            psychology: 50,
            law: 60,
            search: 30,
            persuade: 50,
            alertness: 50,
          },
          optional: {
            anthropology: 40,
            accounting: 40,
            forensics: 30,
            foreignLanguage: 30,
            history: 30,
            stealth: 40,
            medicine: 30,
            science: 30,
            pharmacy: 30,
            ride: 40,
            religion: 40,
            observe: 30,
          },
          optionalAmount: 4,
        },
        connections: 3,
      },
      {
        name: "fighter",
        variants: [
          "soldier",
          "mercenary",
          "knight",
          "gunslinger",
          "resistanceFighter",
        ],
        recommendedAttributes: ["str", "dex", "con", "det"],
        skills: {
          fixed: {
            athletics: 50,
            firstAid: 30,
            stealth: 40,
            meleeWeapons: 60,
            navigate: 40,
            survival: 40,
            alertness: 50,
            unarmedCombat: 60,
          },
          optional: {
            anthropology: 40,
            artillery: 40,
            drive: 60,
            foreignLanguage: 40,
            criminology: 50,
            militaryScience: 40,
            psychology: 50,
            law: 40,
            ride: 50,
            religion: 50,
            firearms: 60,
            swim: 60,
            demolitions: 40,
            pilot: 40,
            search: 60,
            observe: 40,
            persuade: 60,
            disguise: 50,
          },
          optionalAmount: 6,
        },
        connections: 2,
      },
      {
        name: "criminal",
        variants: [
          "burglar",
          "counterfeiter",
          "drugDealer",
          "smuggler",
          "bankRobber",
          "conMan",
          "gangMember",
          "mugger",
          "pirate",
        ],
        recommendedAttributes: ["dex", "det", "cha"],
        skills: {
          fixed: {
            athletics: 40,
            stealth: 50,
            criminology: 40,
            psychology: 40,
            search: 50,
            persuade: 40,
            alertness: 50,
            unarmedCombat: 50,
          },
          optional: {
            accounting: 40,
            drive: 60,
            foreignLanguage: 40,
            craft: [
              {
                specialisation: "Elektrotechnik",
                value: 40,
              },
              {
                specialisation: "Mechanik",
                value: 40,
              },
              {
                specialisation: "Schließtechnik",
                value: 40,
              },
            ],
            computerScience: 40,
            meleeWeapons: {
              value: 50,
              combinedSkill: "firearms",
              conjunction: "and",
            },
            navigate: 50,
            art: [
              {
                specialisation: "Fälschen",
                value: 40,
              },
              {
                specialisation: "Graffiti",
                value: 40,
              },
            ],
            pharmacy: 40,
            law: 40,
            firearms: {
              value: 40,
              combinedSkill: "meleeWeapons",
              conjunction: "and",
            },
            swim: 50,
            demolitions: 40,
            pilot: [
              {
                specialisation: "Seefahrt",
                value: 40,
              },
              {
                specialisation: "Luftfahrt",
                value: 40,
              },
            ],
            observe: 40,
            survival: 50,
            disguise: 50,
          },
          optionalAmount: 5,
        },
        connections: 3,
      },
      {
        name: "culturalScientist",
        variants: [
          "archaeologist",
          "anthropologist",
          "historian",
          "religiousScholar",
          "amateurResearcher",
        ],
        recommendedAttributes: ["int", "det"],
        skills: {
          fixed: {
            anthropology: {
              value: 50,
              conjunction: "or",
              combinedSkill: "archeology",
            },
            archeology: {
              value: 50,
              conjunction: "or",
              combinedSkill: "anthropology",
            },
            bureaucracy: 40,
            foreignLanguage: [
              {
                value: 50,
                specialisation: "",
              },
              {
                value: 40,
                specialisation: "",
              },
            ],
            history: 60,
            art: 30,
            persuade: 40,
          },
          optional: {
            anthropology: {
              value: 40,
              conjunction: "or",
              combinedSkill: "archeology",
            },
            archeology: {
              value: 40,
              conjunction: "or",
              combinedSkill: "anthropology",
            },
            navigate: 50,
            occult: 50,
            psychology: 50,
            religion: 50,
            search: 60,
            survival: 50,
          },
          optionalAmount: 2,
        },
        connections: 4,
      },
      {
        name: "artist",
        variants: [
          "sculptor",
          "painter",
          "writer",
          "musician",
          "actor",
          "singer",
        ],
        recommendedAttributes: ["int", "cha"],
        skills: {
          fixed: {
            anthropology: 30,
            history: 30,
            art: [
              {
                value: 60,
                specialisation: "",
              },
              {
                value: 40,
                specialisation: "",
              },
            ],
            psychology: 40,
            search: 30,
            persuade: 40,
            alertness: 30,
          },
          optional: {
            accounting: 40,
            foreignLanguage: 40,
            art: 40,
            craft: 40,
            computerScience: 40,
            occult: 50,
            pharmacy: 40,
            psychotherapy: 50,
            religion: 50,
            observe: 40,
          },
          optionalAmount: 3,
        },
        connections: 4,
      },
      {
        name: "physician",
        variants: [
          "virologist",
          "paramedic",
          "nurse",
          "psychiatrist",
          "coroner",
          "pharmacist",
          "veterinarian",
          "erDoctor",
          "surgeon",
        ],
        recommendedAttributes: ["dex", "nt", "det"],
        skills: {
          fixed: {
            bureaucracy: 40,
            firstAid: 60,
            medicine: 60,
            science: {
              value: 40,
              specialisation: "Biologie",
            },
            pharmacy: 50,
            search: 40,
            persuade: 40,
          },
          optional: {
            drive: 60,
            forensics: 50,
            navigate: 50,
            science: 50,
            psychotherapy: 60,
            law: 40,
            religion: 50,
            survival: 50,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
      {
        name: "idler",
        variants: ["aristocrat", "flapper", "heir", "socialite"],
        recommendedAttributes: ["dex", "cha"],
        skills: {
          fixed: {
            athletics: 50,
            drive: {
              value: 50,
              conjunction: "or",
              combinedSkill: "ride",
            },
            stealth: 30,
            psychology: 50,
            ride: {
              value: 40,
              conjunction: "or",
              combinedSkill: "drive",
            },
            swim: 50,
            search: 40,
            persuade: 50,
            disguise: 30,
            alertness: 40,
          },
          optional: {
            anthropology: 40,
            archeology: 40,
            accounting: {
              value: 50,
              conjunction: "or",
              combinedSkill: "bureaucracy",
            },
            bureaucracy: {
              value: 50,
              conjunction: "or",
              combinedSkill: "accounting",
            },
            history: 50,
            foreignLanguage: 40,
            art: 40,
            meleeWeapons: {
              value: 50,
              conjunction: "and",
              combinedSkill: "unarmedCombat",
            },
            navigate: 50,
            occult: 50,
            firearms: 50,
            survival: 50,
            observe: 40,
            unarmedCombat: {
              value: 60,
              conjunction: "and",
              combinedSkill: "meleeWeapons",
            },
          },
          optionalAmount: 3,
        },
        connections: 4,
      },
      {
        name: "scientist",
        variants: [
          "astronomer",
          "biologist",
          "chemist",
          "fieldResearcher",
          "geologist",
          "physicist",
        ],
        recommendedAttributes: ["int", "det"],
        skills: {
          fixed: {
            accounting: 30,
            bureaucracy: 30,
            firstAid: 30,
            mathematics: 40,
            science: [
              {
                value: 40,
                specialisation: "",
              },
              {
                value: 60,
                specialisation: "",
              },
            ],
            psychology: 30,
            search: 50,
            persuade: 40,
            alertness: 40,
          },
          optional: {
            forensics: 40,
            craft: 40,
            stealth: 50,
            computerScience: 40,
            medicine: 40,
            navigate: 50,
            pharmacy: 40,
            demolitions: 50,
            survival: 50,
            foreignLanguage: 40,
          },
          optionalAmount: 4,
        },
        connections: 2,
      },
      {
        name: "homelessPerson",
        variants: [
          "tramp",
          "brokenVeteran",
          "streetPreacher",
          "beggar",
          "drugAddict",
          "dropout",
          "tunnelDweller",
        ],
        recommendedAttributes: ["con", "det"],
        skills: {
          fixed: {
            athletics: 40,
            firstAid: 30,
            stealth: 40,
            criminology: 30,
            navigate: 40,
            psychology: 50,
            search: 60,
            survival: 30,
            persuade: 50,
            alertness: 60,
            unarmedCombat: 50,
          },
          optional: {
            anthropology: 40,
            foreignLanguage: 40,
            history: 50,
            craft: 40,
            art: 40,
            militaryScience: 40,
            meleeWeapons: {
              value: 50,
              conjunction: "and",
              combinedSkill: "firearms",
            },
            occult: 50,
            pharmacy: 50,
            religion: 50,
            firearms: {
              value: 40,
              conjunction: "and",
              combinedSkill: "meleeWeapons",
            },
            disguise: 50,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
      {
        name: "educator",
        recommendedAttributes: ["det", "cha"],
        variants: [
          "teacher",
          "educator",
          "governess",
          "socialWorker",
          "developmentWorker",
          "streetWorker",
          "probationOfficer",
        ],
        skills: {
          fixed: {
            bureaucracy: 30,
            firstAid: 40,
            foreignLanguage: 30,
            psychology: 60,
            psychotherapy: 30,
            search: 50,
            persuade: 50,
            alertness: 40,
          },
          optional: {
            anthropology: 40,
            athletics: {
              value: 50,
              conjunction: "and",
              combinedSkill: "swim",
            },
            drive: 60,
            foreignLanguage: 40,
            history: 40,
            craft: 40,
            computerScience: 40,
            criminology: 50,
            art: 40,
            mathematics: 40,
            science: 40,
            law: 40,
            ride: 50,
            religion: 50,
            swim: {
              value: 40,
              conjunction: "and",
              combinedSkill: "athletics",
            },
            survival: 50,
          },
          optionalAmount: 2,
        },
        connections: 4,
      },
      {
        name: "psychologist",
        recommendedAttributes: ["int", "det", "cha"],
        variants: [
          "policePsychologist",
          "profiler",
          "businessAdvisor",
          "humanResourceConsultant",
          "headhunter",
        ],
        skills: {
          fixed: {
            anthropology: 40,
            accounting: 30,
            bureaucracy: 30,
            mathematics: 20,
            pharmacy: 30,
            psychology: 60,
            psychotherapy: 50,
            persuade: 50,
            alertness: 50,
          },
          optional: {
            firstAid: 50,
            drive: 50,
            foreignLanguage: 40,
            criminology: 40,
            medicine: 40,
            science: 40,
            occult: 50,
            law: 40,
            religion: 50,
            search: 60,
          },
          optionalAmount: 3,
        },
        connections: 3,
      },
      {
        name: "technician",
        variants: [
          "civilEngineer",
          "architect",
          "hacker",
          "artisan",
          "surveillanceExpert",
          "demolitionExpert",
          "pioneer",
        ],
        recommendedAttributes: ["dex", "int"],
        skills: {
          fixed: {
            accounting: {
              value: 40,
              conjunction: "or",
              combinedSkill: "bureaucracy",
            },
            bureaucracy: {
              value: 40,
              conjunction: "or",
              combinedSkill: "accounting",
            },
            craft: [
              {
                value: 40,
                specialisation: "",
              },
              {
                value: 60,
                specialisation: "",
              },
            ],
            search: 40,
            persuade: 40,
          },
          optional: {
            athletics: {
              value: 40,
              conjunction: "and",
              combinedSkill: "firearms",
            },
            drive: 60,
            craft: 40,
            stealth: 50,
            computerScience: 40,
            mathematics: 40,
            science: 40,
            militaryScience: 40,
            navigate: 40,
            firearms: {
              value: 40,
              conjunction: "and",
              combinedSkill: "athletics",
            },
            swim: 40,
            demolitions: 40,
            pilot: 40,
            survival: 40,
            observe: 40,
            alertness: 60,
          },
          optionalAmount: 6,
        },
        connections: 3,
      },
      {
        name: "survivalExpert",
        variants: [
          "extremeAthlete",
          "explorer",
          "fieldResearcher",
          "gamekeeper",
          "hunter",
          "hermit",
        ],
        recommendedAttributes: ["con", "det"],
        skills: {
          fixed: {
            athletics: 50,
            firstAid: 30,
            stealth: 50,
            meleeWeapons: 50,
            navigate: 60,
            firearms: 50,
            search: 50,
            survival: 60,
            alertness: 50,
            unarmedCombat: 50,
          },
          optional: {
            anthropology: 40,
            drive: 60,
            foreignLanguage: 40,
            craft: 40,
            militaryScience: 40,
            occult: 50,
            ride: 50,
            religion: 50,
            swim: 60,
            pilot: 40,
            observe: 40,
          },
          optionalAmount: 4,
        },
        connections: 2,
      },
      {
        name: "watchman",
        variants: [
          "watchman",
          "templeKeeper",
          "bodyquard",
          "securityGuard",
          "airportSecurity",
        ],
        recommendedAttributes: ["str", "det"],
        skills: {
          fixed: {
            athletics: 50,
            bureaucracy: 40,
            firstAid: 40,
            stealth: 30,
            criminology: 40,
            meleeWeapons: 50,
            psychology: 50,
            law: 30,
            search: 50,
            persuade: 50,
            alertness: 50,
            unarmedCombat: 50,
          },
          optional: {
            drive: 60,
            foreignLanguage: 40,
            navigate: 50,
            ride: 50,
            firearms: 60,
            observe: 40,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
    ],
    skills: {
      anthropology: {
        value: 0,
        type: "geistig",
      },
      archeology: {
        value: 0,
        type: "geistig",
      },
      artillery: {
        value: 0,
        type: "körperlich",
      },
      athletics: {
        value: 30,
        type: "körperlich",
      },
      accounting: {
        value: 10,
        type: "geistig",
      },
      bureaucracy: {
        value: 10,
        type: "sozial",
      },
      firstAid: {
        value: 10,
        type: "körperlich",
      },
      drive: {
        value: 20,
        type: "körperlich",
      },
      forensics: {
        value: 0,
        type: "geistig",
      },
      foreignLanguage: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      history: {
        value: 0,
        type: "geistig",
      },
      craft: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      stealth: {
        value: 10,
        type: "körperlich",
      },
      computerScience: {
        value: 0,
        type: "geistig",
      },
      criminology: {
        value: 10,
        type: "geistig",
      },
      art: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      mathematics: {
        value: 0,
        type: "geistig",
      },
      medicine: {
        value: 0,
        type: "geistig",
      },
      militaryScience: {
        value: 0,
        type: "geistig",
      },
      meleeWeapons: {
        value: 30,
        type: "körperlich",
      },
      science: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      navigate: {
        value: 10,
        type: "körperlich",
      },
      occult: {
        value: 10,
        type: "geistig",
      },
      pharmacy: {
        value: 0,
        type: "geistig",
      },
      psychology: {
        value: 10,
        type: "sozial",
      },
      psychotherapy: {
        value: 10,
        type: "sozial",
      },
      law: {
        value: 0,
        type: "geistig",
      },
      ride: {
        value: 10,
        type: "körperlich",
      },
      religion: {
        value: 10,
        type: "geistig",
      },
      firearms: {
        value: 20,
        type: "körperlich",
      },
      swim: {
        value: 20,
        type: "körperlich",
      },
      demolitions: {
        value: 0,
        type: "geistig",
      },
      pilot: {
        value: 0,
        type: "körperlich",
        specialisation: true,
      },
      search: {
        value: 20,
        type: "körperlich",
      },
      dream: {
        value: "EN",
        type: "geistig",
      },
      dreamlandsKnowledge: {
        value: "unnatural",
        type: "geistig",
        isMythos: true,
      },
      survival: {
        value: 10,
        type: "körperlich",
      },
      observe: {
        value: 0,
        type: "geistig",
      },
      persuade: {
        value: 20,
        type: "sozial",
      },
      unnatural: {
        value: 0,
        type: "geistig",
        isMythos: true,
      },
      disguise: {
        value: 10,
        type: "sozial",
      },
      alertness: {
        value: 20,
        type: "körperlich",
      },
      unarmedCombat: {
        value: 40,
        type: "körperlich",
      },
    },
    facettes: [
      "wealth",
      "poverty",
      "status",
      "experienceWithViolence",
      "experienceWithHelplessness",
      "insight",
      "experienceWithLoss",
      "experienceWithCrisis",
      "limitation",
      "bilingual",
      "luck",
    ],
    availableMotivations: 5,
  }),
  getters: {
    professionalSkillsById: (state) => (id) =>
      state.professions[id].skills.fixed,
    optionalSkillsById: (state) => (id) =>
      state.professions[id].skills.optional,
    availableOptionalSkillCount: (state) => (id) =>
      state.professions[id].skills.optionalAmount,
    availableConnectionsCountById: (state) => (id) =>
      state.professions[id].connections,
    professionNameById: (state) => (id) => state.professions[id].name,
    facetteByName: (state) => (key) => key ? state.facettes[key] : undefined,
    hasSpecialisationBySkillname: (state) => (skillname) =>
      !!state.skills[skillname].specialisation,
    skillByName: (state) => (skillname) => {
      const skillRuleset = state.skills[skillname];

      return {
        skillname,
        specialisationname: undefined,
        hasSpecialisation: !!skillRuleset.specialisation,
        baseValue: skillRuleset.value,
        professionalValue: undefined,
        isProfessional: false,
        isOptional: false,
        isSelected: false,
        bonusCount: 0,
      };
    },
    baseSkillValueByName: (state) => (skillname) =>
      state.skills[skillname].value,
  },
});
