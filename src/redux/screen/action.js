import { SET_IS_MOBILE_SCREEN, SET_IS_LARGE_SCREEN } from "./constant";

export const setIsMobileScreen = (isMobile) => ({
  type: SET_IS_MOBILE_SCREEN,
  payload: isMobile,
});

export const setIsLargeScreen = (isMobile) => ({
  type: SET_IS_LARGE_SCREEN,
  payload: isMobile,
});
