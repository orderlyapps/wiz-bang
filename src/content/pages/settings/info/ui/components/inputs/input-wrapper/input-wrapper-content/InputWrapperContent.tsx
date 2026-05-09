import { IonList } from "@ionic/react";
import { EmailInputSection } from "./components/email-input-section/EmailInputSection";
import { NumberInputSection } from "./components/number-input-section/NumberInputSection";
import { PasswordInputSection } from "./components/password-input-section/PasswordInputSection";
import { TextInputSection } from "./components/text-input-section/TextInputSection";

export function InputWrapperContent() {
  return (
    <IonList>
      <TextInputSection />
      <NumberInputSection />
      <EmailInputSection />
      <PasswordInputSection />
    </IonList>
  );
}
