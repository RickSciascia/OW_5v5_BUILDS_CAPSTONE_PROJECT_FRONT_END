export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_USER = "SET_USER";

export const loginAction = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logoutAction = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};

export const setUserAction = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
