import { DateInputSection } from "@base-content/pages/settings/info/ui/components/inputs/input-wrapper/input-wrapper-content/components/date-input-section/DateInputSection";
import { EmailInputSection } from "@base-content/pages/settings/info/ui/components/inputs/input-wrapper/input-wrapper-content/components/email-input-section/EmailInputSection";
import { NumberInputSection } from "@base-content/pages/settings/info/ui/components/inputs/input-wrapper/input-wrapper-content/components/number-input-section/NumberInputSection";
import { PasswordInputSection } from "@base-content/pages/settings/info/ui/components/inputs/input-wrapper/input-wrapper-content/components/password-input-section/PasswordInputSection";
import { TextInputSection } from "@base-content/pages/settings/info/ui/components/inputs/input-wrapper/input-wrapper-content/components/text-input-section/TextInputSection";
import { IonList } from "@ionic/react";

export function InputWrapperContent() {
  return (
    <IonList>
      <TextInputSection />
      <NumberInputSection />
      <EmailInputSection />
      <PasswordInputSection />
      <DateInputSection />
    </IonList>
  );
}
