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

const deletedPostsArray = (state=[],action) => {
  var deletedPostsArray = state.slice();
  switch(action.type){
    case 'UPDATE_DELETED_POSTS_ARRAY':
      deletedPostsArray.push(action.post);
      return deletedPostsArray
    case 'REMOVE_POST_FROM_DELETED_POSTS':
      return deletedPostsArray.filter((post) => post.id !== action.postId)
    default :
      return state
  }
}

const globalFunctions = combineReducers({
  loginSuccessful,
  postsArray,
  deletedPostsArray
});

export default globalFunctions;