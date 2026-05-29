import { lazy, Suspense, type ComponentType } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
} from "@ionic/react";
import { home, book, calendar, people, settings } from "ionicons/icons";
import HomePage from "@proclaimer-routes/pages/home/Home";

const MinistryPage = lazy(() => import("@proclaimer-routes/pages/ministry/Ministry"));
const SchedulesPage = lazy(() => import("@proclaimer-routes/pages/schedules/Schedules"));
const PublishersPage = lazy(() => import("@proclaimer-routes/pages/publishers/Publishers"));
const SettingsPage = lazy(() => import("@proclaimer-routes/pages/settings/Settings"));

function PageLoader() {
  return (
    <div className="flex-center">
      <IonSpinner />
    </div>
  );
}

function lazyPage(Component: ComponentType) {
  return () => (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route path="/home" component={HomePage} exact />
        <Route path="/ministry" render={lazyPage(MinistryPage)} exact />
        <Route path="/schedules" render={lazyPage(SchedulesPage)} exact />
        <Route path="/publishers" render={lazyPage(PublishersPage)} exact />
        <Route path="/settings" render={lazyPage(SettingsPage)} exact />
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
