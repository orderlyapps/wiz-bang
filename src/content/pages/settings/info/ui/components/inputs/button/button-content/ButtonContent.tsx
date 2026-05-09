import { TextButtonSection } from "./text-button-section/TextButtonSection";
import { DeleteTextButtonSection } from "./delete-text-button-section/DeleteTextButtonSection";
import { SaveTextButtonSection } from "./save-text-button-section/SaveTextButtonSection";
import { AddIconButtonSection } from "./add-icon-button-section/AddIconButtonSection";
import { CloseIconButtonSection } from "./close-icon-button-section/CloseIconButtonSection";
import { DeleteIconButtonSection } from "./delete-icon-button-section/DeleteIconButtonSection";
import { SaveIconButtonSection } from "./save-icon-button-section/SaveIconButtonSection";
import { EditIconButtonSection } from "./edit-icon-button-section/EditIconButtonSection";
import { SettingsIconButtonSection } from "./settings-icon-button-section/SettingsIconButtonSection";
import { InfoIconButtonSection } from "./info-icon-button-section/InfoIconButtonSection";

export function ButtonContent() {
  return (
    <>
      <TextButtonSection />
      <DeleteTextButtonSection />
      <SaveTextButtonSection />
      <AddIconButtonSection />
      <CloseIconButtonSection />
      <DeleteIconButtonSection />
      <SaveIconButtonSection />
      <EditIconButtonSection />
      <SettingsIconButtonSection />
      <InfoIconButtonSection />
    </>
  );
}
