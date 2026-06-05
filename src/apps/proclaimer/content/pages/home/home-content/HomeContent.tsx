import { LogoIcon } from "@shared/icons/logo/LogoIcon";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { useAuthSession } from "@util/app/auth/useAuthSession";

export function HomeContent() {
  const publisher = useStoredPublisher();
  const session = useAuthSession();

  return (
    <>
      <Space />
      <div className="ion-text-center ion-padding">
        <LogoIcon size="5xl" color="primary" />
        <div className="ion-text-center ion-margin">
          {publisher && (
            <Heading size="xl" bold color="primary">
              <div> Welcome </div>
              <div>{getPublisherDisplayName(publisher)}</div>
            </Heading>
          )}
          {!publisher && (
            <Heading size="2xl" bold color="primary">
              Welcome to Proclaimer
            </Heading>
          )}
        </div>
      </div>
      <Space size="lg" />
      {session && publisher && (
        <IonList>
          <NavItem label="Cleaning" to="/home/cleaning" />

          <NavItem label="Reports" to="/home/reports" />

          <NavItem label="Secretary" to="/home/secretary" />

          <NavItem label="Elder" to="/home/elder" />

          <NavItem label="CLAM Overseer" to="/home/clam-overseer" />

          <NavItem label="Service Overseer" to="/home/service-overseer" />

          <NavItem label="COBE" to="/home/cobe" />

          <NavItem label="Territory Servant" to="/home/territory-servant" />

          <NavItem label="AV Overseer" to="/home/av-overseer" />

          <NavItem label="Congregation Admin" to="/home/congregation-admin" />

          <NavItem label="Super Admin" to="/home/super-admin" />
        </IonList>
      )}
    </>
  );
}
