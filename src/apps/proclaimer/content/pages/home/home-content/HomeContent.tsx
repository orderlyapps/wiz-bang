import { LogoIcon } from "@shared/icons/logo/LogoIcon";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { PermissionGate } from "@shared/permissions";
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
          <PermissionGate
            feature="cleaning"
            context={{ congregation_id: publisher?.congregation_id }}
          >
            <NavItem label="Cleaning" to="/home/cleaning" />
          </PermissionGate>

          <PermissionGate
            feature="reports"
            context={{ congregation_id: publisher?.congregation_id }}
          >
            <NavItem label="Reports" to="/home/reports" />
          </PermissionGate>

          <PermissionGate
            feature="secretary"
            context={{ congregation_id: publisher?.congregation_id }}
          >
            <NavItem label="Secretary" to="/home/secretary" />
          </PermissionGate>

          <PermissionGate
            feature="congregation_admin"
            context={{ congregation_id: publisher?.congregation_id }}
          >
            <NavItem label="Congregation Admin" to="/home/congregation-admin" />
          </PermissionGate>

          <PermissionGate feature="super_admin">
            <NavItem label="Super Admin" to="/home/super-admin" />
          </PermissionGate>
        </IonList>
      )}
    </>
  );
}
