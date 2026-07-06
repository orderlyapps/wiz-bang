import { JW_BROWN, JW_RED, JW_SLATE } from "@ui/colors/jwColors";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 0.5,
  },
  title: {
    width: "50%",
  },
  participant: {
    width: "20%",
    textAlign: "right",
  },
  assistant: {
    width: "20%",
    color: "#777",
  },
  assistantLabel: {
    width: "10%",
    textAlign: "right",
    color: "#777",
    paddingRight: 5,
  },
  slate: {
    color: JW_SLATE.light.base,
  },
  brown: {
    color: JW_BROWN.light.base,
  },
  red: {
    color: JW_RED.light.base,
  },
  grey: {
    color: "#6b7280",
  },
});

type AssignmentRowProps = {
  readonly assignmentId: string;
  readonly title: string;
  readonly participant: string;
  readonly assistantOrReader?: string;
  readonly assistantLabel?: string;
  readonly showAssistantLabel?: boolean;
};

function getColorStyle(assignmentId: string): typeof styles.slate {
  if (assignmentId.includes("tgw")) return styles.slate;
  if (assignmentId.includes("ayf")) return styles.brown;
  if (assignmentId.includes("lc")) return styles.red;
  return styles.grey;
}

export function AssignmentRow({
  assignmentId,
  title,
  participant,
  assistantOrReader,
  assistantLabel = "Assistants",
  showAssistantLabel = false,
}: AssignmentRowProps) {
  const colorStyle = getColorStyle(assignmentId);

  const shouldShowLabel =
    showAssistantLabel || assignmentId === "ayf_part1" || assignmentId === "lc_cbs";

  return (
    <View style={styles.row}>
      <Text style={[styles.title, colorStyle]}>{title}</Text>
      <Text style={styles.assistantLabel}>
        {shouldShowLabel && assistantOrReader && (
          <Text style={styles.assistant}>{assistantLabel}:</Text>
        )}
      </Text>
      <Text style={styles.assistant}>{assistantOrReader}</Text>
      <Text style={styles.participant}>{participant}</Text>
    </View>
  );
}
