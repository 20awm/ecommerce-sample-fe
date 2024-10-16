const { SET_IS_MOBILE_SCREEN, SET_IS_LARGE_SCREEN } = require("./constant");

const initialState = {
  isMobileScreen: false,
  isLargeScreen: false,
};

const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_MOBILE_SCREEN:
      return {
        ...state,
        isMobileScreen: action.payload,
      };
    case SET_IS_LARGE_SCREEN:
      return {
        ...state,
        isLargeScreen: action.payload,
      };
    default:
      return state;
  }
};

export default screenReducer;
