// character
const act = {
  // character
  CREATE_NEW_CHARACTER: 'createNewCharacter',
  SET_ATTRIBUTE_VALUES: 'setAttributeValues',
  SET_PROFESSION: 'setProfession',
  UPDATE_PROFESSION_VARIANT: 'updateProfessionVariant',
  UPDATE_CONNECTIONS: 'updateConnections',
  UPDATE_FACETTES: 'updateFacettes',
  UPDATE_MOTIVATIONS: 'updateMotivations',
  UPDATE_PERSONAL_INFORMATION: 'updatePersonalInformation',

  // common
  ADD_WARNING: 'addWarning',
  REMOVE_WARNING: 'removeWarning',
  FLUSH_WARNINGS: 'flushWarnings',

  // skills
  TOGGLE_SKILL: 'toggleOptionalSkill',
  NEW_SPECIALISATION: 'newSpecialisation',
  CHANGE_SPECIALISATION: 'changeSpecialisation',
  REMOVE_SPECIALISATION: 'removeSpecialisation',
};

const get = {
  // character
  PROFESSION_ID: 'professionId',
  ATTRIBUTE_VALUES: 'attributeValues',
  CHARACTER_DATA: 'characterData',
  DERIVED_VALUES: 'derivedValues',
  CONNECTIONS: 'connections',
  FACETTES: 'facettes',
  MOTIVATIONS: 'motivations',
  PERSONAL_INFORMATION: 'personalInformation',

  // common
  EDITOR_STEPS: 'editorSteps',
  CURRENT_WARNINGS: 'currentWarnings',
  WARNING_DATA_BY_KEY: 'warningDataByKey',
  APP_VERSION: 'appVersion',

  // rulesystem
  ATTRIBUTE_LIST: 'attributeList',
  PROFESSIONS_LIST: 'professionsList',
  SKILL_LIST: 'skillList',
  FACETTES_LIST: 'facettesList',
  PROFESSIONAL_SKILLS_BY_ID: 'professionalSkillsById',
  OPTIONAL_SKILLS_BY_ID: 'optionalSkillsById',
  AVAILABLE_OPTIONAL_SKILL_COUNT: 'availableOptionalSkillCount',
  AVAILABLE_CONNECTIONS_COUNT_BY_ID: 'availableConnectionsCountById',
  PROFESSION_NAME_BY_ID: 'professionNameById',

  // skills
  PROFESSIONAL_SKILLS: 'professionalSkills',
  OPTIONAL_SKILLS: 'optionalSkills',
  MODIFIED_SKILLS: 'modifiedSkills',
  REDUCED_SKILLS: 'reducedSkills',
  OPTIONAL_SKILL_COUNT: 'optionalSkillCount',
  SKILL_BY_NAME: 'skillByName',
  CALCULATED_SKILL_VALUE_BY_NAME: 'calculatedSkillValueByName',
};

export { get, act };
