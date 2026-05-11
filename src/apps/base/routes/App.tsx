import { lazy, Suspense } from "react";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/react";
import { home, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

const HomePage = lazy(() => import("@base-routes/pages/home/Home"));
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

function PageLoader() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <IonIcon icon={settings} />
    </div>
  );
}

function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Suspense fallback={<PageLoader />}>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" render={() => <HomePage />} exact />
          <Route path="/settings" render={() => <SettingsPage />} exact />
          <Route path="/settings/info" render={() => <InfoPage />} exact />
          <Route path="/settings/info/ui" render={() => <UiPage />} exact />
          <Route path="/settings/info/ui/colors" render={() => <ColorsPage />} exact />
          <Route path="/settings/info/ui/components" render={() => <ComponentsPage />} exact />
          <Route path="/settings/info/ui/components/display" render={() => <DisplayPage />} exact />
          <Route
            path="/settings/info/ui/components/display/alert"
            render={() => <AlertDisplayPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/display/data"
            render={() => <DataDisplayPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/display/text"
            render={() => <TextDisplayPage />}
            exact
          />
          <Route path="/settings/info/ui/components/icons" render={() => <IconsPage />} exact />
          <Route path="/settings/info/ui/components/inputs" render={() => <InputsPage />} exact />
          <Route path="/settings/info/ui/components/layout" render={() => <LayoutPage />} exact />
          <Route
            path="/settings/info/ui/components/navigation"
            render={() => <NavigationPage />}
            exact
          />
          <Route path="/settings/info/ui/css" render={() => <CssPage />} exact />
          <Route path="/settings/info/util" render={() => <UtilPage />} exact />
          <Route path="/settings/info/util/app" render={() => <AppPage />} exact />
          <Route path="/settings/info/util/constants" render={() => <ConstantsPage />} exact />
          <Route path="/settings/info/util/format" render={() => <FormatPage />} exact />
          <Route path="/settings/info/util/hooks" render={() => <HooksPage />} exact />
          <Route path="/settings/info/util/sort" render={() => <SortPage />} exact />
          <Route path="/settings/info/util/vendor" render={() => <VendorPage />} exact />
          <Route
            path="/settings/info/ui/components/inputs/input-wrapper"
            render={() => <InputWrapperPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/button"
            render={() => <ButtonPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/date-time"
            render={() => <DateTimePage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/email"
            render={() => <EmailPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/file"
            render={() => <FilePage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/number"
            render={() => <NumberPage />}
            exact
          />
          <Route path="/settings/info/ui/components/inputs/otp" render={() => <OtpPage />} exact />
          <Route
            path="/settings/info/ui/components/inputs/password"
            render={() => <PasswordPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/search"
            render={() => <SearchPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/select"
            render={() => <SelectPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/text"
            render={() => <TextInputPage />}
            exact
          />
          <Route
            path="/settings/info/ui/components/inputs/toggle"
            render={() => <TogglePage />}
            exact
          />
          <Route path="/settings/info/util/app/auth" render={() => <AuthPage />} exact />
          <Route
            path="/settings/info/util/app/feature-guard"
            render={() => <FeatureGuardPage />}
            exact
          />
          <Route path="/settings/info/util/app/help-text" render={() => <HelpTextPage />} exact />
          <Route path="/settings/info/util/app/pwa" render={() => <PwaPage />} exact />
          <Route path="/settings/info/util/app/theme" render={() => <ThemePage />} exact />
          <Route path="/settings/info/util/vendor/ionic" render={() => <IonicPage />} exact />
          <Route
            path="/settings/info/util/vendor/react-pdf"
            render={() => <ReactPdfPage />}
            exact
          />
        </Suspense>
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
