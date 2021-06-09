import {
  ALL_PRODUCT_UPDATED,
  REMOVE_ITEM_FROM_BAG,
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
  if (action.type === REMOVE_ITEM_FROM_BAG) {
    let newState = { ...state };
    for (let i = 0; i < state.bagItems.length; i++) {
      if (String(state.bagItems[i].item._id) === String(action.payload._id)) {
        newState.bagItems = newState.bagItems.filter(
          (itemF) => itemF.item._id !== action.payload._id
        );
      }
    }
    return { ...newState };
  }
  if (action.type === NEW_ITEM_ADDED_TO_BAG) {
    let newState = { ...state };
    for (let i = 0; i < state.bagItems.length; i++) {
      if (
        String(state.bagItems[i].item._id) === String(action.payload.item._id)
      ) {
        newState.bagItems = newState.bagItems.filter(
          (itemF) => String(itemF.item._id) !== String(action.payload.item._id)
        );

        newState.bagItems = [
          ...state.bagItems.slice(0, i),
          { item: action.payload.item, count: action.payload.count },
          ...state.bagItems.slice(i + 1),
        ];

        return { ...newState };
      }
    }
    return {
      ...newState,
      bagItems: [
        ...newState.bagItems,
        { item: action.payload.item, count: action.payload.count },
      ],
    };
  }
  return state;
}

export default reducerForBag;
