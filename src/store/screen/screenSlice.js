const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isMobileScreen: false,
  //   isLargeScreen: false,
};

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setIsMobileScreen: (state, action) => {
      state.isMobileScreen = action.payload;
    },
  },
});

export const { setIsMobileScreen } = screenSlice.actions;

export default screenSlice.reducer;
