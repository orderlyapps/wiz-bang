import HomePage from "@base-routes/pages/home/Home";
import InfoPage from "@base-routes/pages/settings/info/Info";
import ColorsPage from "@base-routes/pages/settings/info/ui/colors/Colors";
import ComponentsPage from "@base-routes/pages/settings/info/ui/components/Components";
import DisplayPage from "@base-routes/pages/settings/info/ui/components/display/Display";
import IconsPage from "@base-routes/pages/settings/info/ui/components/icons/Icons";
import ButtonPage from "@base-routes/pages/settings/info/ui/components/inputs/button/Button";
import DateTimePage from "@base-routes/pages/settings/info/ui/components/inputs/date-time/DateTime";
import EmailPage from "@base-routes/pages/settings/info/ui/components/inputs/email/Email";
import FilePage from "@base-routes/pages/settings/info/ui/components/inputs/file/File";
import InputWrapperPage from "@base-routes/pages/settings/info/ui/components/inputs/input-wrapper/InputWrapper";
import InputsPage from "@base-routes/pages/settings/info/ui/components/inputs/Inputs";
import NumberPage from "@base-routes/pages/settings/info/ui/components/inputs/number/Number";
import OtpPage from "@base-routes/pages/settings/info/ui/components/inputs/otp/Otp";
import PasswordPage from "@base-routes/pages/settings/info/ui/components/inputs/password/Password";
import SearchPage from "@base-routes/pages/settings/info/ui/components/inputs/search/Search";
import SelectPage from "@base-routes/pages/settings/info/ui/components/inputs/select/Select";
import TogglePage from "@base-routes/pages/settings/info/ui/components/inputs/toggle/Toggle";
import LayoutPage from "@base-routes/pages/settings/info/ui/components/layout/Layout";
import NavigationPage from "@base-routes/pages/settings/info/ui/components/navigation/Navigation";
import CssPage from "@base-routes/pages/settings/info/ui/css/Css";
import UiPage from "@base-routes/pages/settings/info/ui/Ui";
import AppPage from "@base-routes/pages/settings/info/util/app/App";
import AuthPage from "@base-routes/pages/settings/info/util/app/auth/Auth";
import FeatureGuardPage from "@base-routes/pages/settings/info/util/app/feature-guard/FeatureGuard";
import HelpTextPage from "@base-routes/pages/settings/info/util/app/help-text/HelpText";
import PwaPage from "@base-routes/pages/settings/info/util/app/pwa/Pwa";
import ThemePage from "@base-routes/pages/settings/info/util/app/theme/Theme";
import ConstantsPage from "@base-routes/pages/settings/info/util/constants/Constants";
import FormatPage from "@base-routes/pages/settings/info/util/format/Format";
import HooksPage from "@base-routes/pages/settings/info/util/hooks/Hooks";
import SortPage from "@base-routes/pages/settings/info/util/sort/Sort";
import UtilPage from "@base-routes/pages/settings/info/util/Util";
import IonicPage from "@base-routes/pages/settings/info/util/vendor/ionic/Ionic";
import VendorPage from "@base-routes/pages/settings/info/util/vendor/Vendor";
import SettingsPage from "@base-routes/pages/settings/Settings";

import TextInputPage from "@base-routes/pages/settings/info/ui/components/inputs/text/Text";
import AlertDisplayPage from "@base-routes/pages/settings/info/ui/components/display/alert/Alert";
import DataDisplayPage from "@base-routes/pages/settings/info/ui/components/display/data/Data";
import TextDisplayPage from "@base-routes/pages/settings/info/ui/components/display/text/Text";

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
        <Route path="/settings/info/ui/components/inputs/file" render={() => <FilePage />} exact />
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
