import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { useAssignments } from "@proclaimer-content/pages/home/assignments/useAssignments";
import { AssignmentItem } from "@proclaimer-content/pages/home/assignments/components/assignment-item/AssignmentItem";

export function HomeAssignments() {
  const { assignments } = useAssignments();
  const upcoming_assignments = assignments.slice(0, 3);

  if (!upcoming_assignments.length) {
    return null;
  }

  return (
    <IonAccordionGroup>
      <IonAccordion value="assignments">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Assignments</Heading>
          </IonLabel>
        </IonItem>
        <div slot="content">
          <IonList>
            {upcoming_assignments.map((assignment) => (
              <AssignmentItem key={assignment.id} assignment={assignment} />
            ))}
          </IonList>
          <NavItem label="See more" to="/home/assignments" />
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
