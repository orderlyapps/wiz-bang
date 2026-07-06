import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  header: {
    marginBottom: 3,
    borderBottom: "1pt solid #333",
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
  },
});

type SchedulePdfHeaderProps = {
  readonly scheduleName: string;
  readonly monthDate: string | Date;
};

export function SchedulePdfHeader({ scheduleName, monthDate }: SchedulePdfHeaderProps) {
  const monthLabel = format(new Date(monthDate), "MMMM");

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {scheduleName} Schedule for {monthLabel}
      </Text>
    </View>
  );
}
