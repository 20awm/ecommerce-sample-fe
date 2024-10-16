import { configureStore } from "@reduxjs/toolkit";
import screenSlice from "./screen/screenSlice";

export const store = configureStore({
  reducer: {
    screen: screenSlice,
  },
});

export default store;
