// import { LogoIcon } from "@shared/icons/logo";
import { LogoIcon } from "@shared/icons/logo/LogoIcon";
import { Heading } from "@ui/components/display/text/heading/Heading";

export function HomeContent() {
  return (
    <>
      <div className="ion-text-center ion-padding">
        <LogoIcon size="2xl" color="primary" />
      </div>
      <Heading size="2xl" bold className="ion-text-center">
        Welcome to Proclaimer
      </Heading>
    </>
  );
}
