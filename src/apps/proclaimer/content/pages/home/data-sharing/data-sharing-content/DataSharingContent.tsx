import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";

export function DataSharingContent() {
  return (
    <>
      <TextButton label="Send" />
      <Space />
      <TextButton label="Receive" />
    </>
  );
}
