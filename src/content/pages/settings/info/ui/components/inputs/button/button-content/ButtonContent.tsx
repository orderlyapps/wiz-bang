import { TextButtonSection } from "./text-button-section/TextButtonSection";
import { DeleteTextButtonSection } from "./delete-text-button-section/DeleteTextButtonSection";
import { SaveTextButtonSection } from "./save-text-button-section/SaveTextButtonSection";
import { AddIconButtonSection } from "./add-icon-button-section/AddIconButtonSection";
import { CloseIconButtonSection } from "./close-icon-button-section/CloseIconButtonSection";
import { DeleteIconButtonSection } from "./delete-icon-button-section/DeleteIconButtonSection";
import { SaveIconButtonSection } from "./save-icon-button-section/SaveIconButtonSection";

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
    </>
  );
}
