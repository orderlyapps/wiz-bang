import { useState, useEffect } from "react";
import { CongregationSelectModal } from "./congregation-select-modal/CongregationSelectModal";
import { hasSelectedCongregation } from "@util/app/congregation/utils";

export function CongregationGuard() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!hasSelectedCongregation()) {
      setShowModal(true);
    }
  }, []);

  return <CongregationSelectModal isOpen={showModal} onDismiss={() => setShowModal(false)} />;
}
