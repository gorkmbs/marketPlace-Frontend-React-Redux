import { ALL_PRODUCT_UPDATED } from "../actions/actionsForBag";

const initialBagStore = {
  allProducts: [],
  bagCount: false,
  hello: false,
};
function reducerForBag(state = initialBagStore, action) {
  if (action.type === ALL_PRODUCT_UPDATED) {
    return { ...state, allProducts: action.payload.allProducts };
  }
  return state;
}

export default reducerForBag;
