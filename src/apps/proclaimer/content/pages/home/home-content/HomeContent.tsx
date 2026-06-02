import { Heading } from "@ui/components/display/text/heading/Heading";
import { CongregationSelect } from "./congregation-select/CongregationSelect";

export function HomeContent() {
  return (
    <>
      <Heading size="2xl" bold>
        Welcome to Proclaimer
      </Heading>

      <CongregationSelect />
    </>
  );
}
