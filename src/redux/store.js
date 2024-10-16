import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screen/reducer";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
  },
});

export default store;
