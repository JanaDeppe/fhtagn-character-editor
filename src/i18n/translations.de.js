export default {
  common: {
    connections: "Bindungen",
  },
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
    professions: {
      chooseProfession: "Beruf wählen",
      customVariant: "Eigene Ausprägung",
      professionalSkills: "Berufsfertigkeiten",
      optionalSkills: "Optionale Fertigkeiten",
      errors: {
        missingProfession: {
          title: "Fehlende Auswahl",
          message: "Bitte wähle einen Beruf, bevor du weitermachst!",
        },
      },
    },
  },
  components: {
    skills: {
      baseValue: "Basiswert",
      pleaseSpecifySkillSpecialisation:
        "Bitte bezeichne diese Fertigkeit genauer!",
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
    professions: {
      diplomat: {
        name: "Diplomatin",
        background:
          "Als du dich auf dem Empfang in den gesperrten Bereich der Botschaft schleichst, musst du feststellen, dass hinter der Fassade ganz andere Mächte die Fäden in der Hand halten.",
        variants: {
          ambassador: "Botschafterin",
          spy: "Spionin",
          negotiator: "Unterhändlerin",
          travelingSalesman: "Handelsreisende",
        },
      },
      investigator: {
        name: "Ermittlerin",
        background:
          "Fremdgehende Ehepartner zu verfolgen, ist nicht gerade die spannendste Aufgabe. Aber du bist nun einmal auf solche Aufträge angewiesen. Du sitzt in deinem Wagen und wartest. Ob du nicht eine bessere Position für ein gutes Beweisfoto finden kannst? Noch ahnst du nicht, dass du dieses Mal etwas beobachten wirst, dass dein Weltbild grundlegend auf den Kopf stellen wird. Diese Augen! Diese Zähne! Du wirst sie nie mehr vergessen!",
        variants: {
          privateInvestigator: "Privatdetektivin",
          insuranceInvestigator: "Versicherungsdetektivin",
          environmentalInvestigator: "Umweltermittlerin",
          ghostHunter: "Geisterjägerin",
          amateurInvestigator: "Hobbyermittlerin",
          policeAdvisor: "Polizeiberaterin",
        },
      },
      driver: {
        name: "Fahrerin",
        background:
          "Bald hast du es wieder geschafft! Endlich Feierabend! Du musst nur noch ein letztes Paket ausliefern. Wer bestellt etwas in ein seit Jahren leerstehendes Mehrfamilienhaus? Mit dem seltsam schweren Paket unter dem Arm und zitternden Knien machst du dich auf die Suche nach dem Empfänger. Als du das Haus betrittst, bemerkst du sofort, dass hier etwas ganz grundlegend nicht stimmt.",
        variants: {
          packageDriver: "Paketbotin",
          pizzaDeliveryDriver: "Pizzabotin",
          truckDriver: "Fernfahrerin",
          cabDriver: "Taxifahrerin",
          getawayDriver: "Fluchtwagenfahrerin",
          chauffeur: "Chauffeurin",
          ambulanceDriver: "Rettungswagenfahrerin",
          safariDriver: "Safari-Fahrerin",
          cashInTransitDriver: "Werttransportfahrerin",
        },
      },
      businessman: {
        name: "Geschäftsfrau",
        background:
          "Irgendetwas stimmt mit dem Objekt nicht, mit dem du befasst bist. Unerklärliche Unfälle, ein hoher Krankenstand und andere Auffälligkeiten. Wilde Gerüchte über eine Vorbesitzerin machen die Runde und inmitten alter Akten findest du die ledrigen Seiten eines uralten Manuskripts. Du könntest die Sache einfach jemand anderem überlassen, aber irgendwas fesselt dich an der Geschichte.",
        variants: {
          realtor: "Maklerin",
          businessAdvisor: "Unternehmensberaterin",
          accountant: "Buchprüferin",
          antiquarian: "Antiquarin",
          antiqueDealer: "Antiquitätenhändlerin",
          artDealer: "Kunsthändlerin",
          armsDealer: "Waffenhändlerin",
          blackMarketDealer: "Schwarzmarkthändlerin",
          travelingMerchant: "fahrende Händlerin",
        },
      },
      lawEnforcementOfficer: {
        name: "Gesetzeshüterin",
        background:
          "In den letzten Monaten sind erschreckend viele Wanderer in deinem Nationalpark verschwunden. Deshalb hast du dich auf den Weg gemacht, um der Sache auf den Grund zu gehen. Denn in deinem Nationalpark verschwindet man nicht einfach so!",
        variants: {
          nationalParkRanger: "Rangerin in einem Nationalpark",
          patrolOfficer: "Streifenpolizistin",
          detective: "Kriminalkommissarin",
          undercoverCop: "verdeckte Ermittlerin",
          borderPatrolOfficer: "Grenzschützerin",
          coastGuard: "Beamtin der Küstenwache",
          militaryPoliceOfficer: "Militärpolizistin",
        },
      },
      faithRepresentative: {
        name: "Glaubensvertreterin",
        background:
          "Auf dem Friedhof hinter deiner Kirche wurden in letzter Zeit immer wieder Gräber beschädigt. Du hast eine Clique von Jugendlichen im Verdacht, konntest sie aber nie erwischen. Heute Morgen ist es noch schlimmer als sonst. Das Tor zur Krypta der Familie von Hohenfeldt scheint aufgebrochen worden zu sein. Als du näherkommst, siehst du zu deinem Entsetzen, dass sie von innen geöffnet wurde.",
        variants: {
          priest: "Priesterin",
          exorcist: "Exorzistin",
          religiousScholar: "Religionswissenschaftlerin",
          missionary: "Missionarin",
          nunMonk: "Nonne/Mönch",
          inquisitor: "Inquisitorin",
          shaman: "Schamanin",
          cultLeader: "Sektenführerin",
          occultist: "Okkultistin",
          hermit: "Einsiedlerin",
          religiousLeader: "religiöse Anführerin",
          fanatic: "Fanatikerin",
          mystic: "Mystikerin",
        },
      },
      journalist: {
        name: "Journalistin",
        background:
          "Du hast ein verwackeltes Handyvideo zugespielt bekommen, das eine seltsam unwirkliche Bibliothek zeigt, in der sich schemenhafte Gestalten mit gesenkten Stimmen unterhalten. Bisher ist es dir nicht gelungen, herauszufinden, wo die Aufnahmen gemacht worden sind. Andere halten das Video für einen Fake, aber du bist dir sicher dass mehr dahintersteckt.",
        variants: {
          reporter: "Reporterin",
          blogger: "Bloggerin",
          vlogger: "Vloggerin",
          photojournalist: "Fotojournalistin",
          investigativeJournalist: "Enthüllungsjournalistin",
          warCorrespondent: "Kriegsberichterstatterin",
        },
      },
      lawyer: {
        name: "Juristin",
        background:
          "Als du deinen neuen Klienten in seiner Zelle besuchen konntest, wirkte er freundlich, intelligent und gebildet. Als er dir aber von den furchtbaren Ereignissen in dem alten Landhaus berichtete, lagen in seinem Blick Angst und Wahnsinn. Dabei ist die ganze Geschichte mit irgendwelchen schrecklichen fliegenden Wesen völlig abstrus und unglaubwürdig! Jetzt fährst du also selbst in dieses Landhaus, um dir vor Ort ein Bild zu machen.",
        variants: {
          lawyer: "Rechtsanwältin",
          judge: "Richterin",
          prosecutor: "Staatsanwältin",
          legalAdvisor: "Justiziarin",
          judicialOfficer: "Rechtspflegerin",
          jurist: "Rechtswissenschaftlerin",
        },
      },
      fighter: {
        name: "Kämpferin",
        background:
          "Dieser sogenannte Nachtreißer hat die Gegend nun lange genug in Angst und Schrecken versetzt. Du wirst dem Grauen ein Ende bereiten! Das hast du dir fest vorgenommen. Was für eine perfekte Gelegenheit diesen Angebern zu zeigen, dass in dir eine echte Ritterin steckt! Sollen sie doch lieber Sticken lernen, wenn sie nicht den Mumm in den Knochen haben, dir zu folgen.",
        variants: {
          soldier: "(Kommando-)Soldatin",
          mercenary: "Söldnerin",
          knight: "Ritterin",
          gunslinger: "Revolverheldin",
          resistanceFighter: "Widerstandskämpferin",
        },
      },
      criminal: {
        name: "Kriminelle",
        background:
          "Jetzt musst du die Ware nur noch unbemerkt über die Grenze schaffen. Es wird schon alles gut gehen. Das Geheimfach in deinem Koffer ist wirklich schwer zu finden. Viel mehr beschäftigt dich im Moment, woher dieses kratzende Geräusch kommt. Aus deinem Koffer? Aber das kann doch gar nicht sein.",
        variants: {
          burglar: "Einbrecherin",
          counterfeiter: "Fälscherin",
          drugDealer: "Drogendealerin",
          smuggler: "Schmugglerin",
          bankRobber: "Bankräuberin",
          conMan: "Betrügerin",
          gangMember: "Gang-Mitglied",
          mugger: "Straßenräuberin",
          pirate: "Piratin",
        },
      },
      culturalScientist: {
        name: "Kulturwissenschaftlerin",
        background:
          "Der antike Mysterienkult, dem du große Teile deiner wissenschaftlichen Karriere gewidmet hast, erscheint unter dem Eindruck eines archäologischen Zufallsfunds in einem völlig neuen Licht. Die astronomischen Kenntnisse der isolierten religiösen Gemeinschaft müssen weit größer gewesen sein als vermutet. Aber woher kann diese Wissenstradition mitten im Nirgendwo stammen? Als eines der zentralen Textfragmente deiner Doktorarbeit plötzlich Ähnlichkeiten zu Forschungsergebnissen aus der New Horizons Mission zum Pluto aufweist, beginnst du, an deinem Verstand zu zweifeln.",
        variants: {
          archaeologist: "Archäologin",
          anthropologist: "Anthropologin",
          historian: "Historikerin",
          religiousScholar: "Religionswissenschaftlerin",
          amateurResearcher: "Hobbyforscherin",
        },
      },
      artist: {
        name: "Künstlerin",
        background:
          "Dein neustes Werk wird berühmt machen! Du musst es nur noch vollenden. Leider kommst du seit Monaten nicht weiter damit. Daher hast du dir dieses Pülverchen besorgt, dass dir zu neuer Kreativität verhelfen soll. Wie du schnell feststellst, funktioniert es tatsächlich. Und diese Träume! Diese wunderbaren, abenteuerlichen und überaus anregenden Träume! Wie wirklich sie doch erscheinen…",
        variants: {
          sculptor: "Bildhauerin",
          painter: "Malerin",
          writer: "Schriftstellerin",
          musician: "Musikerin",
          actor: "Schauspielerin",
          singer: "Sängerin",
        },
      },
      physician: {
        name: "Medizinerin",
        background:
          "Du arbeitest in einem kleinen Waisenhaus an der Küste. Vor einigen Jahren ist am Fuß der Klippen ein zitternder Junge gefunden worden, der seitdem in dem Heim lebt. Bei der letzten Untersuchung hast du subtile Veränderungen an seinem Körper festgestellt, die dir keine Ruhe lassen.",
        variants: {
          virologist: "Virologin",
          paramedic: "Sanitäterin",
          nurse: "Krankenpflegerin",
          psychiatrist: "Psychiaterin",
          coroner: "Gerichtsmedizinerin",
          pharmacist: "Apothekerin",
          veterinarian: "Tierärztin",
          erDoctor: "Notärztin",
          surgeon: "Chirurgin",
        },
      },
      idler: {
        name: "Müssiggängerin",
        background:
          "Bisher bestand dein Leben aus Sport, Unterhaltung, Reisen, Shopping und Partys. Als Erbin eines riesigen Firmenimperiums musstest du dich um wenig kümmern. Dein Leben hätte ewig so weiter gehen können, wäre da nicht dieses alte Familiengeheimnis gewesen, diese uralte Aufgabe zum Schutz der Welt …",
        variants: {
          aristocrat: "Adelige",
          flapper: "Flapperin",
          heir: "Erbin",
          socialite: "Prominente",
        },
      },
      scientist: {
        name: "Wissenschaftlerin",
        background:
          "Die Signale, die der neu entdeckte Himmelskörper von sich gibt, deuten auf ein Muster hin. Du hast das Signal in eine Audiodatei umgewandelt. Du kannst das Muster sicher entschlüsseln, wenn du nur lange genug zuhörst. Das wird sicher nur noch ein bis zwei Wochen dauern. Solange kommt der Mensch zur Not auch ohne Nahrung und Tageslicht aus.",
        variants: {
          astronomer: "Astronomin",
          biologist: "Biologin",
          chemist: "Chemikerin",
          fieldResearcher: "Feldforscherin",
          geologist: "Geologin",
          physicist: "Physikerin",
        },
      },
      homelessPerson: {
        name: "Obdachlose",
        background:
          "Die Sterne werden bald richtig stehen, aber niemand nimmt deine Warnungen ernst. Du musst die Leute warnen! Irgendjemand muss etwas unternehmen. Vielleicht musst du die Sache selbst in die Hand nehmen.",
        variants: {
          tramp: "Landstreicherin",
          brokenVeteran: "gebrochene Veteranin",
          streetPreacher: "Straßenpredigerin",
          beggar: "Bettlerin",
          drugAddict: "Drogensüchtige",
          dropout: "Aussteigerin",
          tunnelDweller: "Tunnelbewohnerin",
        },
      },
      educator: {
        name: "Pädagogin",
        background:
          "Beunruhigend viele Leute in deinem Bezirk fallen unter den Bann einer undurchsichtigen Sekte. Du versuchst der Sache auf den Grund zu gehen, aber alle deine Versuche werden abgeblockt. Nachdem deine Kollegin einen Unfall erleidet, der auf natürlichem Wege schlicht nicht zu erklären ist, wird dir klar, dass du handeln musst.",
        variants: {
          teacher: "Lehrerin",
          educator: "Erzieherin",
          governess: "Gouvernante",
          socialWorker: "Sozialpädagogin",
          developmentWorker: "Entwicklungshelferin",
          streetWorker: "Streetworkerin",
          probationOfficer: "Bewährungshelferin",
        },
      },
      psychologist: {
        name: "Psychologin",
        background:
          "Was dein Klient dir über diesen angeblichen Angriff eines Wahnsinnigen erzählt, dem er gerade so mit dem Leben entkommen sein will, ist wirklich haarsträubend. Der Arme zeigt offenkundig eine schwere Form von selbstverletzendem Verhalten, denn es gibt keinerlei Belege für seine Behauptungen – er muss sich die grotesken Wunden selbst zugefügt haben. Doch dann liest du in der Zeitung von einem Mordopfer, dessen grauenhafte Wunden beunruhigende Parallelen zu den Verletzungen deines Klienten aufweisen…",
        variants: {
          policePsychologist: "(Polizei-)Psychologin",
          profiler: "Profilerin",
          businessAdvisor: "Unternehmensberaterin",
          humanResourceConsultant: "Personalberaterin",
          headhunter: "Headhunter",
        },
      },
      technician: {
        name: "Technikerin",
        background:
          "Du hast gedacht, es sei eine gute Gelegenheit den Menschen zu helfen, daher hast du dich freiwillig gemeldet, tief in der Savanne einen Brunnen zu bauen. Jetzt, wo du die uralte Kammer mit dem zerstörten Schutzkreis vor dir siehst, bist du dir nicht mehr sicher. Manche Dinge sollten besser vergraben bleiben.",
        variants: {
          civilEngineer: "Bauingenieurin",
          architect: "Architektin",
          hacker: "Hackerin",
          artisan: "Handwerkerin",
          surveillanceExpert: "Überwachungsspezialistin",
          demolitionExpert: "Sprengmeisterin",
          pioneer: "Pionierin",
        },
      },
      survialExpert: {
        name: "Überlebenskünstlerin",
        background:
          "Dies ist nicht deine erste Expedition ins dunkle Herz von Afrika. Aber diesmal ist es anders. Je näher ihr dem uralten Tempel kommt, den die Wissenschaftler untersuchen wollen, desto mehr eigenartige Zufälle behindern euer Fortkommen. Vielleicht hättest du doch genauer auf die Warnungen hören sollen, die dir der verstörend aussehende Eingeborene im letzten Dorf zugeraunt hatte…",
        variants: {
          extremeAthlete: "Extremsportlerin",
          explorer: "Entdeckerin",
          fieldResearcher: "Feldforscherin",
          gamekeeper: "Wildhüterin",
          hunter: "Jägerin",
          hermit: "Einsiedlerin",
        },
      },
      watchman: {
        name: "Wächterin",
        background:
          "Was eine ganz normale Nachtschicht an der Tunnelbaustelle hätte werden sollen, stellte sich als Alptraum heraus, als eine deiner Kolleginnen plötzlich spurlos verschwand. Man fand sie wenige Stunden später aufgedunsen vor, als hätte sie Tage in einem dunklen Tümpel gelegen. Du bist dir sicher, dass mit dem Tunnel etwas nicht stimmt. Bis zur nächsten Schicht in einer Woche solltest du herausfinden, was es war, bevor es auch noch dich erwischt.",
        variants: {
          watchman: "Stadtwächterin",
          templeKeeper: "Tempelwächterin",
          bodyquard: "Leibwächterin",
          securityGuard: "Wachschutz",
          airportSecurity: "Flughafensicherheit",
        },
      },
    },
    skills: {
      anthropology: "Anthropologie",
      archeology: "Archäologie",
      artillery: "Artillerie",
      athletics: "Athletik",
      accounting: "Buchführung",
      bureaucracy: "Bürokratie",
      firstAid: "Erste Hilfe",
      drive: "Fahren",
      forensics: "Forensik",
      foreignLanguage: "Fremdsprache",
      history: "Geschichte",
      craft: "Handwerk",
      stealth: "Heimlichkeit",
      computerScience: "Informatik",
      criminology: "Kriminologie",
      art: "Kunst",
      mathematics: "Mathematik",
      medicine: "Medizin",
      militaryScience: "Militärwissenschaft",
      meleeWeapons: "Nahkampfwaffen",
      science: "Naturwissenschaft",
      navigate: "Navigation",
      occult: "Okkultismus",
      pharmacy: "Pharmazie",
      psychology: "Psychologie",
      psychotherapy: "Psychotherapie",
      law: "Rechtswesen",
      ride: "Reiten",
      religion: "Religion",
      firearms: "Schusswaffen",
      swim: "Schwimmen",
      demolitions: "Sprengstoffe",
      pilot: "Steuern",
      search: "Suchen",
      dream: "Träumen",
      dreamlandsKnowledge: "Traumlandwissen",
      survival: "Überlebenskunst",
      observe: "Überwachen",
      persuade: "Überzeugen",
      unnatural: "Unnatürliches Wissen",
      disguise: "Verkleiden",
      alertness: "Wachsamkeit",
      unarmedCombat: "Waffenloser Kampf",
    },
  },
};
