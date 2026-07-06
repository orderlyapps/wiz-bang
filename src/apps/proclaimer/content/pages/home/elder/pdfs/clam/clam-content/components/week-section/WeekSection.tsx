import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { AssignmentRow } from "../assignment-row/AssignmentRow";
import { SecondSchoolSection } from "../second-school-section/SecondSchoolSection";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { formatName } from "../../hooks/formatName";
import type { WeekScheduleData } from "../../hooks/useMidweekScheduleData";

const styles = StyleSheet.create({
  weekSection: {
    marginBottom: 2,
    borderBottom: "1pt solid #ddd",
    paddingBottom: 2,
    fontSize: 10,
  },
  weekDate: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#333",
  },
  section: {
    marginBottom: 0,
    fontSize: 10,
  },
});

export function WeekSection({ week }: { week: WeekScheduleData }) {
  const { meetingData, assignments } = week;
  const hasSecondSchool = assignments.has("chairman_2");
  const dateLabel = getTheocraticWeekLabel(week.weekId);

  return (
    <View style={styles.weekSection}>
      <Text style={styles.weekDate}>{dateLabel}</Text>

      <View style={styles.section}>
        <AssignmentRow
          assignmentId="chairman_1"
          title="Chairman"
          participant={formatName(assignments.get("chairman_1"))}
        />
        <AssignmentRow
          assignmentId="prayer_1"
          title="Opening Prayer"
          participant={formatName(assignments.get("prayer_1"))}
        />
        <AssignmentRow
          assignmentId="tgw_talk"
          title={meetingData.mwb_tgw_talk_title ?? "Talk"}
          participant={formatName(assignments.get("treasures"))}
        />
        <AssignmentRow
          assignmentId="tgw_gems"
          title={meetingData.mwb_tgw_gems_title ?? "Spiritual Gems"}
          participant={formatName(assignments.get("gems"))}
        />
        <AssignmentRow
          assignmentId="tgw_bread"
          title={meetingData.mwb_tgw_bread_title ?? "Bible Reading"}
          participant={formatName(assignments.get("school_1_bible_reading"))}
        />
      </View>

      <View style={styles.section}>
        {meetingData.mwb_ayf_part1 && (
          <AssignmentRow
            assignmentId="ayf_part1"
            title={`${meetingData.mwb_ayf_part1_title ?? meetingData.mwb_ayf_part1}${meetingData.mwb_ayf_part1_time ? ` (${meetingData.mwb_ayf_part1_time} min)` : ""}`}
            participant={formatName(assignments.get("school_1_apply_1"))}
            assistantOrReader={formatName(assignments.get("school_1_assistant_1"))}
            assistantLabel="Assistants"
          />
        )}
        {meetingData.mwb_ayf_part2 && (
          <AssignmentRow
            assignmentId="ayf_part2"
            title={`${meetingData.mwb_ayf_part2_title ?? meetingData.mwb_ayf_part2}${meetingData.mwb_ayf_part2_time ? ` (${meetingData.mwb_ayf_part2_time} min)` : ""}`}
            participant={formatName(assignments.get("school_1_apply_2"))}
            assistantOrReader={formatName(assignments.get("school_1_assistant_2"))}
            assistantLabel="Assistant"
          />
        )}
        {meetingData.mwb_ayf_part3 && (
          <AssignmentRow
            assignmentId="ayf_part3"
            title={`${meetingData.mwb_ayf_part3_title ?? meetingData.mwb_ayf_part3}${meetingData.mwb_ayf_part3_time ? ` (${meetingData.mwb_ayf_part3_time} min)` : ""}`}
            participant={formatName(assignments.get("school_1_apply_3"))}
            assistantOrReader={formatName(assignments.get("school_1_assistant_3"))}
            assistantLabel="Assistant"
          />
        )}
        {meetingData.mwb_ayf_part4 && (
          <AssignmentRow
            assignmentId="ayf_part4"
            title={`${meetingData.mwb_ayf_part4_title ?? meetingData.mwb_ayf_part4}${meetingData.mwb_ayf_part4_time ? ` (${meetingData.mwb_ayf_part4_time} min)` : ""}`}
            participant={formatName(assignments.get("school_1_apply_4"))}
            assistantOrReader={formatName(assignments.get("school_1_assistant_4"))}
            assistantLabel="Assistant"
          />
        )}
      </View>

      {hasSecondSchool && <SecondSchoolSection week={week} />}

      <View style={styles.section}>
        <AssignmentRow
          assignmentId="lc_part1"
          title={meetingData.mwb_lc_part1_title ?? meetingData.mwb_lc_part1}
          participant={formatName(assignments.get("living_1"))}
        />
        {meetingData.mwb_lc_part2 && (
          <AssignmentRow
            assignmentId="lc_part2"
            title={meetingData.mwb_lc_part2_title ?? meetingData.mwb_lc_part2}
            participant={formatName(assignments.get("living_2"))}
          />
        )}
        <AssignmentRow
          assignmentId="lc_cbs"
          title={meetingData.mwb_lc_cbs_title ?? "Congregation Bible Study"}
          participant={formatName(assignments.get("cbs_conductor"))}
          assistantOrReader={formatName(assignments.get("cbs_reader"))}
          assistantLabel="Reader"
        />
      </View>

      <AssignmentRow
        assignmentId="prayer_2"
        title="Closing Prayer"
        participant={formatName(assignments.get("prayer_2"))}
      />
    </View>
  );
}
