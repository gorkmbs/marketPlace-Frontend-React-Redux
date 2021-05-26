import {
  TOGGLE_SIDE_BAR,
  BIG_SCREEN_STATUS_CHANGE,
} from "../actions/actionsForSite";

const initialSiteStore = {
  toggleSideBar: false,
  isBigScreen: false,
};
function reducerForSite(state = initialSiteStore, action) {
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
  return state;
}

export default reducerForSite;
