
const createReducer = (initState, handlers) => {
  const reducer = (state = initState, action) => {
    if (handlers.hasOwnProperty(action.type)) {

      const newState = handlers[action.type](state, action)

      if (typeof state === 'object') {
        return {
          ...state,
          ...newState
        }
      } else if (Array.isArray(state)) {
        return {
          ...state,
          ...newState
        }
      } else {
        return newState
      }
    } else {
      return state
    }
  }

  return reducer
}

export default createReducer