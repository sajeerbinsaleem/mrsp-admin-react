  const initialState = {
    leaves: [
      {
          id : 1,
          company_name : 'Client 0',
          status : 'active',
          last_billed : '02/03/2021',
          hours_used : 120,
          total_hours : 1000,
      },
      
  ]
  }
  
  export default function leaveReducer(state = initialState, action) {
    switch (action.type) {
      case 'index': {
        return {
          // Again, one less level of nesting to copy
          ...state,
          leaves: action.payload
        }
      }
      case 'update': {
        return {
          // Updating a value
          ...state,
          leaves: [...state.leaves, ...action.payload ]
        }
      }
      default:
        return state
    }
  }