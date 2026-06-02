import { useState, useEffect } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { CongregationSelectModal } from "./congregation-select/congregation-select-modal/CongregationSelectModal";
import { hasSelectedCongregation, getStoredCongregation } from "@util/app/congregation/utils";
import { Heading } from "@ui/components/display/text/heading/Heading";

export function HomeContent() {
  const [showModal, setShowModal] = useState(false);
  const [congregation, setCongregation] = useState(getStoredCongregation);

  useEffect(() => {
    if (!hasSelectedCongregation()) {
      setShowModal(true);
    }
  }, []);

  const handleSelect = () => {
    setCongregation(getStoredCongregation());
  };

  return (
    <>
      <Heading size="2xl" bold>
        Welcome to Proclaimer
      </Heading>

      {!congregation && (
        <ModalSelect
          label="Congregation"
          display_value={""}
          placeholder="Select congregation..."
          on_open={() => setShowModal(true)}
        />
      )}

      <CongregationSelectModal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
