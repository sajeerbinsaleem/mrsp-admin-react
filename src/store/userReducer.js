import * as LocalCache from "../modules/LocalCache";

const initialState = {
  accessToken: LocalCache.getToken(),
  requestHeader: {
    "Content-Type": "application/json",
    headers: { Authorization: "Bearer " + LocalCache.getToken() },
  },
  status: 3,
  timeSession: "00:00:00",
  running_task_id: 0,
  role: LocalCache.getRole(),
  language: "en",
};
//add franchise

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "logout": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        accessToken: "",
      };
    }
    case "loggedIn": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        accessToken: action.payload,
      };
    }
    case "setRole": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        role: action.payload,
      };
    }
    case "timeSession": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        timeSession: action.payload,
      };
    }
    case "language": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        language: action.payload,
      };
    }
    case "running_task": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        running_task_id: action.payload,
      };
    }
    default:
      return state;
  }
}
