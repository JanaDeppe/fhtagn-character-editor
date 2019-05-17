import {
// LOAD_RULESYSTEM_DATA,
} from './actions.type';

import {
// UPDATE_ATTRIBUTES,
// UPDATE_PROFESSIONS,
// UPDATE_SKILLS,
// UPDATE_FACETTES,
} from './mutations.type';

const state = {
  attributes: [
    {
      name: 'Stärke',
      abbr: 'ST',
    },
    {
      name: 'Konstitution',
      abbr: 'KO',
    },
    {
      name: 'Geschicklichkeit',
      abbr: 'GE',
    },
    {
      name: 'Intelligenz',
      abbr: 'IN',
    },
    {
      name: 'Entschlossenheit',
      abbr: 'EN',
    },
    {
      name: 'Charisma',
      abbr: 'CH',
    },
  ],
  professions: [
    {
      name: 'Diplomatin',
      background: 'Als du dich auf dem Empfang in den gesperrten Bereich der Botschaft schleichst, musst du feststellen, dass hinter der Fassade ganz andere Mächte die Fäden in der Hand halten.',
      variants: [
        'Botschafterin',
        'Spionin',
        'Unterhändlerin',
        'Handelsreisende',
      ],
      recommendedAttributes: ['IN', 'CH'],
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
          'Waffenloser Kampf': 50,
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
      name: 'Gesetzeshüterin',
      background: 'In den letzten Monaten sind erschreckend viele Wanderer in deinem Nationalpark verschwunden. Deshalb hast du dich auf den Weg gemacht, um der Sache auf den Grund zu gehen. Denn in deinem Nationalpark verschwindet man nicht einfach so!',
      variants: [
        'Rangerin in einem Nationalpark',
        'Streifenpolizistin',
        'Kriminalkomissarin',
        'Verdeckte Ermittlerin',
        'Grenzschützerin',
        'Beamtin der Küstenwache',
        'Militärpolizistin',
      ],
      recommendedAttributes: ['GE', 'IN', 'CH'],
      skills: {
        fixed: {
          Bürokratie: 40,
          'Erste Hilfe': 30,
          Fahren: 40,
          Kriminologie: 40,
          Navigation: 30,
          Psychologie: 50,
          Rechtswesen: 30,
          Schusswaffen: 50,
          Suchen: 50,
          Überzeugen: 50,
          Wachsamkeit: 50,
          'Waffenloser Kampf': 50,
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
            specialisation: 'Seefahrt',
          },
          Überlebenskunst: 40,
          Überwachen: 40,
          Verkleiden: 40,
        },
        optionalAmount: 2,
      },
      connections: 3,
    },
  ],
  skills: {
    Anthropologie: {
      value: 0,
      type: 'geistig',
    },
    Archäologie: {
      value: 0,
      type: 'geistig',
    },
    Artillerie: {
      value: 0,
      type: 'körperlich',
    },
    Athletik: {
      value: 30,
      type: 'körperlich',
    },
    Buchführung: {
      value: 10,
      type: 'geistig',
    },
    Bürokratie: {
      value: 10,
      type: 'sozial',
    },
    'Erste Hilfe': {
      value: 10,
      type: 'körperlich',
    },
    Fahren: {
      value: 20,
      type: 'körperlich',
    },
    Forensik: {
      value: 0,
      type: 'geistig',
    },
    Fremdsprache: {
      value: 0,
      type: 'geistig',
      specialisation: true,
    },
    Geschichte: {
      value: 0,
      type: 'geistig',
    },
    Handwerk: {
      value: 0,
      type: 'geistig',
      specialisation: true,
    },
    Heimlichkeit: {
      value: 10,
      type: 'körperlich',
    },
    Informatik: {
      value: 0,
      type: 'geistig',
    },
    Kriminologie: {
      value: 10,
      type: 'geistig',
    },
    Kunst: {
      value: 0,
      type: 'geistig',
      specialisation: true,
    },
    Mathematik: {
      value: 0,
      type: 'geistig',
    },
    Medizin: {
      value: 0,
      type: 'geistig',
    },
    Militärwissenschaft: {
      value: 0,
      type: 'geistig',
    },
    Nahkampfwaffen: {
      value: 30,
      type: 'körperlich',
    },
    Naturwissenschaft: {
      value: 0,
      type: 'geistig',
      specialisation: true,
    },
    Navigation: {
      value: 10,
      type: 'körperlich',
    },
    Okkultismus: {
      value: 10,
      type: 'geistig',
    },
    Pharmazie: {
      value: 0,
      type: 'geistig',
    },
    Psychologie: {
      value: 10,
      type: 'sozial',
    },
    Psychotherapie: {
      value: 10,
      type: 'sozial',
    },
    Rechtswesen: {
      value: 0,
      type: 'geistig',
    },
    Reiten: {
      value: 10,
      type: 'körperlich',
    },
    Religion: {
      value: 10,
      type: 'geistig',
    },
    Schusswaffen: {
      value: 20,
      type: 'körperlich',
    },
    Schwimmen: {
      value: 20,
      type: 'körperlich',
    },
    Sprengstoffe: {
      value: 0,
      type: 'geistig',
    },
    Steuern: {
      value: 0,
      type: 'körperlich',
      specialisation: true,
    },
    Suchen: {
      value: 20,
      type: 'körperlich',
    },
    Träumen: {
      value: 'EN',
      type: 'geistig',
    },
    Traumlandwissen: {
      value: 'Unnatürliches Wissen',
      type: 'geistig',
      isMythos: true,
    },
    Überlebenskunst: {
      value: 10,
      type: 'körperlich',
    },
    Überwachen: {
      value: 0,
      type: 'geistig',
    },
    Überzeugen: {
      value: 20,
      type: 'sozial',
    },
    'Unnatürliches Wissen': {
      value: 0,
      type: 'geistig',
      isMythos: true,
    },
    Verkleiden: {
      value: 10,
      type: 'sozial',
    },
    Wachsamkeit: {
      value: 20,
      type: 'körperlich',
    },
    'Waffenloser Kampf': {
      value: 40,
      type: 'körperlich',
    },
  },
  facettes: {
    Reichtum: {
      description: 'Dein Charakter ist sehr wohlhabend und Geld spielt in seinem Alltag eine untergeordnete Rolle, denn er verfügst über ausreichend davon. Beispiele: Unternehmensinhaberin. Reiche Erbin.',
      advantage: 'Alle Ausgaben deines Charakters werden als eine Ausgabenkategorie niedriger behandelt als üblich. ',
      disadvantage: 'Streiche eine Bindung.',
    },
    'Armut / Schulden': {
      description: 'Du bist arm wie eine Kirchenmaus, vielleicht hast du auch hohe Schulden. Aber Geld alleine macht bekanntlich nicht glücklich. Wenigstens hast du solide Bindungen!',
      advantage: 'Dein Charakter erhält eine zusätzliche Bindung.',
      disadvantage: 'Alle Ausgaben deines Charakters werden als eine Ausgabenkategorie höher behandelt als üblich.',
    },
    Status: {
      description: 'Dein Charakter ist innerhalb bestimmter Kreise berühmt oder anerkannt. Die Leute erkennen ihn, wenn sie ihm begegnen und haben eine hohe Meinung von ihm. Für ihn selbst hat diese Anerkennung großen persönlichen Wert. Vielleicht sind sie dem Charakter aber auch einfach unterstellt, weil er einen höheren Rang oder Stand besitzt. Beispiele: Eine Musikerin und ihre Fans. Eine Professorin und die Wissenschaftscommunity. Eine Adelige und ihre Untertan. Eine Offizierin und ihre Untergebenen.',
      advantage: '+20% auf soziale Proben gegenüber Bewunderern und Personen mit niedrigerem Status.',
      disadvantage: '-20% auf soziale Proben, um unerkannt zu bleiben. Der Charakter muss immer damit rechnen, dass er einen Bewunderer oder Untergebenen trifft und erkannt wird.',
    },
  },
};

