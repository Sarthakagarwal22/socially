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

// const isOnCall = (state=false,action) => {
//   switch(action.type){
//     case 'IS_ON_CALL':
//       if(action.status===false)
//         history.push("/")
//       return action.status
//     default:
//       return state
//   }
// }

// const startTimer = (state=false,action) => {
//   switch(action.type){
//     case 'START_TIMER':
//       return action.status
//     default:
//      return state 
//   }
// }

// const consumerPhone = (state=null,action) => {
//   switch(action.type){
//     case 'SET_PHONE':
//       return action.phone
//     default:
//       return state
//   }
// }

// const userProfile = (state={},action) => {
//   switch(action.type){
//     case 'USER_PROFILE':
//       return action.profile
//     default:
//       return state
//   }
// }

// const currentConsumer = (state="{}",action) => {
//   switch(action.type){
//     case 'CURRENT_CONSUMER':
//       return action.consumer
//     case 'EMPTY_CONSUMER':
//       return "{}"
//     default:
//       return state
//   }
// }

// const consumerQueryHistory = (state={},action) => {
//   switch(action.type){
//     case 'CREATE_QUERY':
//       var currentState = state;
//       action.query["datetime"] = Math.round((new Date()).getTime() / 1000)  
//       if(!currentState.response)
//       currentState.response = []  
//       currentState["response"].unshift(action.query);
//       return currentState
//     case 'UPDATE_CONSUMER_QUERY_HISTORY':
//       return action.history
//     case 'CLEAR_CONSUMER_QUERY_HISTORY':
//       return {}
//     default:
//       return state
//   }
// }

const globalFunctions = combineReducers({
  // userProfile,
  loginSuccessful,
  // isOnCall,
  // startTimer,
  // consumerPhone,
  // currentConsumer,
  // consumerQueryHistory
});

export default globalFunctions;