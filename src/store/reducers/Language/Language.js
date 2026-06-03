const initialState = {
  language: localStorage.getItem('language') || 'en'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      }
    default:
      return state
  }
}
