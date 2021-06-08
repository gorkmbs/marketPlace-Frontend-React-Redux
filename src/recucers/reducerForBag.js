import {
  ALL_PRODUCT_UPDATED,
  NEW_ITEM_ADDED_TO_BAG,
} from "../actions/actionsForBag";

const initialBagStore = {
  allProducts: [],
  bagItems: [],
};
function reducerForBag(state = initialBagStore, action) {
  if (action.type === ALL_PRODUCT_UPDATED) {
    return { ...state, allProducts: action.payload.allProducts };
  }
  if (action.type === NEW_ITEM_ADDED_TO_BAG) {
    return {
      ...state,
      bagItems: [
        ...state.bagItems,
        { item: action.payload.item, count: action.payload.count },
      ],
    };
  }
  return state;
}

export default reducerForBag;
