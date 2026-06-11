import { useState } from "react";
import {
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonLabel,
  IonItemDivider,
} from "@ionic/react";
import { PublisherList } from "../publisher-list/PublisherList";
import { PublisherSelectModal } from "../publisher-select-modal/PublisherSelectModal";
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

type SelectionMode = "assignee" | "assistant";

export function PublisherSelector({
  publishers,
  assignment,
  assistantId,
  assistantAssignment,
  onSelectAssignee,
  onSelectAssistant,
}: PublisherSelectorProps) {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [selected_publisher, set_selected_publisher] = useState<Publisher | undefined>();
  const [selection_mode, set_selection_mode] = useState<SelectionMode>("assignee");

  function handleSelectPublisher(publisher_id: string, mode: SelectionMode) {
    const publisher = publishers.find((p) => p.id === publisher_id);
    set_selected_publisher(publisher);
    set_selection_mode(mode);
    set_is_modal_open(true);
  }

  function handleConfirm() {
    if (!selected_publisher?.id) return;

    if (selection_mode === "assignee") {
      onSelectAssignee(selected_publisher.id);
    } else {
      onSelectAssistant(selected_publisher.id);
    }
  }

  function handleDismiss() {
    set_is_modal_open(false);
  }

  if (!assistantId) {
    return (
      <>
        <PublisherList
          publishers={publishers}
          selected_id={assignment?.participant_id}
          on_select={(id) => handleSelectPublisher(id, "assignee")}
        />
        <PublisherSelectModal
          is_open={is_modal_open}
          publisher={selected_publisher}
          on_dismiss={handleDismiss}
          on_confirm={handleConfirm}
        />
      </>
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
            on_select={(id) => handleSelectPublisher(id, "assignee")}
          />
        </IonSegmentContent>
        <IonSegmentContent id="assistant">
          <PublisherList
            publishers={publishers}
            selected_id={assistantAssignment?.participant_id}
            on_select={(id) => handleSelectPublisher(id, "assistant")}
          />
        </IonSegmentContent>
      </IonSegmentView>
      <PublisherSelectModal
        is_open={is_modal_open}
        publisher={selected_publisher}
        on_dismiss={handleDismiss}
        on_confirm={handleConfirm}
      />
    </>
  );
}
