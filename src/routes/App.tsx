import HomePage from "@routes/pages/home/Home";
import SettingsPage from "@routes/pages/settings/Settings";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/react";
import { home, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route path="/home" render={() => <HomePage />} exact />
        <Route path="/settings" render={() => <SettingsPage />} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default App;
