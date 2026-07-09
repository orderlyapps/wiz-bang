import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

type Props = {
  hasPendingChanges: boolean;
  onCloseMenu: () => void;
  onDeselect: () => void;
};

export function FinishedButton({ hasPendingChanges, onCloseMenu, onDeselect }: Props) {
  const handle_click = () => {
    onCloseMenu();
    onDeselect();
  };

  if (hasPendingChanges) {
    return (
      <SaveTextButton
        label="Finished"
        color="medium"
        alert_header="Unsaved Changes"
        alert_message="You have unsaved changes. Are you sure you want to change map?"
        confirm_text="Finish"
        on_click={handle_click}
      />
    );
  }

  return <TextButton label="Finished" color="medium" on_click={handle_click} />;
}
