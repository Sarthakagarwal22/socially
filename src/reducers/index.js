import { combineReducers } from 'redux';
// import history from '../history'

const loginSuccessful = (state=false,action) => {
  switch(action.type){
    case 'LOGIN_SUCCESSFUL':
      return true
    case 'LOGIN_UNSUCCESSFUL':
      return false
    case 'LOGOUT':
      return false
    default :
      return state
  }
}

const postsArray = (state=[],action) => {
  switch(action.type){
    case 'UPDATE_POSTS_ARRAY':
      return action.posts
    default :
      return state
  }
}

const globalFunctions = combineReducers({
  loginSuccessful,
  postsArray
});

export default globalFunctions;