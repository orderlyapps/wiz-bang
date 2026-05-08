import { TextButtonSection } from "./text-button-section/TextButtonSection";
import { DeleteTextButtonSection } from "./delete-text-button-section/DeleteTextButtonSection";
import { AddIconButtonSection } from "./add-icon-button-section/AddIconButtonSection";
import { CloseIconButtonSection } from "./close-icon-button-section/CloseIconButtonSection";
import { DeleteIconButtonSection } from "./delete-icon-button-section/DeleteIconButtonSection";

export function ButtonContent() {
  return (
    <>
      <TextButtonSection />
      <DeleteTextButtonSection />
      <AddIconButtonSection />
      <CloseIconButtonSection />
      <DeleteIconButtonSection />
    </>
  );
}
