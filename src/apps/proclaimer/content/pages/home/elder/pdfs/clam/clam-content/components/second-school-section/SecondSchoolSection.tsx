import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { AssignmentRow } from "../assignment-row/AssignmentRow";
import { formatName } from "../../hooks/formatName";
import type { WeekScheduleData } from "../../hooks/useMidweekScheduleData";

const styles = StyleSheet.create({
  heading: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 2,
    color: "#666",
  },
  section: {
    marginBottom: 10,
    fontSize: 10,
  },
});

type SecondSchoolSectionProps = {
  readonly week: WeekScheduleData;
};

export function SecondSchoolSection({ week }: SecondSchoolSectionProps) {
  const { meetingData, assignments } = week;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Second School</Text>

      <AssignmentRow
        assignmentId="chairman_2"
        title="Counselor"
        participant={formatName(assignments.get("chairman_2"))}
      />

      <AssignmentRow
        assignmentId="tgw_bread"
        title={meetingData.mwb_tgw_bread_title ?? "Bible Reading"}
        participant={formatName(assignments.get("school_2_bible_reading"))}
      />

      {meetingData.mwb_ayf_part1 && (
        <AssignmentRow
          assignmentId="ayf_part1"
          title={`${meetingData.mwb_ayf_part1_title ?? meetingData.mwb_ayf_part1}${meetingData.mwb_ayf_part1_time ? ` (${meetingData.mwb_ayf_part1_time} min)` : ""}`}
          participant={formatName(assignments.get("school_2_apply_1"))}
          assistantOrReader={formatName(assignments.get("school_2_assistant_1"))}
          assistantLabel="Assistants"
        />
      )}
      {meetingData.mwb_ayf_part2 && (
        <AssignmentRow
          assignmentId="ayf_part2"
          title={`${meetingData.mwb_ayf_part2_title ?? meetingData.mwb_ayf_part2}${meetingData.mwb_ayf_part2_time ? ` (${meetingData.mwb_ayf_part2_time} min)` : ""}`}
          participant={formatName(assignments.get("school_2_apply_2"))}
          assistantOrReader={formatName(assignments.get("school_2_assistant_2"))}
          assistantLabel="Assistant"
        />
      )}
      {meetingData.mwb_ayf_part3 && (
        <AssignmentRow
          assignmentId="ayf_part3"
          title={`${meetingData.mwb_ayf_part3_title ?? meetingData.mwb_ayf_part3}${meetingData.mwb_ayf_part3_time ? ` (${meetingData.mwb_ayf_part3_time} min)` : ""}`}
          participant={formatName(assignments.get("school_2_apply_3"))}
          assistantOrReader={formatName(assignments.get("school_2_assistant_3"))}
          assistantLabel="Assistant"
        />
      )}
      {meetingData.mwb_ayf_part4 && (
        <AssignmentRow
          assignmentId="ayf_part4"
          title={`${meetingData.mwb_ayf_part4_title ?? meetingData.mwb_ayf_part4}${meetingData.mwb_ayf_part4_time ? ` (${meetingData.mwb_ayf_part4_time} min)` : ""}`}
          participant={formatName(assignments.get("school_2_apply_4"))}
          assistantOrReader={formatName(assignments.get("school_2_assistant_4"))}
          assistantLabel="Assistant"
        />
      )}
    </View>
  );
}
