import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@/util/vendor/ionic/helper/ionic-init";
import "@ui/css/index.css";
import App from "@routes/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IonApp>
      <IonReactRouter>
        <App />
      </IonReactRouter>
    </IonApp>
  </StrictMode>,
);
