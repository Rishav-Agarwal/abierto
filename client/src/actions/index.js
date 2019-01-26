/* Action creators */


// When user signs in/logs out
export const changeLoginState = loggedIn => {
  return {
    type: 'CHANGE_LOGIN',
    // New login state
    payload: {
      loggedIn
    }
  };
};

// When user is verified by server
export const changeVerifyState = verified => {
  return {
    type: 'CHANGE_VERIFY',
    // New verification state
    payload: {
      verified
    }
  };
};