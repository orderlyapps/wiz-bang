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

// Collection table pages
const AuthOtpLogPage = lazy(() => import("@admin-routes/pages/tables/auth-otp-log/AuthOtpLog"));
const AuthUserPage = lazy(() => import("@admin-routes/pages/tables/auth-user/AuthUser"));
const AvAssignmentPage = lazy(
  () => import("@admin-routes/pages/tables/av-assignment/AvAssignment"),
);
const AvParticipationPage = lazy(
  () => import("@admin-routes/pages/tables/av-participation/AvParticipation"),
);
const CleanMajorPage = lazy(() => import("@admin-routes/pages/tables/clean-major/CleanMajor"));
const CleanMinorPage = lazy(() => import("@admin-routes/pages/tables/clean-minor/CleanMinor"));
const CleanPermissionPage = lazy(
  () => import("@admin-routes/pages/tables/clean-permission/CleanPermission"),
);
const CongregationPage = lazy(() => import("@admin-routes/pages/tables/congregation/Congregation"));
const CongregationAdminPage = lazy(
  () => import("@admin-routes/pages/tables/congregation-admin/CongregationAdmin"),
);
const DoNotCallPage = lazy(() => import("@admin-routes/pages/tables/do-not-call/DoNotCall"));
const EventPage = lazy(() => import("@admin-routes/pages/tables/event/Event"));
const GroupPage = lazy(() => import("@admin-routes/pages/tables/group/Group"));
const MapPage = lazy(() => import("@admin-routes/pages/tables/map/Map"));
const MapMasterPage = lazy(() => import("@admin-routes/pages/tables/map-master/MapMaster"));
const MidweekAssignmentPage = lazy(
  () => import("@admin-routes/pages/tables/midweek-assignment/MidweekAssignment"),
);
const MidweekMeetingDataPage = lazy(
  () => import("@admin-routes/pages/tables/midweek-meeting-data/MidweekMeetingData"),
);
const MidweekParticipationPage = lazy(
  () => import("@admin-routes/pages/tables/midweek-participation/MidweekParticipation"),
);
const NotAtHomePage = lazy(() => import("@admin-routes/pages/tables/not-at-home/NotAtHome"));
const OutlinePage = lazy(() => import("@admin-routes/pages/tables/outline/Outline"));
const PublisherPage = lazy(() => import("@admin-routes/pages/tables/publisher/Publisher"));
const ReportPage = lazy(() => import("@admin-routes/pages/tables/report/Report"));
const ReportPermissionPage = lazy(
  () => import("@admin-routes/pages/tables/report-permission/ReportPermission"),
);
const SpeakerAssignmentPage = lazy(
  () => import("@admin-routes/pages/tables/speaker-assignment/SpeakerAssignment"),
);
const SpeakerAvailabilityPage = lazy(
  () => import("@admin-routes/pages/tables/speaker-availability/SpeakerAvailability"),
);
const SpeakerOutlinePage = lazy(
  () => import("@admin-routes/pages/tables/speaker-outline/SpeakerOutline"),
);
const StreetPage = lazy(() => import("@admin-routes/pages/tables/street/Street"));
const SuburbPage = lazy(() => import("@admin-routes/pages/tables/suburb/Suburb"));
const WeekendAssignmentPage = lazy(
  () => import("@admin-routes/pages/tables/weekend-assignment/WeekendAssignment"),
);
const WeekendParticipationPage = lazy(
  () => import("@admin-routes/pages/tables/weekend-participation/WeekendParticipation"),
);

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
        <Route path="/tables/auth-otp-log" render={lazyPage(AuthOtpLogPage)} exact />
        <Route path="/tables/auth-user" render={lazyPage(AuthUserPage)} exact />
        <Route path="/tables/av-assignment" render={lazyPage(AvAssignmentPage)} exact />
        <Route path="/tables/av-participation" render={lazyPage(AvParticipationPage)} exact />
        <Route path="/tables/clean-major" render={lazyPage(CleanMajorPage)} exact />
        <Route path="/tables/clean-minor" render={lazyPage(CleanMinorPage)} exact />
        <Route path="/tables/clean-permission" render={lazyPage(CleanPermissionPage)} exact />
        <Route path="/tables/congregation" render={lazyPage(CongregationPage)} exact />
        <Route path="/tables/congregation-admin" render={lazyPage(CongregationAdminPage)} exact />
        <Route path="/tables/do-not-call" render={lazyPage(DoNotCallPage)} exact />
        <Route path="/tables/event" render={lazyPage(EventPage)} exact />
        <Route path="/tables/group" render={lazyPage(GroupPage)} exact />
        <Route path="/tables/map" render={lazyPage(MapPage)} exact />
        <Route path="/tables/map-master" render={lazyPage(MapMasterPage)} exact />
        <Route path="/tables/midweek-assignment" render={lazyPage(MidweekAssignmentPage)} exact />
        <Route
          path="/tables/midweek-meeting-data"
          render={lazyPage(MidweekMeetingDataPage)}
          exact
        />
        <Route
          path="/tables/midweek-participation"
          render={lazyPage(MidweekParticipationPage)}
          exact
        />
        <Route path="/tables/not-at-home" render={lazyPage(NotAtHomePage)} exact />
        <Route path="/tables/outline" render={lazyPage(OutlinePage)} exact />
        <Route path="/tables/publisher" render={lazyPage(PublisherPage)} exact />
        <Route path="/tables/report" render={lazyPage(ReportPage)} exact />
        <Route path="/tables/report-permission" render={lazyPage(ReportPermissionPage)} exact />
        <Route path="/tables/speaker-assignment" render={lazyPage(SpeakerAssignmentPage)} exact />
        <Route
          path="/tables/speaker-availability"
          render={lazyPage(SpeakerAvailabilityPage)}
          exact
        />
        <Route path="/tables/speaker-outline" render={lazyPage(SpeakerOutlinePage)} exact />
        <Route path="/tables/street" render={lazyPage(StreetPage)} exact />
        <Route path="/tables/suburb" render={lazyPage(SuburbPage)} exact />
        <Route path="/tables/weekend-assignment" render={lazyPage(WeekendAssignmentPage)} exact />
        <Route
          path="/tables/weekend-participation"
          render={lazyPage(WeekendParticipationPage)}
          exact
        />
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
