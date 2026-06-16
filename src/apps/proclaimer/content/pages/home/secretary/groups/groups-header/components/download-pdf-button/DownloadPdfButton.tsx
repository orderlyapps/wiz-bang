import { useLiveQuery } from "@tanstack/react-db";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IonButton, IonIcon } from "@ionic/react";
import { documentOutline } from "ionicons/icons";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { GroupsPdf } from "../groups-pdf/GroupsPdf";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Group } from "@shared/database/schemas/group";

interface DownloadPdfButtonProps {
  slot?: string;
}

export function DownloadPdfButton({ slot }: DownloadPdfButtonProps) {
  const congregation = getStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: groups_data } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  const { data: publishers_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const groups = (groups_data ?? []).filter(
    (g) => g.congregation_id === congregation_id,
  ) as Group[];
  const publishers = (publishers_data ?? []).filter(
    (p) => p.congregation_id === congregation_id,
  ) as Publisher[];

  if (groups.length === 0) {
    return null;
  }

  const file_name = congregation?.name
    ? `${congregation.name.replace(/\s+/g, "_")}_Groups.pdf`
    : "Field_Service_Groups.pdf";

  return (
    <PDFDownloadLink
      document={
        <GroupsPdf groups={groups} publishers={publishers} congregation_name={congregation?.name} />
      }
      fileName={file_name}
    >
      {({ loading }) => (
        <IonButton slot={slot} fill="clear" disabled={loading}>
          <IonIcon icon={documentOutline} slot="start" />
          {loading ? "Generating..." : "PDF"}
        </IonButton>
      )}
    </PDFDownloadLink>
  );
}
