const stateInitial = {
  baseCurr: 'USD'
}

export default (state = stateInitial, action) => {
  switch (action.type) {
    case 'GET_BASE_CURR':
      return {
        ...state,
        baseCurr: state.baseCurr
      }
    case 'GET_RATES':
      return {
        ...state,
        rates: action.payload
      }
      case 'SET_BASE_CURR':
        return {
          ...state,
          baseCurr: action.payload
        }

    default:
      return {
        ...state
      }
  }
}