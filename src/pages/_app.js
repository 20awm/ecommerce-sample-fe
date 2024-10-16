import "@/styles/globals.css";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { isMobileScreenAtom } from "@/jotai/atoms";

export default function App({ Component, pageProps }) {
  const setIsMobileScreen = useSetAtom(isMobileScreenAtom);
  useEffect(() => {
    function handleResize() {
      setIsMobileScreen(window.innerWidth < 768);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileScreen]);

  return <Component {...pageProps} />;
}
