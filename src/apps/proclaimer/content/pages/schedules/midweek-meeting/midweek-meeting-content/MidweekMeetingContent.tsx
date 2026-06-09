import { ScheduleContent } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/ScheduleContent";

interface MidweekMeetingContentProps {
  week_id: string;
}

export function MidweekMeetingContent({ week_id }: MidweekMeetingContentProps) {
  return <ScheduleContent week_id={week_id} />;
}
