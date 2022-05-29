import {
  TOGGLE_SIDE_BAR,
  BIG_SCREEN_STATUS_CHANGE,
  LOGIN_STATUS_CHANGED,
  TOKEN_CHANGED,
  USERNAME_CHANGED,
  USER_ID_CHANGED,
  USER_COLOR_CHANGED,
  USER_SHOPNAME_CHANGED,
  ADMIN_STATUS_CHANGED,
  SCREEN_WIDTH_CHANGED,
} from "../actions/actionsForSite";

const development = false; // true for implementation false for deploy

let urlServerState, tamzirtapozServerState;
if (development) {
  urlServerState = "http://localhost:5000";
  tamzirtapozServerState = "http://localhost:3000";
} else {
  urlServerState = "https://redterrex.herokuapp.com";
  tamzirtapozServerState = "https://tamzirtapoz.netlify.app";
}

export const urlServer = urlServerState;
export const tamzirtapozServer = tamzirtapozServerState;

const initialSiteStore = {
  toggleSideBar: false,
  login: false,
  token: "",
  username: "",
  admin: false,
  helloToBackend: development,
  id: "",
  color: "",
  shopName: "",
  isBigScreen: false,
  screenWidth: 500,
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
  if (action.type === ADMIN_STATUS_CHANGED) {
    return { ...state, admin: action.payload.admin };
  }
  if (action.type === USER_ID_CHANGED) {
    return { ...state, id: action.payload.id };
  }
  if (action.type === USER_SHOPNAME_CHANGED) {
    return { ...state, shopName: action.payload.shopName };
  }
  if (action.type === SCREEN_WIDTH_CHANGED) {
    return { ...state, screenWidth: action.payload.width };
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
    // console.log("payload: " + action.payload.login);
    // console.log("state: " + state.login);
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
