const initialState = {
  payload: null,
}
function PanelsReducer(state = initialState, action) {
  switch (action.type) {
    case 'Load':
      return { ...state, payload: action.payload }
    default:
      return state
  }
}

export default PanelsReducer
