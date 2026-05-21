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
import { home, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import HomePage from "@base-routes/pages/home/Home";

// const HomePage = lazy(() => import("@base-routes/pages/home/Home"));
const SettingsPage = lazy(() => import("@base-routes/pages/settings/Settings"));
const InfoPage = lazy(() => import("@base-routes/pages/settings/info/Info"));
const UiPage = lazy(() => import("@base-routes/pages/settings/info/ui/Ui"));
const ColorsPage = lazy(() => import("@base-routes/pages/settings/info/ui/colors/Colors"));
const ComponentsPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/Components"),
);
const DisplayPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/display/Display"),
);
const AlertDisplayPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/display/alert/Alert"),
);
const DataDisplayPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/display/data/Data"),
);
const TextDisplayPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/display/text/Text"),
);
const IconsPage = lazy(() => import("@base-routes/pages/settings/info/ui/components/icons/Icons"));
const InputsPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/Inputs"),
);
const ButtonPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/button/Button"),
);
const DateTimePage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/date-time/DateTime"),
);
const EmailPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/email/Email"),
);
const FilePage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/file/File"),
);
const InputWrapperPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/input-wrapper/InputWrapper"),
);
const NumberPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/number/Number"),
);
const OtpPage = lazy(() => import("@base-routes/pages/settings/info/ui/components/inputs/otp/Otp"));
const PasswordPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/password/Password"),
);
const SearchPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/search/Search"),
);
const SelectPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/select/Select"),
);
const TextInputPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/text/Text"),
);
const TogglePage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/inputs/toggle/Toggle"),
);
const LayoutPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/layout/Layout"),
);
const NavigationPage = lazy(
  () => import("@base-routes/pages/settings/info/ui/components/navigation/Navigation"),
);
const CssPage = lazy(() => import("@base-routes/pages/settings/info/ui/css/Css"));
const UtilPage = lazy(() => import("@base-routes/pages/settings/info/util/Util"));
const AppPage = lazy(() => import("@base-routes/pages/settings/info/util/app/App"));
const AuthPage = lazy(() => import("@base-routes/pages/settings/info/util/app/auth/Auth"));
const FeatureGuardPage = lazy(
  () => import("@base-routes/pages/settings/info/util/app/feature-guard/FeatureGuard"),
);
const HelpTextPage = lazy(
  () => import("@base-routes/pages/settings/info/util/app/help-text/HelpText"),
);
const PwaPage = lazy(() => import("@base-routes/pages/settings/info/util/app/pwa/Pwa"));
const ThemePage = lazy(() => import("@base-routes/pages/settings/info/util/app/theme/Theme"));
const ConstantsPage = lazy(
  () => import("@base-routes/pages/settings/info/util/constants/Constants"),
);
const FormatPage = lazy(() => import("@base-routes/pages/settings/info/util/format/Format"));
const HooksPage = lazy(() => import("@base-routes/pages/settings/info/util/hooks/Hooks"));
const SortPage = lazy(() => import("@base-routes/pages/settings/info/util/sort/Sort"));
const VendorPage = lazy(() => import("@base-routes/pages/settings/info/util/vendor/Vendor"));
const IonicPage = lazy(() => import("@base-routes/pages/settings/info/util/vendor/ionic/Ionic"));
const ReactPdfPage = lazy(
  () => import("@base-routes/pages/settings/info/util/vendor/react-pdf/ReactPdf"),
);
const MapboxPage = lazy(() => import("@base-routes/pages/settings/info/util/vendor/mapbox/Mapbox"));
const ReactQueryPage = lazy(
  () => import("@base-routes/pages/settings/info/util/vendor/react-query/ReactQuery"),
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
        <Redirect exact path="/" to="/home" />
        <Route path="/home" component={HomePage} exact />
        <Route path="/settings" render={lazyPage(SettingsPage)} exact />
        <Route path="/settings/info" render={lazyPage(InfoPage)} exact />
        <Route path="/settings/info/ui" render={lazyPage(UiPage)} exact />
        <Route path="/settings/info/ui/colors" render={lazyPage(ColorsPage)} exact />
        <Route path="/settings/info/ui/components" render={lazyPage(ComponentsPage)} exact />
        <Route path="/settings/info/ui/components/display" render={lazyPage(DisplayPage)} exact />
        <Route
          path="/settings/info/ui/components/display/alert"
          render={lazyPage(AlertDisplayPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/display/data"
          render={lazyPage(DataDisplayPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/display/text"
          render={lazyPage(TextDisplayPage)}
          exact
        />
        <Route path="/settings/info/ui/components/icons" render={lazyPage(IconsPage)} exact />
        <Route path="/settings/info/ui/components/inputs" render={lazyPage(InputsPage)} exact />
        <Route path="/settings/info/ui/components/layout" render={lazyPage(LayoutPage)} exact />
        <Route
          path="/settings/info/ui/components/navigation"
          render={lazyPage(NavigationPage)}
          exact
        />
        <Route path="/settings/info/ui/css" render={lazyPage(CssPage)} exact />
        <Route path="/settings/info/util" render={lazyPage(UtilPage)} exact />
        <Route path="/settings/info/util/app" render={lazyPage(AppPage)} exact />
        <Route path="/settings/info/util/constants" render={lazyPage(ConstantsPage)} exact />
        <Route path="/settings/info/util/format" render={lazyPage(FormatPage)} exact />
        <Route path="/settings/info/util/hooks" render={lazyPage(HooksPage)} exact />
        <Route path="/settings/info/util/sort" render={lazyPage(SortPage)} exact />
        <Route path="/settings/info/util/vendor" render={lazyPage(VendorPage)} exact />
        <Route
          path="/settings/info/ui/components/inputs/input-wrapper"
          render={lazyPage(InputWrapperPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/button"
          render={lazyPage(ButtonPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/date-time"
          render={lazyPage(DateTimePage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/email"
          render={lazyPage(EmailPage)}
          exact
        />
        <Route path="/settings/info/ui/components/inputs/file" render={lazyPage(FilePage)} exact />
        <Route
          path="/settings/info/ui/components/inputs/number"
          render={lazyPage(NumberPage)}
          exact
        />
        <Route path="/settings/info/ui/components/inputs/otp" render={lazyPage(OtpPage)} exact />
        <Route
          path="/settings/info/ui/components/inputs/password"
          render={lazyPage(PasswordPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/search"
          render={lazyPage(SearchPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/select"
          render={lazyPage(SelectPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/text"
          render={lazyPage(TextInputPage)}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/toggle"
          render={lazyPage(TogglePage)}
          exact
        />
        <Route path="/settings/info/util/app/auth" render={lazyPage(AuthPage)} exact />
        <Route
          path="/settings/info/util/app/feature-guard"
          render={lazyPage(FeatureGuardPage)}
          exact
        />
        <Route path="/settings/info/util/app/help-text" render={lazyPage(HelpTextPage)} exact />
        <Route path="/settings/info/util/app/pwa" render={lazyPage(PwaPage)} exact />
        <Route path="/settings/info/util/app/theme" render={lazyPage(ThemePage)} exact />
        <Route path="/settings/info/util/vendor/ionic" render={lazyPage(IonicPage)} exact />
        <Route path="/settings/info/util/vendor/react-pdf" render={lazyPage(ReactPdfPage)} exact />
        <Route path="/settings/info/util/vendor/mapbox" render={lazyPage(MapboxPage)} exact />
        <Route
          path="/settings/info/util/vendor/react-query"
          render={lazyPage(ReactQueryPage)}
          exact
        />
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
