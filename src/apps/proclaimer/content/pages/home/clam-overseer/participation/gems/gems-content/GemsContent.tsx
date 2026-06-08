import { Heading } from "@ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "@proclaimer-shared/participation/components/participant-publishers-list/ParticipantPublishersList";

export function GemsContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Gems
      </Heading>
      <ParticipantPublishersList participation_id="gems" />
    </div>
  );
}