const getters = {
  getAttributeList: state => state.attributes,
  getSkillList: state => state.skills,
  getProfessionalSkillsById: state => id => state.professions[id].skills.fixed,
  getOptionalSkillsById: state => id => state.professions[id].skills.optional,
  getAvailableOptionalSkillCount: state => id => state.professions[id].skills.optionalAmount,
  getProfessionNameById: state => id => (id > -1 ? state.professions[id].name : ''),
};

/* eslint-disable no-param-reassign */
const mutations = {
  // [UPDATE_ATTRIBUTES](context, payload) {
  //   context.attributes = payload.attributes;
  // },
  // [UPDATE_PROFESSIONS](context, payload) {
  //   context.attributes = payload.professions;
  // },
  // [UPDATE_SKILLS](context, payload) {
  //   context.attributes = payload.skills;
  // },
  // [UPDATE_FACETTES](context, payload) {
  //   context.attributes = payload.facettes;
  // },
};
/* eslint-enable no-param-reassign */

const actions = {
  // [LOAD_RULESYSTEM_DATA]({ commit }) {
  //   const data = {
  //     attributes: {},
  //     professions: {},
  //     skills: {},
  //     facettes: {},
  //   };

  //   return new Promise((resolve, reject) => {
  //     commit(UPDATE_ATTRIBUTES, data.attributes);
  //     commit(UPDATE_PROFESSIONS, data.professions);
  //     commit(UPDATE_SKILLS, data.skills);
  //     commit(UPDATE_FACETTES, data.facettes);
  //     resolve();
  //     reject();
  //   });
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
