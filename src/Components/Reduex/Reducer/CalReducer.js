const initialState = {
  value: {
    types: 'dark',
  },
  auth: {
    isAuth: false,
    token: '',
  },
  payload: null,

}

function addReducer(state = initialState, action) {
  switch (action.type) {
    case 'TheDark':
      return { ...state, value: { types: 'dark' } }
    case 'TheLight':
      return { ...state, value: { types: 'light' } }
    case 'TheAuth':
      return { ...state, auth: { isAuth: action.isAuth, token: action.token } }
    case 'Load':
      return { ...state, payload: action.payload }
    default:
      return state
  }
}

export default addReducer
