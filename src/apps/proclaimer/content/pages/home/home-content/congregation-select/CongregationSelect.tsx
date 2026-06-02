import { useState, useEffect } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { CongregationSelectModal } from "./congregation-select-modal/CongregationSelectModal";
import { hasSelectedCongregation, getStoredCongregation } from "@util/app/congregation/utils";

export function CongregationSelect() {
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
