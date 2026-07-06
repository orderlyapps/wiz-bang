import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { publisherCollection } from "@shared/database/collections/publisher";
import { groupCollection } from "@shared/database/collections/group";
import { useLiveQuery } from "@tanstack/react-db";
import { getStoredCongregation } from "@util/app/congregation/utils";

export function PublishersContent() {
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const { data: groups_data } = useLiveQuery((q) => q.from({ g: groupCollection }));
  const permissions = usePermissions();

  const eldersCount =
    publishers?.filter(
      (publisher) =>
        publisher.standing === "elder" && publisher.type !== "speaker" && !publisher.archived_at,
    ).length ?? 0;
  const ministerialServantsCount =
    publishers?.filter(
      (publisher) =>
        publisher.standing === "ministerial_servant" &&
        publisher.type !== "speaker" &&
        !publisher.archived_at,
    ).length ?? 0;
  const regularPioneersCount =
    publishers?.filter(
      (publisher) => publisher.type === "regular_pioneer" && !publisher.archived_at,
    ).length ?? 0;
  const congregation_id = getStoredCongregation()?.id;
  const groupsCount = groups_data?.filter((g) => g.congregation_id === congregation_id).length ?? 0;

  const can_see_locations =
    permissions.has_elder || permissions.has_congregation_admin || permissions.is_super_admin;

  return (
    <IonList>
      {can_see_locations && (
        <>
          <NavItem label="Locations" to="/publishers/locations" />
        </>
      )}
      <NavItem label={`Elders (${eldersCount})`} to="/publishers/elders" />
      <NavItem
        label={`Ministerial Servants (${ministerialServantsCount})`}
        to="/publishers/ministerial-servants"
      />
      <NavItem
        label={`Regular Pioneers (${regularPioneersCount})`}
        to="/publishers/regular-pioneers"
      />
      <NavItem label={`Groups (${groupsCount})`} to="/publishers/groups" />
    </IonList>
  );
}
