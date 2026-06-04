import { LogoIcon } from "@shared/icons/logo/LogoIcon";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

export function HomeContent() {
  const publisher = useStoredPublisher();

  return (
    <>
      <Space size="2xl" />
      <div className="ion-text-center ion-padding">
        <LogoIcon size="5xl" color="primary" />
        <div className="ion-text-center ion-margin">
          <Heading size="2xl" bold>
            Welcome {publisher ? getPublisherDisplayName(publisher) : "to Proclaimer"}
          </Heading>
        </div>
      </div>
    </>
  );
}
