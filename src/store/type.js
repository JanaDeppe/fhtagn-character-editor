// character
const act = {
  // character
  CREATE_NEW_CHARACTER: 'createNewCharacter',
  SET_ATTRIBUTE_VALUES: 'setAttributeValues',
  SET_PROFESSION: 'setProfession',
  UPDATE_PROFESSION_VARIANT: 'updateProfessionVariant',
  UPDATE_CONNECTION: 'updateConnection',
  UPDATE_FACETTES: 'updateFacettes',
  UPDATE_MOTIVATION: 'updateMotivation',
  UPDATE_PERSONAL_INFORMATION: 'updatePersonalInformation',

  // common
  ADD_WARNING: 'addWarning',
  REMOVE_WARNING: 'removeWarning',
  FLUSH_WARNINGS: 'flushWarnings',

  // skills
  INIT_CHARACTER_SKILLS: 'initCharacterSkills',
  NEW_CHARACTER_SKILL: 'newCharacterSkill',
  NEW_SKILL_MODIFICATION: 'newSkillModification',
  ADD_BONUS_SKILL: 'addBonusSkill',
  REMOVE_BONUS_SKILL: 'removeBonusSkill',
  TOGGLE_OPTIONAL_SKILL: 'toggleOptionalSkill',
  ADD_SPECIALISATION: 'addSpecialisation',
  MODIFY_SPECIALISATION: 'modifySpecialisation',
  REMOVE_SPECIALISATION: 'removeSpecialisation',
  SET_PROFESSION_SKILLS: 'setProfessionSkills',
  REMOVE_PROFESSION_SKILLS: 'removeProfessionSkills',
  REMOVE_SKILL_FROM_MODIFICATIONS: 'removeSkillFromModifications',
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
  IS_PROFESSION_LOADING: 'isProfessionLoading',

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
  AVAILABLE_MOTIVATIONS: 'availableMotivations',
  PROFESSION_NAME_BY_ID: 'professionNameById',
  HAS_SPECIALISATION_BY_SKILLNAME: 'hasSpecialisationBySkillname',
  SKILL_BY_NAME: 'skillByName',
  BASE_SKILL_VALUE_BY_NAME: 'baseSkillValueByName',

  // skills
  MODIFIED_SKILLS: 'modifiedSkills',
  SKILL_MAP: 'skillMap',
  PROFESSIONAL_SKILLS: 'professionalSkills',
  OPTIONAL_SKILLS: 'optionalSkills',
  OPTIONAL_SKILL_COUNT: 'optionalSkillCount',
  BONUS_SKILL_COUNT: 'bonusSkillCount',
  SKILL_BY_ID: 'skillById',
};

export { get, act };
