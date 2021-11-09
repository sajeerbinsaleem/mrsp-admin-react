import { combineReducers } from 'redux'

// import todosReducer from './features/todos/todosSlice'
// import filtersReducer from './features/filters/filtersSlice'
import userReducer from './userReducer'
import leaveReducer from './leaveReducer'
import clientReducer from './clientReducer'
const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  user: userReducer,
  leaves: leaveReducer,
  clients: clientReducer

})

export default rootReducer