import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { SpeakerWeekInfo } from "./components/speaker-week-info/SpeakerWeekInfo";

type ScheduleContentProps = {
  week_id: string;
};

export function ScheduleContent({ week_id }: ScheduleContentProps) {
  return (
    <>
      <WeekNavigation week_id={week_id} />
      <SpeakerWeekInfo week_id={week_id} />
    </>
  );
}
