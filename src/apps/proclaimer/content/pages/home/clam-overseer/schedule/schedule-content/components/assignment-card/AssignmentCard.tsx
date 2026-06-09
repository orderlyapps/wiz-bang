import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { AssignmentRow } from "../../helper/types";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";

const sectionLabels = ["main_hall_label", "second_school_label"];

export function AssignmentCard({ id, week_id, title, color, publisher, assistant }: AssignmentRow) {
  const permissions = usePermissions();

  const can_edit = permissions.has_clam_overseer;

  return (
    <LabelValueItem
      label={title}
      value={publisher}
      label_color={color}
      label_size={sectionLabels.includes(id) ? "lg" : "sm"}
      value_2={assistant}
      value_2_color="medium"
      router_link={
        can_edit ? `/home/clam-overseer/schedule/${week_id}/assignment/${id}` : undefined
      }
    />
  );
}
