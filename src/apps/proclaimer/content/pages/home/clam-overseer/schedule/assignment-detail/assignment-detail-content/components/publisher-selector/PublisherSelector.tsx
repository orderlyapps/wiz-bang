import {
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonLabel,
  IonItemDivider,
} from "@ionic/react";
import { PublisherList } from "../publisher-list/PublisherList";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";

interface PublisherSelectorProps {
  publishers: Publisher[];
  assignment: MidweekAssignment | undefined;
  assistantId: string | undefined;
  assistantAssignment: MidweekAssignment | undefined;
  onSelectAssignee: (publisher_id: string) => void;
  onSelectAssistant: (publisher_id: string) => void;
}

export function PublisherSelector({
  publishers,
  assignment,
  assistantId,
  assistantAssignment,
  onSelectAssignee,
  onSelectAssistant,
}: PublisherSelectorProps) {
  if (!assistantId) {
    return (
      <PublisherList
        publishers={publishers}
        selected_id={assignment?.participant_id}
        on_select={onSelectAssignee}
      />
    );
  }

  const assistantLabel = assistantId === "cbs_reader" ? "Reader" : "Assistant";

  return (
    <>
      <IonItemDivider sticky style={{ paddingBlock: "1rem" }}>
        <IonSegment value="assignee">
          <IonSegmentButton value="assignee" contentId="assignee">
            <IonLabel>Assignee</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="assistant" contentId="assistant">
            <IonLabel>{assistantLabel}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonItemDivider>
      <IonSegmentView>
        <IonSegmentContent id="assignee">
          <PublisherList
            publishers={publishers}
            selected_id={assignment?.participant_id}
            on_select={onSelectAssignee}
          />
        </IonSegmentContent>
        <IonSegmentContent id="assistant">
          <PublisherList
            publishers={publishers}
            selected_id={assistantAssignment?.participant_id}
            on_select={onSelectAssistant}
          />
        </IonSegmentContent>
      </IonSegmentView>
    </>
  );
}
