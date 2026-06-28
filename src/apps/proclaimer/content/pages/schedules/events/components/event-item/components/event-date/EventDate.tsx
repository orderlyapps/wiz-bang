import { Body } from "@ui/components/display/text/body/Body";
import { formatEventDate } from "../../../../formatEventDate";

interface EventDateProps {
  startDate: string;
  endDate?: string | null;
}

export function EventDate({ startDate, endDate }: EventDateProps) {
  return <Body bold>{formatEventDate(startDate, endDate)}</Body>;
}
