export const setLanguage = lang => {
  localStorage.setItem('language', lang)
  return {
    type: 'SET_LANGUAGE',
    payload: lang
  }
}
