import { useLiveQuery } from "@tanstack/react-db";
import { and, eq } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { outlineCollection } from "@shared/database/collections/outline";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

type SpeakerWeekInfoProps = {
  week_id: string;
};

export function SpeakerWeekInfo({ week_id }: SpeakerWeekInfoProps) {
  const publisher = useStoredPublisher();
  const congregation_id = publisher?.congregation_id ?? "";

  const { data: assignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p!.id))
        .leftJoin({ o: outlineCollection }, ({ sa, o }) => eq(sa.outline_id, o!.id))
        .where(({ sa }) => and(eq(sa.week_id, week_id), eq(sa.congregation_id, congregation_id)))
        .select(({ sa, p, o }) => ({
          speaker_id: sa.speaker_id,
          outline_id: sa.outline_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
          theme: o?.theme,
        })),
    [week_id, congregation_id],
  );

  const assignment = assignments?.[0];
  const speaker_name =
    assignment?.first_name && assignment?.last_name
      ? getPublisherDisplayName({
          first_name: assignment.first_name,
          last_name: assignment.last_name,
          display_name: assignment.display_name,
        })
      : undefined;

  return (
    <>
      {speaker_name && <LabelValueItem label="Speaker" value={speaker_name} />}
      {assignment?.outline_id && (
        <LabelValueItem label="Outline ID" value={assignment.outline_id} />
      )}
      {assignment?.theme && <LabelValueItem label="Theme" value={assignment.theme} />}
      {!assignment && (
        <LabelValueItem
          label="Speaker"
          value="No speaker assigned for this week"
          value_color="medium"
        />
      )}
    </>
  );
}
