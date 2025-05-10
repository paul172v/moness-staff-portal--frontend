import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AlertInfoProvider } from "./context/AlertInfoContext.tsx";
import { ShowHeaderSettingsProvider } from "./context/ShowHeader.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertInfoProvider>
      <ShowHeaderSettingsProvider>
        <App />
      </ShowHeaderSettingsProvider>
    </AlertInfoProvider>
  </React.StrictMode>
);
