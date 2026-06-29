import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { useAssignments } from "../useAssignments";
import { AssignmentItem } from "../components/assignment-item/AssignmentItem";

export function AssignmentsContent() {
  const { assignments } = useAssignments();

  if (!assignments.length) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel>
            <Body>No assignments</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <>
      <IonList>
        {assignments.map((assignment) => (
          <AssignmentItem key={assignment.id} assignment={assignment} />
        ))}
      </IonList>
      <Space />
    </>
  );
}
