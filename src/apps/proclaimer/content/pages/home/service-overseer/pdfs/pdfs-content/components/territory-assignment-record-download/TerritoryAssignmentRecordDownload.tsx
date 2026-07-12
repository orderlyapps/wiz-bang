import { useState } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import { TerritoryAssignmentRecordPdf } from "../territory-assignment-record-pdf/TerritoryAssignmentRecordPdf";

export function TerritoryAssignmentRecordDownload() {
  const [is_generating, set_is_generating] = useState(false);

  const handle_download = async () => {
    set_is_generating(true);
    try {
      const blob = await pdf(<TerritoryAssignmentRecordPdf />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Territory_Assignment_Record_S-13.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      set_is_generating(false);
    }
  };

  return (
    <IonButton expand="block" fill="outline" onClick={handle_download} disabled={is_generating}>
      {is_generating ? (
        <>
          <IonSpinner name="crescent" style={{ marginRight: 8 }} />
          Generating...
        </>
      ) : (
        "Territory Assignment Record (S-13)"
      )}
    </IonButton>
  );
}
