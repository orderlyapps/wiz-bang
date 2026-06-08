import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { AssignmentRow } from "../../helper/types";

export function AssignmentCard({ id, week_id, title, color, publisher, assistant }: AssignmentRow) {
  return (
    <LabelValueItem
      label={title}
      value={publisher}
      label_color={color}
      value_2={assistant}
      value_2_color="medium"
      router_link={`/home/clam-overseer/schedule/${week_id}/assignment/${id}`}
    />
  );
}
