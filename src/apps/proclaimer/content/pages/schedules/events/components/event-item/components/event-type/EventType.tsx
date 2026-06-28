import { Body } from "@ui/components/display/text/body/Body";

interface EventTypeProps {
  label: string;
}

export function EventType({ label }: EventTypeProps) {
  return <Body>{label}</Body>;
}
