import { lazy, Suspense, type ComponentType } from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
} from "@ionic/react";
import { grid, settings, tabletPortrait } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import DashboardPage from "@admin-routes/pages/dashboard/Dashboard";

const SettingsPage = lazy(() => import("@admin-routes/pages/settings/Settings"));
const TablesPage = lazy(() => import("@admin-routes/pages/tables/Tables"));

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
        <Redirect exact path="/" to="/dashboard" />
        <Route path="/dashboard" component={DashboardPage} exact />
        <Route path="/settings" render={lazyPage(SettingsPage)} exact />
        <Route path="/tables" render={lazyPage(TablesPage)} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/dashboard">
          <IonIcon icon={grid} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tables" href="/tables">
          <IonIcon icon={tabletPortrait} />
          <IonLabel>Tables</IonLabel>
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
