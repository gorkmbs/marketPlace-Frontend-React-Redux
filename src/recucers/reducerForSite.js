import {
  TOGGLE_SIDE_BAR,
  BIG_SCREEN_STATUS_CHANGE,
  LOGIN_STATUS_CHANGED,
  TOKEN_CHANGED,
  USERNAME_CHANGED,
  USER_ID_CHANGED,
  USER_COLOR_CHANGED,
} from "../actions/actionsForSite";

// const urlServer = "http://localhost:5000";
// const tamzirtapozServer = "http://localhost:3000";
const urlServer = "https://tamzirtapoz.herokuapp.com";
const tamzirtapozServer = "https://tamzirtapoz.netlify.app";

const initialSiteStore = {
  toggleSideBar: false,
  login: false,
  token: "",
  username: "",
  id: "",
  color: "",
  isBigScreen: false,
  urlServer,
  tamzirtapozServer,
};
function reducerForSite(state = initialSiteStore, action) {
  if (action.type === TOGGLE_SIDE_BAR) {
    return { ...state, toggleSideBar: !state.toggleSideBar };
  }
  if (action.type === USER_COLOR_CHANGED) {
    return { ...state, color: action.payload.color };
  }
  if (action.type === USER_ID_CHANGED) {
    return { ...state, id: action.payload.id };
  }
  if (action.type === TOGGLE_SIDE_BAR) {
    return { ...state, toggleSideBar: !state.toggleSideBar };
  }
  if (action.type === BIG_SCREEN_STATUS_CHANGE) {
    if (action.payload.status === true) {
      return { ...state, isBigScreen: true };
    } else {
      return { ...state, isBigScreen: false };
    }
  }
  if (action.type === LOGIN_STATUS_CHANGED) {
    return { ...state, login: action.payload.login };
  }
  if (action.type === TOKEN_CHANGED) {
    return { ...state, token: action.payload.token };
  }
  if (action.type === USERNAME_CHANGED) {
    return { ...state, username: action.payload.username };
  }
  return state;
}

export default reducerForSite;
