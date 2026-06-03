import { IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { PublisherSelectContent } from "./publisher-select-content/PublisherSelectContent";

interface PublisherSelectModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect?: () => void;
}

export function PublisherSelectModal({ isOpen, onDismiss, onSelect }: PublisherSelectModalProps) {
  const handleSelect = () => {
    onSelect?.();
    onDismiss();
  };

  return (
    <ResponsiveModal isOpen={isOpen}>
      <IonContent className="ion-padding content-wide">
        <PublisherSelectContent onSelect={handleSelect} />
      </IonContent>
    </ResponsiveModal>
  );
}
