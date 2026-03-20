import { LOGIN, LOGOUT, SET_USER } from "../actions";

const initialState = {
  userLogged: null,
  token: localStorage.getItem("token") || null,
};

const userReducer = function (currentState = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...currentState,
        userLogged: action.payload.user,
        token: action.payload.accessToken,
      };
    case LOGOUT:
      return {
        ...currentState,
        userLogged: null,
        token: null,
      };

    case SET_USER:
      return {
        ...currentState,
        userLogged: action.payload,
      };

    default:
      return currentState;
  }
};

export default userReducer;
