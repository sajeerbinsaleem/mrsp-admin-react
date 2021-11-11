  const initialState = {
    clients: [
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
  
  export default function clientReducer(state = initialState, action) {
    switch (action.type) {
      case 'indexClient': {
        return {
          // Again, one less level of nesting to copy
          ...state,
          clients: action.payload
        }
      }
      case 'updateClient': {
        return {
          // Updating a value
          ...state,
          clients: [action.payload, ...state.clients.filter(x => x.id !== action.payload.id)  ]
        }
      }
      case 'updateArrClient': {
        return {
          // Updating a value
          ...state,
          clients: [...state.clients, ...action.payload ]
        }
      }
      default:
        return state
    }
  }