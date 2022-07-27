/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useEffect, useRef } from "preact/hooks";

import App from "../islands/App.tsx";

const AppWrapper = () => {
  return (
        <App />
  );
}

export default AppWrapper;