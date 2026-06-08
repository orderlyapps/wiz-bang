import { Heading } from "@ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "@proclaimer-shared/participation/components/participant-publishers-list/ParticipantPublishersList";

export function ChairmanContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Chairman
      </Heading>
      <ParticipantPublishersList participation_id="chairman" />
    </div>
  );
}
