import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { midweekParticipationCollection } from "@shared/database/collections/midweek-participation";
import type { MidweekParticipation } from "@shared/database/schemas/midweek-participation";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export interface ParticipantPublisher {
  participant_id: string;
  publisher: Publisher;
  display_name: string;
}

export function useParticipantPublishers(
  participation_id: MidweekParticipation["participation_id"],
) {
  const { data: allParticipations, isLoading: isLoadingParticipations } = useLiveQuery((q) =>
    q.from({ mp: midweekParticipationCollection }),
  );

  const { data: publishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  const isLoading = isLoadingParticipations || isLoadingPublishers;

  const participations = (allParticipations ?? []).filter(
    (p) => p.participation_id === participation_id,
  );

  const participantPublishers: ParticipantPublisher[] = participations
    .map((participation) => {
      const publisher = (publishers ?? []).find((p) => p.id === participation.participant_id);
      if (!publisher) return null;
      return {
        participant_id: participation.participant_id,
        publisher,
        display_name: getPublisherDisplayName(publisher),
      };
    })
    .filter((pp) => pp !== null)
    .sort((a, b) => a.display_name.localeCompare(b.display_name));

  return { participantPublishers, isLoading };
}
