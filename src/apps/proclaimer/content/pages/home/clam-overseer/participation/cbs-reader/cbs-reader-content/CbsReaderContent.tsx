import { Heading } from "@ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "@proclaimer-shared/participation/components/participant-publishers-list/ParticipantPublishersList";

export function CbsReaderContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        CBS Reader
      </Heading>
      <ParticipantPublishersList participation_id="cbs_reader" />
    </div>
  );
}
