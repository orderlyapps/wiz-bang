import { LogoIcon } from "@shared/icons/logo/LogoIcon";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";

export function HomeContent() {
  const publisher = useStoredPublisher();
  const permissions = usePermissions();
  const canSeeAll = permissions.has_congregation_admin || permissions.is_super_admin;

  return (
    <>
      <Space />
      <div className="ion-text-center ion-padding">
        <LogoIcon size="4xl" color="primary" />
        <div className="ion-text-center ion-margin">
          {publisher && (
            <Heading size="xl" color="primary">
              <div> Welcome </div>
              <div>{getPublisherDisplayName(publisher, "first_last")}</div>
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
      {permissions.is_authenticated && publisher && (
        <IonList>
          {permissions.is_super_admin && <NavItem label="Super Admin" to="/home/super-admin" />}

          {(canSeeAll || permissions.has_congregation_admin) && (
            <NavItem label="Congregation Admin" to="/home/congregation-admin" />
          )}

          {(canSeeAll || permissions.has_cobe) && <NavItem label="COBE" to="/home/cobe" />}

          {(canSeeAll || permissions.has_secretary) && (
            <NavItem label="Secretary" to="/home/secretary" />
          )}

          {(canSeeAll || permissions.has_service_overseer) && (
            <NavItem label="Service Overseer" to="/home/service-overseer" />
          )}

          {(canSeeAll || permissions.has_elder) && <NavItem label="Elder" to="/home/elder" />}

          {(canSeeAll || permissions.has_clam_overseer) && (
            <NavItem label="CLAM Overseer" to="/home/clam-overseer" />
          )}

          {(canSeeAll || permissions.has_reports) && <NavItem label="Reports" to="/home/reports" />}

          {(canSeeAll || permissions.has_territory_servant) && (
            <NavItem label="Territory Servant" to="/home/territory-servant" />
          )}

          {(canSeeAll || permissions.has_av_overseer) && (
            <NavItem label="Audio Video" to="/home/av-overseer" />
          )}

          {(canSeeAll || permissions.has_cleaning) && (
            <NavItem label="Cleaning" to="/home/cleaning" />
          )}

          {(canSeeAll || permissions.has_speaker) && (
            <NavItem label="Public Talks" to="/home/speaker" />
          )}

          {(canSeeAll || permissions.has_weekend) && (
            <NavItem label="Weekend Meeting" to="/home/weekend" />
          )}
        </IonList>
      )}
    </>
  );
}
