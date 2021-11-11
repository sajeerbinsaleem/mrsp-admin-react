exports.userAction = {
    type: "rotate",
    payload: true
  };
  exports.userAction = {
    type: "rotate",
    payload: false
  };
  exports.leaveAction = (payload) => {
    return {
      type: "update",
        payload: payload
      }
  };
  
 