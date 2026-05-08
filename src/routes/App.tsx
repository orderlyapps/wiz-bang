import HomePage from "@routes/pages/home/Home";
import InfoPage from "@routes/pages/settings/info/Info";
import UiPage from "@routes/pages/settings/info/ui/Ui";
import UtilPage from "@routes/pages/settings/info/util/Util";
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
        <Route path="/settings/info" render={() => <InfoPage />} exact />
        <Route path="/settings/info/ui" render={() => <UiPage />} exact />
        <Route path="/settings/info/util" render={() => <UtilPage />} exact />
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
