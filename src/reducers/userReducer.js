const user = (state = {token:null}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {...state, token:action.token}
    case 'USER_LOGOUT':
      return {}
    default:
      return state
  }
}

export default user