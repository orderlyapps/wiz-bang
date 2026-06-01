import { Redirect, Route } from "react-router-dom";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/react";
import { home, book, calendar, people, settings } from "ionicons/icons";
import HomePage from "@proclaimer-routes/pages/home/Home";
import MinistryPage from "@proclaimer-routes/pages/ministry/Ministry";
import SchedulesPage from "@proclaimer-routes/pages/schedules/Schedules";
import PublishersPage from "@proclaimer-routes/pages/publishers/Publishers";
import SettingsPage from "@proclaimer-routes/pages/settings/Settings";
import AppearancePage from "@proclaimer-routes/pages/settings/appearance/Appearance";

function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route path="/home" component={HomePage} exact />
        <Route path="/ministry" component={MinistryPage} exact />
        <Route path="/schedules" component={SchedulesPage} exact />
        <Route path="/publishers" component={PublishersPage} exact />
        <Route path="/settings" component={SettingsPage} exact />
        <Route path="/settings/appearance" component={AppearancePage} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ministry" href="/ministry">
          <IonIcon icon={book} />
          <IonLabel>Ministry</IonLabel>
        </IonTabButton>
        <IonTabButton tab="schedules" href="/schedules">
          <IonIcon icon={calendar} />
          <IonLabel>Schedules</IonLabel>
        </IonTabButton>
        <IonTabButton tab="publishers" href="/publishers">
          <IonIcon icon={people} />
          <IonLabel>Publishers</IonLabel>
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
