import { useLocalSpeakers } from "@proclaimer-routes/pages/home/speaker/local-speakers/hooks/use-local-speakers/useLocalSpeakers";
import { SpeakerList } from "@proclaimer-routes/pages/home/speaker/shared/components/speaker-list/SpeakerList";

export function LocalSpeakersList() {
  const { local_speakers, is_loading } = useLocalSpeakers();

  return (
    <SpeakerList
      speakers={local_speakers}
      empty_label="No local speakers"
      is_loading={is_loading}
    />
  );
}
