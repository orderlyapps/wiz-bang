import { useLiveQuery } from "@tanstack/react-db";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { groupCollection } from "@shared/database/collections/group";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { getStoredCongregation } from "@util/app/congregation/utils";

export function GroupsContent() {
  const congregation_id = getStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  if (isLoading) {
    return <Spinner />;
  }

  const groups = (data ?? []).filter((g) => g.congregation_id === congregation_id);

  return (
    <>
      <IonItem lines="none">
        <IonLabel>
          <Body>Total Groups</Body>
        </IonLabel>
        <div slot="end">
          <Body color="medium">{groups.length}</Body>
        </div>
      </IonItem>

      {groups.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <Body color="medium">No groups found.</Body>
        </div>
      ) : (
        <IonList>
          <MultiColumnList
            items={groups}
            get_id={(g) => g.id ?? ""}
            gap="sm"
            render_item={(g) => (
              <IonItem routerLink={`/home/secretary/groups/${g.id}`} button>
                {g.name}
              </IonItem>
            )}
          />
        </IonList>
      )}
    </>
  );
}
