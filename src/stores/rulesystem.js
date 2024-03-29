import { defineStore } from "pinia";

export const useRulesystemStore = defineStore("rulesystem", {
  state: () => ({
    attributes: [
      {
        name: "Stärke",
        abbr: "ST",
      },
      {
        name: "Konstitution",
        abbr: "KO",
      },
      {
        name: "Geschicklichkeit",
        abbr: "GE",
      },
      {
        name: "Intelligenz",
        abbr: "IN",
      },
      {
        name: "Entschlossenheit",
        abbr: "EN",
      },
      {
        name: "Charisma",
        abbr: "CH",
      },
    ],
    professions: [
      {
        name: "Diplomatin",
        background:
          "Als du dich auf dem Empfang in den gesperrten Bereich der Botschaft schleichst, musst du feststellen, dass hinter der Fassade ganz andere Mächte die Fäden in der Hand halten.",
        variants: [
          "Botschafterin",
          "Spionin",
          "Unterhändlerin",
          "Handelsreisende",
        ],
        recommendedAttributes: ["IN", "CH"],
        skills: {
          fixed: {
            Bürokratie: 40,
            Fahren: 40,
            Fremdsprache: 40,
            Navigation: 30,
            Psychologie: 60,
            Rechtswesen: 30,
            Überzeugen: 60,
            Verkleiden: 30,
            Wachsamkeit: 40,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Anthropologie: 40,
            Buchführung: 50,
            Fremdsprache: 40,
            Geschichte: 50,
            Heimlichkeit: 50,
            Kriminologie: 50,
            Militärwissenschaft: 40,
            Religion: 50,
            Schusswaffen: 50,
            Suchen: 60,
            Überwachen: 40,
          },
          optionalAmount: 3,
        },
        connections: 3,
      },
      {
        name: "Ermittlerin",
        background:
          "Fremdgehende Ehepartner zu verfolgen, ist nicht gerade die spannendste Aufgabe. Aber du bist nun einmal auf solche Aufträge angewiesen. Du sitzt in deinem Wagen und wartest. Ob du nicht eine bessere Position für ein gutes Beweisfoto finden kannst? Noch ahnst du nicht, dass du dieses Mal etwas beobachten wirst, dass dein Weltbild grundlegend auf den Kopf stellen wird. Diese Augen! Diese Zähne! Du wirst sie nie mehr vergessen!",
        variants: [
          "Privatdetektivin",
          "Versicherungsdetektivin",
          "Umweltermittlerin",
          "Geisterjägerin",
          "Hobbyermittlerin",
          "Polizeiberaterin",
        ],
        recommendedAttributes: ["IN", "CH"],
        skills: {
          fixed: {
            Buchführung: {
              value: 50,
              conjunction: "or",
              combinedSkill: "Bürokratie",
            },
            Bürokratie: {
              value: 50,
              conjunction: "or",
              combinedSkill: "Buchführung",
            },
            Heimlichkeit: 50,
            Kriminologie: 40,
            Psychologie: 50,
            Rechtswesen: 30,
            Suchen: 50,
            Überzeugen: 50,
            Wachsamkeit: 50,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Bürokratie: 50,
            Buchführung: 50,
            Fahren: 60,
            Forensik: 40,
            Fremdsprache: 40,
            Geschichte: 50,
            Informatik: 40,
            Kunst: 40,
            Naturwissenschaft: 40,
            Okkultismus: 50,
            Schusswaffen: 60,
            Überwachen: 40,
            Verkleiden: 50,
          },
          optionalAmount: 3,
        },
        connections: 3,
      },
      {
        name: "Fahrerin",
        background:
          "Bald hast du es wieder geschafft! Endlich Feierabend! Du musst nur noch ein letztes Paket ausliefern. Wer bestellt etwas in ein seit Jahren leerstehendes Mehrfamilienhaus? Mit dem seltsam schweren Paket unter dem Arm und zitternden Knien machst du dich auf die Suche nach dem Empfänger. Als du das Haus betrittst, bemerkst du sofort, dass hier etwas ganz grundlegend nicht stimmt.",
        variants: [
          "Paketbotin",
          "Pizzabotin",
          "Fernfahrerin",
          "Taxifahrerin",
          "Fluchtwagenfahrerin",
          "Chauffeurin",
          "Rettungswagenfahrerin",
          "Safari-Fahrerin",
          "Werttransportfahrerin",
        ],
        recommendedAttributes: ["GE", "EN"],
        skills: {
          fixed: {
            "Erste Hilfe": 40,
            Fahren: 60,
            Kriminologie: 30,
            Navigation: 60,
            Psychologie: 40,
            Überzeugen: 40,
            Wachsamkeit: 50,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Buchführung: 50,
            Bürokratie: 50,
            Fremdsprache: 40,
            Handwerk: [
              {
                value: 40,
                specialisation: "Elektrotechnik",
              },
              {
                value: 40,
                specialisation: "Mechanik",
              },
            ],
            Heimlichkeit: 50,
            Medizin: 40,
            Pharmazie: 40,
            Schusswaffen: 50,
            Überlebenskunst: 50,
          },
          optionalAmount: 3,
        },
        connections: 4,
      },
      {
        name: "Geschäftsfrau",
        background:
          "Irgendetwas stimmt mit dem Objekt nicht, mit dem du befasst bist. Unerklärliche Unfälle, ein hoher Krankenstand und andere Auffälligkeiten. Wilde Gerüchte über eine Vorbesitzerin machen die Runde und inmitten alter Akten findest du die ledrigen Seiten eines uralten Manuskripts. Du könntest die Sache einfach jemand anderem überlassen, aber irgendwas fesselt dich an der Geschichte.",
        variants: [
          "Maklerin",
          "Unternehmensberaterin",
          "Buchprüferin",
          "Antiquarin",
          "Antiquitätenhändlerin",
          "Kunsthändlerin",
          "Waffenhändlerin",
          "Schwarzmarkthändlerin",
          "fahrende Händlerin",
        ],
        recommendedAttributes: ["EN", "CH"],
        skills: {
          fixed: {
            Buchführung: 60,
            Bürokratie: 60,
            Fremdsprache: 40,
            Psychologie: 40,
            Rechtswesen: 40,
            Überzeugen: 50,
          },
          optional: {
            Anthropologie: 40,
            "Erste Hilfe": 50,
            Fremdsprache: 40,
            Geschichte: 50,
            Kriminologie: 40,
            Kunst: 40,
            Medizin: 40,
            Militärwissenschaft: 40,
            Navigation: 50,
            Okkultismus: 50,
            Pharmazie: 40,
            Informatik: 40,
            Schusswaffen: 60,
            Wachsamkeit: 60,
          },
          optionalAmount: 3,
        },
        connections: 3,
      },
      {
        name: "Gesetzeshüterin",
        background:
          "In den letzten Monaten sind erschreckend viele Wanderer in deinem Nationalpark verschwunden. Deshalb hast du dich auf den Weg gemacht, um der Sache auf den Grund zu gehen. Denn in deinem Nationalpark verschwindet man nicht einfach so!",
        variants: [
          "Rangerin in einem Nationalpark",
          "Streifenpolizistin",
          "Kriminalkomissarin",
          "Verdeckte Ermittlerin",
          "Grenzschützerin",
          "Beamtin der Küstenwache",
          "Militärpolizistin",
        ],
        recommendedAttributes: ["GE", "IN", "CH"],
        skills: {
          fixed: {
            Bürokratie: 40,
            "Erste Hilfe": 30,
            Fahren: 40,
            Kriminologie: 40,
            Navigation: 30,
            Psychologie: 50,
            Rechtswesen: 30,
            Schusswaffen: 50,
            Suchen: 50,
            Überzeugen: 50,
            Wachsamkeit: 50,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Buchführung: 50,
            Forensik: 40,
            Heimlichkeit: 50,
            Informatik: 40,
            Militärwissenschaft: 40,
            Pharmazie: 40,
            Reiten: 50,
            Schwimmen: 60,
            Sprengstoffe: 40,
            Steuern: {
              value: 40,
              specialisation: "Seefahrt",
            },
            Überlebenskunst: 40,
            Überwachen: 40,
            Verkleiden: 40,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
      {
        name: "Helferin",
        background:
          "Beunruhigend viele Leute in deinem Bezirk fallen unter den Bann einer undurchsichtigen Sekte. Du versuchst der Sache auf den Grund zu gehen, aber alle deine Versuche werden abgeblockt. Nachdem deine Kollegin einen Unfall erleidet, der auf natürlichem Wege schlicht nicht zu erklären ist, wird dir klar, dass du handeln musst.",
        variants: ["Entwicklungshelferin", "Sozialarbeiterin", "Missionarin"],
        recommendedAttributes: ["EN", "CH"],
        skills: {
          fixed: {
            Buchführung: 40,
            Bürokratie: 40,
            "Erste Hilfe": 40,
            Fahren: 40,
            Fremdsprache: 50,
            Navigation: 40,
            Psychologie: 40,
            Rechtswesen: 30,
            Suchen: 40,
            Überzeugen: 50,
            Wachsamkeit: 40,
          },
          optional: {
            Anthropologie: 40,
            Fremdsprache: 40,
            Handwerk: 40,
            Kriminologie: 50,
            Medizin: 40,
            Pharmazie: 40,
            Religion: 50,
            Überlebenskunst: 50,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
      {
        name: "Journalistin",
        background:
          "Du hast ein verwackeltes Handyvideo zugespielt bekommen, das eine seltsam unwirkliche Bibliothek zeigt, in der sich schemenhafte Gestalten mit gesenkten Stimmen unterhalten. Bisher ist es dir nicht gelungen, herauszufinden, wo die Aufnahmen gemacht worden sind. Andere halten das Video für einen Fake, aber du bist dir sicher dass mehr dahintersteckt.",
        variants: [
          "Reporterin",
          "Bloggerin",
          "Vloggerin",
          "Fotojournalistin",
          "Enthüllungsjournalistin",
          "Kriegsberichterstatterin",
        ],
        recommendedAttributes: ["IN", "CH"],
        skills: {
          fixed: {
            Bürokratie: 50,
            Fremdsprache: 50,
            Kunst: 60,
            Psychologie: 30,
            Suchen: 40,
            Überzeugen: 50,
            Wachsamkeit: 40,
          },
          optional: {
            Athletik: 60,
            Anthropologie: 40,
            Fremdsprache: 40,
            Geschichte: 50,
            Heimlichkeit: 50,
            Informatik: 40,
            Kunst: 40,
            Kriminologie: 50,
            Medizin: 40,
            Militärwissenschaft: 40,
            Naturwissenschaft: 40,
            Navigation: 50,
            Okkultismus: 40,
            Rechtswesen: 40,
            Überlebenskunst: 50,
            Überwachen: 40,
          },
          optionalAmount: 4,
        },
        connections: 3,
      },
      {
        name: "Kämpferin",
        background:
          "Dieser sogenannte Nachtreißer hat die Gegend nun lange genug in Angst und Schrecken versetzt. Du wirst dem Grauen ein Ende bereiten! Das hast du dir fest vorgenommen. Was für eine perfekte Gelegenheit diesen Angebern zu zeigen, dass in dir eine echte Ritterin steckt! Sollen sie doch lieber Sticken lernen, wenn sie nicht den Mumm in den Knochen haben, dir zu folgen.",
        variants: [
          "Kommandosoldation",
          "Soldatin",
          "Söldnerin",
          "Ritterin",
          "Revolverheldin",
          "Widerstandskämpferin",
        ],
        recommendedAttributes: ["ST", "GE", "KO", "EN"],
        skills: {
          fixed: {
            Athletik: 50,
            "Erste Hilfe": 30,
            Heimlichkeit: 40,
            Nahkampfwaffen: 60,
            Navigation: 40,
            Überlebenskunst: 40,
            Wachsamkeit: 50,
            "Waffenloser Kampf": 60,
          },
          optional: {
            Anthropologie: 40,
            Artillerie: 40,
            Fahren: 60,
            Fremdsprache: 40,
            Kriminologie: 50,
            Militärwissenschaft: 40,
            Psychologie: 50,
            Rechtswesen: 40,
            Reiten: 50,
            Religion: 50,
            Schusswaffen: 60,
            Schwimmen: 60,
            Sprengstoffe: 40,
            Steuern: 40,
            Suchen: 60,
            Überwachen: 40,
            Überzeugen: 60,
            Verkleiden: 50,
          },
          optionalAmount: 6,
        },
        connections: 2,
      },
      {
        name: "Kriminelle",
        background:
          "Jetzt musst du die Ware nur noch unbemerkt über die Grenze schaffen. Es wird schon alles gut gehen. Das Geheimfach in deinem Koffer ist wirklich schwer zu finden. Viel mehr beschäftigt dich im Moment, woher dieses kratzende Geräusch kommt. Aus deinem Koffer? Aber das kann doch gar nicht sein.",
        variants: [
          "Einbrecherin",
          "Fälscherin",
          "Drogendealerin",
          "Schmugglerin",
          "Bankräuberin",
          "Betrügerin",
          "Gang-Mitglied",
          "Straßenräuberin",
          "Piratin",
        ],
        recommendedAttributes: ["GE", "EN", "CH"],
        skills: {
          fixed: {
            Athletik: 40,
            Heimlichkeit: 50,
            Kriminologie: 40,
            Psychologie: 40,
            Suchen: 50,
            Überzeugen: 40,
            Wachsamkeit: 50,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Buchführung: 40,
            Fahren: 60,
            Fremdsprache: 40,
            Handwerk: [
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
            Informatik: 40,
            Nahkampfwaffen: {
              value: 50,
              combinedSkill: "Schusswaffen",
              conjunction: "and",
            },
            Navigation: 50,
            Kunst: [
              {
                specialisation: "Fälschen",
                value: 40,
              },
              {
                specialisation: "Graffiti",
                value: 40,
              },
            ],
            Pharmazie: 40,
            Rechtswesen: 40,
            Schusswaffen: {
              value: 40,
              combinedSkill: "Nahkampfwaffen",
              conjunction: "and",
            },
            Schwimmen: 50,
            Sprengstoffe: 40,
            Steuern: [
              {
                specialisation: "Seefahrt",
                value: 40,
              },
              {
                specialisation: "Luftfahrt",
                value: 40,
              },
            ],
            Überwachen: 40,
            Überlebenskunst: 50,
            Verkleiden: 50,
          },
          optionalAmount: 5,
        },
        connections: 3,
      },
      {
        name: "Kulturwissenschaftlerin",
        background:
          "Der antike Mysterienkult, dem du große Teile deiner wissenschaftlichen Karriere gewidmet hast, erscheint unter dem Eindruck eines archäologischen Zufallsfunds in einem völlig neuen Licht. Die astronomischen Kenntnisse der isolierten religiösen Gemeinschaft müssen weit größer gewesen sein als vermutet. Aber woher kann diese Wissenstradition mitten im Nirgendwo stammen? Als eines der zentralen Textfragmente deiner Doktorarbeit plötzlich Ähnlichkeiten zu Forschungsergebnissen aus der New Horizons Mission zum Pluto aufweist, beginnst du, an deinem Verstand zu zweifeln.",
        variants: [
          "Archäologin",
          "Anthropologin",
          "Historikerin",
          "Religionswissenschaftlerin",
          "Hobbyforscherin",
        ],
        recommendedAttributes: ["IN", "EN"],
        skills: {
          fixed: {
            Anthropologie: {
              value: 50,
              conjunction: "or",
              combinedSkill: "Archäologie",
            },
            Archäologie: {
              value: 50,
              conjunction: "or",
              combinedSkill: "Anthropologie",
            },
            Bürokratie: 40,
            Fremdsprache: [
              {
                value: 50,
                specialisation: "",
              },
              {
                value: 40,
                specialisation: "",
              },
            ],
            Geschichte: 60,
            Kunst: 30,
            Überzeugen: 40,
          },
          optional: {
            Anthropologie: {
              value: 40,
              conjunction: "or",
              combinedSkill: "Archäologie",
            },
            Archäologie: {
              value: 40,
              conjunction: "or",
              combinedSkill: "Anthropologie",
            },
            Navigation: 50,
            Okkultismus: 50,
            Psychologie: 50,
            Religion: 50,
            Suchen: 60,
            Überlebenskunst: 50,
          },
          optionalAmount: 2,
        },
        connections: 4,
      },
      {
        name: "Künstlerin",
        background:
          "Dein neustes Werk wird berühmt machen! Du musst es nur noch vollenden. Leider kommst du seit Monaten nicht weiter damit. Daher hast du dir dieses Pülverchen besorgt, dass dir zu neuer Kreativität verhelfen soll. Wie du schnell feststellst, funktioniert es tatsächlich. Und diese Träume! Diese wunderbaren, abenteuerlichen und überaus anregenden Träume! Wie wirklich sie doch erscheinen…",
        variants: ["Bildhauerin", "Malerin", "Schriftstellerin", "Musikerin"],
        recommendedAttributes: ["IN", "CH"],
        skills: {
          fixed: {
            Anthropologie: 30,
            Geschichte: 30,
            Kunst: [
              {
                value: 60,
                specialisation: "",
              },
              {
                value: 40,
                specialisation: "",
              },
            ],
            Psychologie: 40,
            Suchen: 30,
            Überzeugen: 40,
            Wachsamkeit: 30,
          },
          optional: {
            Buchführung: 40,
            Fremdsprache: 40,
            Kunst: 40,
            Handwerk: 40,
            Informatik: 40,
            Okkultismus: 50,
            Pharmazie: 40,
            Psychotherapie: 50,
            Religion: 50,
            Überwachen: 40,
          },
          optionalAmount: 3,
        },
        connections: 4,
      },
      {
        name: "Medizinerin",
        background:
          "Du arbeitest in einem kleinen Waisenhaus an der Küste. Vor einigen Jahren ist am Fuß der Klippen ein zitternder Junge gefunden worden, der seitdem in dem Heim lebt. Bei der letzten Untersuchung hast du subtile Veränderungen an seinem Körper festgestellt, die dir keine Ruhe lassen.",
        variants: [
          "Virologin",
          "Sanitäterin",
          "Krankenschwester",
          "Psychiaterin",
          "Gerichtsmedizinerin",
          "Apothekerin",
          "Tierärztin",
          "Notärztin",
          "Chirurgin",
        ],
        recommendedAttributes: ["GE", "IN", "EN"],
        skills: {
          fixed: {
            Bürokratie: 40,
            "Erste Hilfe": 60,
            Medizin: 60,
            Naturwissenschaft: {
              value: 40,
              specialisation: "Biologie",
            },
            Pharmazie: 50,
            Suchen: 40,
            Überzeugen: 40,
          },
          optional: {
            Fahren: 60,
            Forensik: 50,
            Navigation: 50,
            Naturwissenschaft: 50,
            Psychotherapie: 60,
            Rechtswesen: 40,
            Religion: 50,
            Überlebenskunst: 50,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
      {
        name: "Müßiggängerin",
        background:
          "Bisher bestand dein Leben aus Sport, Unterhaltung, Reisen, Shopping und Partys. Als Erbin eines riesigen Firmenimperiums musstest du dich um wenig kümmern. Dein Leben hätte ewig so weiter gehen können, wäre da nicht dieses alte Familiengeheimnis gewesen, diese uralte Aufgabe zum Schutz der Welt …",
        variants: ["Adlige", "Flapperin", "Kind reicher Eltern", "Prominente"],
        recommendedAttributes: ["GE", "CH"],
        skills: {
          fixed: {
            Athletik: 50,
            Fahren: {
              value: 50,
              conjunction: "or",
              combinedSkill: "Reiten",
            },
            Heimlichkeit: 30,
            Psychologie: 50,
            Reiten: {
              value: 40,
              conjunction: "or",
              combinedSkill: "Fahren",
            },
            Schwimmen: 50,
            Suchen: 40,
            Überzeugen: 50,
            Verkleiden: 30,
            Wachsamkeit: 40,
          },
          optional: {
            Anthropologie: 40,
            Archäologie: 40,
            Buchführung: {
              value: 50,
              conjunction: "or",
              combinedSkill: "Bürokratie",
            },
            Bürokratie: {
              value: 50,
              conjunction: "or",
              combinedSkill: "Buchführung",
            },
            Geschichte: 50,
            Fremdsprache: 40,
            Kunst: 40,
            Nahkampfwaffen: {
              value: 50,
              conjunction: "and",
              combinedSkill: "Waffenloser Kampf",
            },
            Navigation: 50,
            Okkultismus: 50,
            Schusswaffen: 50,
            Überlebenskunst: 50,
            Überwachen: 40,
            "Waffenloser Kampf": {
              value: 60,
              conjunction: "and",
              combinedSkill: "Nahkampfwaffen",
            },
          },
          optionalAmount: 3,
        },
        connections: 4,
      },
      {
        name: "Naturwissenschaftlerin",
        background:
          "Die Signale, die der neu entdeckte Himmelskörper von sich gibt, deuten auf ein Muster hin. Du hast das Signal in eine Audiodatei umgewandelt. Du kannst das Muster sicher entschlüsseln, wenn du nur lange genug zuhörst. Das wird sicher nur noch ein bis zwei Wochen dauern. Solange kommt der Mensch zur Not auch ohne Nahrung und Tageslicht aus.",
        variants: [
          "Biologin",
          "Chemikerin",
          "Physikerin",
          "Geologin",
          "Astronomin",
          "Feldforscherin",
        ],
        recommendedAttributes: ["IN", "EN"],
        skills: {
          fixed: {
            Buchführung: 30,
            Bürokratie: 30,
            "Erste Hilfe": 30,
            Mathematik: 40,
            Naturwissenschaft: [
              {
                value: 40,
                specialisation: "",
              },
              {
                value: 60,
                specialisation: "",
              },
            ],
            Psychologie: 30,
            Suchen: 50,
            Überzeugen: 40,
            Wachsamkeit: 40,
          },
          optional: {
            Forensik: 40,
            Handwerk: 40,
            Heimlichkeit: 50,
            Informatik: 40,
            Medizin: 40,
            Navigation: 50,
            Pharmazie: 40,
            Sprengstoffe: 50,
            Überlebenskunst: 50,
            Fremdsprache: 40,
          },
          optionalAmount: 4,
        },
        connections: 2,
      },
      {
        name: "Obdachlose",
        background:
          "Die Sterne werden bald richtig stehen, aber niemand nimmt deine Warnungen ernst. Du musst die Leute warnen! Irgendjemand muss etwas unternehmen. Vielleicht musst du die Sache selbst in die Hand nehmen.",
        variants: [
          "gebrochene Veteranin",
          "Straßenpredigerin",
          "Bettlerin",
          "Drogensüchtige",
          "Aussteigerin",
          "Tunnelbewohnerin",
        ],
        recommendedAttributes: ["KO", "EN"],
        skills: {
          fixed: {
            Athletik: 40,
            "Erste Hilfe": 30,
            Heimlichkeit: 40,
            Kriminologie: 30,
            Navigation: 40,
            Psychologie: 50,
            Suchen: 60,
            Überlebenskunst: 30,
            Überzeugen: 50,
            Wachsamkeit: 60,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Anthropologie: 40,
            Fremdsprache: 40,
            Geschichte: 50,
            Handwerk: 40,
            Kunst: 40,
            Militärwissenschaft: 40,
            Nahkampfwaffen: {
              value: 50,
              conjunction: "and",
              combinedSkill: "Schusswaffen",
            },
            Okkultismus: 50,
            Pharmazie: 50,
            Religion: 50,
            Schusswaffen: {
              value: 40,
              conjunction: "and",
              combinedSkill: "Nahkampfwaffen",
            },
            Verkleiden: 50,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
      {
        name: "Technikerin",
        background:
          "Du hast gedacht, es sei eine gute Gelegenheit den Menschen zu helfen, daher hast du dich freiwillig gemeldet, tief in der Savanne einen Brunnen zu bauen. Jetzt wo du die uralte Kammer mit dem zerstörten Schutzkreis vor dir siehst, die ihr angegraben habt, bist du dir nicht mehr sicher.",
        variants: [
          "Bauingenieurin",
          "Architektin",
          "Hackerin",
          "Handwerkerin",
          "Überwachungsspezialistin",
          "Sprengmeisterin",
          "Pionierin",
        ],
        recommendedAttributes: ["GE", "IN"],
        skills: {
          fixed: {
            Buchführung: {
              value: 40,
              conjunction: "or",
              combinedSkill: "Bürokratie",
            },
            Bürokratie: {
              value: 40,
              conjunction: "or",
              combinedSkill: "Buchführung",
            },
            Handwerk: [
              {
                value: 40,
                specialisation: "",
              },
              {
                value: 60,
                specialisation: "",
              },
            ],
            Suchen: 40,
            Überzeugen: 40,
          },
          optional: {
            Athletik: {
              value: 40,
              conjunction: "and",
              combinedSkill: "Schusswaffen",
            },
            Fahren: 60,
            Handwerk: 40,
            Heimlichkeit: 50,
            Informatik: 40,
            Mathematik: 40,
            Naturwissenschaft: 40,
            Militärwissenschaft: 40,
            Navigation: 40,
            Schusswaffen: {
              value: 40,
              conjunction: "or",
              combinedSkill: "Athletik",
            },
            Schwimmen: 40,
            Sprengstoffe: 40,
            Steuern: 40,
            Überlebenskunst: 40,
            Überwachen: 40,
            Wachsamkeit: 60,
          },
          optionalAmount: 6,
        },
        connections: 3,
      },
      {
        name: "Überlebenskünstlerin",
        background:
          "Dein Stammbaum enthält eine lange und ehrwürdige Ahnenreihe. Schon immer hat deine Familie die Möglichkeit gehabt, sich der Kunst, dem Reisen oder dem Studium von höchst interessanten Wissenschaftsgebieten hinzugeben. Dabei ist Tradition ein Anker in diesen Zeiten, der Unterschied zwischen dir und den anderen Schichten ist offenkundig und gesellschaftlich zementiert. Deine geplante Vernissage und Auftritt als Mäzen im Ausland, mit diesem neuen und unglaublich kreativen Künstler, der sich ganz neuen Maltechniken widmet, verbindet glücklicherweise viele deiner Vorlieben.",
        variants: [
          "Extremsportlerin",
          "Entdeckerin",
          "Feldforscherin",
          "Wildhüterin",
          "Jägerin",
          "Einsiedlerin",
        ],
        recommendedAttributes: ["KO", "EN"],
        skills: {
          fixed: {
            Athletik: 50,
            "Erste Hilfe": 30,
            Heimlichkeit: 50,
            Nahkampfwaffen: 50,
            Navigation: 60,
            Schusswaffen: 50,
            Suchen: 50,
            Überlebenskunst: 60,
            Wachsamkeit: 50,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Anthropologie: 40,
            Fahren: 60,
            Fremdsprache: 40,
            Handwerk: 40,
            Militärwissenschaft: 40,
            Okkultismus: 50,
            Reiten: 50,
            Religion: 50,
            Schwimmen: 60,
            Steuern: 40,
            Überwachen: 40,
          },
          optionalAmount: 4,
        },
        connections: 2,
      },
      {
        name: "Wächterin",
        background:
          "Was eine ganz normale Nachtschicht an der Tunnelbaustelle hätte werden sollen, stellte sich als Alptraum heraus, als einer deiner Kollegen plötzlich spurlos verschwand. Man fand ihn wenige Stunden später aufgedunsen, als hätte er Tage in einem dunklen Tümpel gelegen. Du bist dir sicher, dass mit dem Tunnel etwas nicht stimmt. Bis zur nächsten Schicht in einer Woche solltest du herausfinden, was es war, bevor es auch noch dich erwischt.",
        variants: [
          "Stadtwächterin",
          "Tempelwächterin",
          "Leibwächterin",
          "Wachschutz",
          "Flughafensicherheit",
        ],
        recommendedAttributes: ["ST", "EN"],
        skills: {
          fixed: {
            Athletik: 50,
            Bürokratie: 40,
            "Erste Hilfe": 40,
            Heimlichkeit: 30,
            Kriminologie: 40,
            Nahkampfwaffen: 50,
            Psychologie: 50,
            Rechtswesen: 30,
            Suchen: 50,
            Überzeugen: 50,
            Wachsamkeit: 50,
            "Waffenloser Kampf": 50,
          },
          optional: {
            Fahren: 60,
            Fremdsprache: 40,
            Navigation: 50,
            Reiten: 50,
            Schusswaffen: 60,
            Überwachen: 40,
          },
          optionalAmount: 2,
        },
        connections: 3,
      },
    ],
    skills: {
      Anthropologie: {
        value: 0,
        type: "geistig",
      },
      Archäologie: {
        value: 0,
        type: "geistig",
      },
      Artillerie: {
        value: 0,
        type: "körperlich",
      },
      Athletik: {
        value: 30,
        type: "körperlich",
      },
      Buchführung: {
        value: 10,
        type: "geistig",
      },
      Bürokratie: {
        value: 10,
        type: "sozial",
      },
      "Erste Hilfe": {
        value: 10,
        type: "körperlich",
      },
      Fahren: {
        value: 20,
        type: "körperlich",
      },
      Forensik: {
        value: 0,
        type: "geistig",
      },
      Fremdsprache: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      Geschichte: {
        value: 0,
        type: "geistig",
      },
      Handwerk: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      Heimlichkeit: {
        value: 10,
        type: "körperlich",
      },
      Informatik: {
        value: 0,
        type: "geistig",
      },
      Kriminologie: {
        value: 10,
        type: "geistig",
      },
      Kunst: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      Mathematik: {
        value: 0,
        type: "geistig",
      },
      Medizin: {
        value: 0,
        type: "geistig",
      },
      Militärwissenschaft: {
        value: 0,
        type: "geistig",
      },
      Nahkampfwaffen: {
        value: 30,
        type: "körperlich",
      },
      Naturwissenschaft: {
        value: 0,
        type: "geistig",
        specialisation: true,
      },
      Navigation: {
        value: 10,
        type: "körperlich",
      },
      Okkultismus: {
        value: 10,
        type: "geistig",
      },
      Pharmazie: {
        value: 0,
        type: "geistig",
      },
      Psychologie: {
        value: 10,
        type: "sozial",
      },
      Psychotherapie: {
        value: 10,
        type: "sozial",
      },
      Rechtswesen: {
        value: 0,
        type: "geistig",
      },
      Reiten: {
        value: 10,
        type: "körperlich",
      },
      Religion: {
        value: 10,
        type: "geistig",
      },
      Schusswaffen: {
        value: 20,
        type: "körperlich",
      },
      Schwimmen: {
        value: 20,
        type: "körperlich",
      },
      Sprengstoffe: {
        value: 0,
        type: "geistig",
      },
      Steuern: {
        value: 0,
        type: "körperlich",
        specialisation: true,
      },
      Suchen: {
        value: 20,
        type: "körperlich",
      },
      Träumen: {
        value: "EN",
        type: "geistig",
      },
      Traumlandwissen: {
        value: "Unnatürliches Wissen",
        type: "geistig",
        isMythos: true,
      },
      Überlebenskunst: {
        value: 10,
        type: "körperlich",
      },
      Überwachen: {
        value: 0,
        type: "geistig",
      },
      Überzeugen: {
        value: 20,
        type: "sozial",
      },
      "Unnatürliches Wissen": {
        value: 0,
        type: "geistig",
        isMythos: true,
      },
      Verkleiden: {
        value: 10,
        type: "sozial",
      },
      Wachsamkeit: {
        value: 20,
        type: "körperlich",
      },
      "Waffenloser Kampf": {
        value: 40,
        type: "körperlich",
      },
    },
    facettes: {
      Reichtum: {
        description:
          "Dein Charakter ist sehr wohlhabend und Geld spielt in seinem Alltag eine untergeordnete Rolle, denn er verfügst über ausreichend davon. Beispiele: Unternehmensinhaberin. Reiche Erbin.",
        advantage:
          "Alle Ausgaben deines Charakters werden als eine Ausgabenkategorie niedriger behandelt als üblich. ",
        disadvantage: "Streiche eine Bindung.",
      },
      "Armut / Schulden": {
        description:
          "Du bist arm wie eine Kirchenmaus, vielleicht hast du auch hohe Schulden. Aber Geld alleine macht bekanntlich nicht glücklich. Wenigstens hast du solide Bindungen!",
        advantage: "Dein Charakter erhält eine zusätzliche Bindung.",
        disadvantage:
          "Alle Ausgaben deines Charakters werden als eine Ausgabenkategorie höher behandelt als üblich.",
      },
      Status: {
        description:
          "Dein Charakter ist innerhalb bestimmter Kreise berühmt oder anerkannt. Die Leute erkennen ihn, wenn sie ihm begegnen und haben eine hohe Meinung von ihm. Für ihn selbst hat diese Anerkennung großen persönlichen Wert. Vielleicht sind sie dem Charakter aber auch einfach unterstellt, weil er einen höheren Rang oder Stand besitzt. Beispiele: Eine Musikerin und ihre Fans. Eine Professorin und die Wissenschaftscommunity. Eine Adelige und ihre Untertan. Eine Offizierin und ihre Untergebenen.",
        advantage:
          "+20% auf soziale Proben gegenüber Bewunderern und Personen mit niedrigerem Status.",
        disadvantage:
          "-20% auf soziale Proben, um unerkannt zu bleiben. Der Charakter muss immer damit rechnen, dass er einen Bewunderer oder Untergebenen trifft und erkannt wird.",
      },
      Gewalterfahrungen: {
        description:
          "Dein Charakter hat über einen längeren Zeitraum Erfahrungen mit extremer Gewalt oder den Konsequenzen davon gemacht. Sei es, dass er sie selbst ausgeübt hat, Opfer geworden ist oder berufsmäßig damit zu tun hat. Beispiele: Eine Kriminalkommissarin. Eine Soldatin.",
        advantage: "Dein Charakter ist abgehärtet gegen Gewalt.",
        disadvantage: "Dein Charakter verliert 1W6 CH.",
      },
      Hilflosigkeitserfahrung: {
        description:
          "Dein Charakter war über einen längeren Zeitraum in Gefangenschaft oder Isolation. Beispiele: Eine unschuldig verurteilte Inhaftierte. Eine verschollen geglaubte Seglerin.",
        advantage: "Dein Charakter ist abgehärtet gegen Hilflosigkeit.",
        disadvantage:
          "Dein Charakter verliert 1W6 EN (ohne Einfluss auf die Start-STA).",
      },
      Erkenntnis: {
        description:
          "Dein Charakter weiß, dass das Unnatürliche real ist, weil er ihm bereits begegnet ist. Wichtig: Damit ist keine Okkultistin gemeint. Dein Charakter muss nicht bloß davon überzeugt sein, dass das Übernatürliche existiert, sondern er muss es wissen.",
        advantage: "Erhöhe das unnatürliche Wissen deines Charakters um 10%.",
        disadvantage:
          "Dein Charakter verliert 5 STA mit allen damit verbundenen Konsequenzen.",
      },
      "Verlusterfahrung / Hingabe": {
        description:
          "Dein Charakter hat einen Verlust erlitten. Vielleicht hat er zu viel gearbeitet und eine Beziehung ging dadurch zu Bruch. Vielleicht hat er auch jemanden durch einen Schicksalsschlag verloren. Alternativ könnte dein Charakter eine Bindung auch verloren haben, weil er sich zu sehr einer Sache verschrieben hat. Dabei könnte es sich um einen Beruf, einen Glauben, einen Sport, eine Wissenschaft, ein Hobby oder auch um die Suche nach der Wahrheit handeln.",
        advantage: "Dein Charakter erhält 50 Fertigkeitspunkte.",
        disadvantage: "Streiche eine Bindung.",
      },
      Krisenerfahrung: {
        description:
          "Dein Charakter hat einfach schon zu viele schlimme Dinge erlebt. Die durchlebten Krisen haben den Charakter erfahrener gemacht, aber auch gezeichnet.",
        advantage: "Dein Charakter erhält 20 Fertigkeitspunkte.",
        disadvantage:
          "Dein Charakter verliert 10 STA mit allen damit verbundenen Konsequenzen.",
      },
      Handicap: {
        description:
          "Dein Charakter hat ein dauerhaftes Problem und musste lernen, damit umzugehen.",
        advantage: "Dein Charakter erhält 20 Fertigkeitspunkte.",
        disadvantage:
          "Dein Charakter beginnt mit einem dauerhaften Problem. Sprich die Details mit deiner Spielleiterin ab. Beispiele: psychische Störung, Verstümmelung, schwere Krankheit, unangenehmen Verpflichtung, Ärger mit den falschen Leuten, offener Haftbefehl, Erzfeind, sozialen Benachteiligung, unnatürliches Problem…",
      },
      Zweisprachigkeit: {
        description:
          "Dein Charakter ist in einem mehrsprachigen Elternhaus aufgewachsen oder hat sehr lange im Ausland gelebt.",
        advantage:
          "Dein Charakter beherrscht eine zweite Sprache wie seine Muttersprache.",
        disadvantage: "Dein Charakter erhält 20 Fertigkeitspunkte weniger.",
      },
      Glück: {
        description:
          "Dein Charakter hat mehr Glück als Verstand. Vielleicht ist er noch sehr jung oder er hat sich sein ganzes Leben auf sein Glück verlassen und deshalb nicht viel zu Stande gebracht.",
        advantage:
          "Bei Glücksproben erhält dein Charakter einen Bonus von +20%.",
        disadvantage: "Dein Charakter erhält 100 Fertigkeitspunkte weniger.",
      },
    },
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
