import {SET_AUTH_TOKEN, SET_USER } from "../constants/authConstants";
import authService from "../components/api-authorization/AuthorizeService";

// SET TOKEN STATE
export function setAuthToken(token) {
    return {
        type: SET_AUTH_TOKEN,
        token: token,
    }
}

export const setToken = () => {
  return async dispatch => {
      const token = await authService.getAccessToken();
      dispatch(setAuthToken(token));
  } 
};

// SET USER STATE
export function  setAuthUser(user) {
    return {
        type: SET_USER,
        user: user,
    }
}

export const setUser = () => {
    return async dispatch => {
        const user = await authService.getUser();
        dispatch(setAuthUser(user));
    }  
};