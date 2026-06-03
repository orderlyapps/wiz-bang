import { useState } from "react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { PublisherSelectModal } from "./publisher-select-modal/PublisherSelectModal";
import {
  getStoredPublisher,
  getPublisherDisplayName,
} from "@proclaimer-shared/publisher/publisherUtils";

export function PublisherSelect() {
  const [showModal, setShowModal] = useState(false);
  const [publisher, setPublisher] = useState(getStoredPublisher);

  const handleSelect = () => {
    setPublisher(getStoredPublisher());
  };

  return (
    <>
      {publisher ? (
        <LabelValueItem label="Personalised for" value={getPublisherDisplayName(publisher)} />
      ) : (
        <ModalSelect
          label="Publisher"
          display_value=""
          placeholder="Select publisher..."
          on_open={() => setShowModal(true)}
        />
      )}
      <PublisherSelectModal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
