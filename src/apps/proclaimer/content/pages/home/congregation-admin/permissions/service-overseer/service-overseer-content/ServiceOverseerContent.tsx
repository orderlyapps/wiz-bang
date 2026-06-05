import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { serviceOverseerPermissionCollection } from "@shared/database/collections/service-overseer-permission";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal";

interface ServiceOverseerContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function ServiceOverseerContent({
  show_add_modal,
  on_dismiss_add_modal,
}: ServiceOverseerContentProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: permissions } = useLiveQuery((q) =>
    q.from({ sp: serviceOverseerPermissionCollection }),
  );
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const congregation_permissions = permissions.filter(
    (sp) => sp.congregation_id === congregation_id,
  );

  const permitted_publishers = Object.values(
    congregation_permissions
      .map((sp) => {
        const publisher = publishers.find((p) => p.auth_id === sp.auth_user_id);
        if (!publisher) return null;
        return {
          id: publisher.id,
          permission_id: sp.id,
          first_name: publisher.first_name,
          last_name: publisher.last_name,
          display_name: publisher.display_name,
        };
      })
      .filter((p) => p !== null)
      .reduce<
        Record<
          string,
          {
            id: string | undefined;
            permission_id: string | undefined;
            first_name: string | undefined;
            last_name: string | undefined;
            display_name: string | null | undefined;
          }
        >
      >((acc, p) => {
        const key = p.id ?? "";
        if (!acc[key] || p.permission_id) acc[key] = p;
        return acc;
      }, {}),
  ).sort((a, b) => (a.last_name ?? "").localeCompare(b.last_name ?? ""));

  const handleDelete = (permission_id: string) => {
    serviceOverseerPermissionCollection.delete(permission_id);
  };

  return (
    <>
      <AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />
      <IonList inset>
        {permitted_publishers.length === 0 ? (
          <IonItem>
            <IonLabel>No publishers with service overseer permission.</IonLabel>
          </IonItem>
        ) : (
          permitted_publishers.map((p) => (
            <IonItem key={p.id}>
              <IonLabel>{`${p.display_name ?? p.first_name} ${p.last_name}`}</IonLabel>
              <DeleteIconButton on_click={() => p.permission_id && handleDelete(p.permission_id)} />
            </IonItem>
          ))
        )}
      </IonList>
    </>
  );
}
