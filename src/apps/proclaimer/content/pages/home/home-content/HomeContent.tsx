import { LogoIcon } from "@shared/icons/logo/LogoIcon";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { Heading } from "@ui/components/display/text/heading/Heading";

export function HomeContent() {
  const publisher = useStoredPublisher();

  return (
    <>
      <div className="ion-text-center ion-padding">
        <LogoIcon size="2xl" color="primary" />
        <div className="ion-text-center ion-margin">
          <Heading size="2xl" bold>
            Welcome {publisher ? getPublisherDisplayName(publisher) : "to Proclaimer"}
          </Heading>
        </div>
      </div>
    </>
  );
}
