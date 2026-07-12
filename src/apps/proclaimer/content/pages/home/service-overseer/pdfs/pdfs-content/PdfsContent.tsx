import { TerritoryAssignmentRecordDownload } from "./components/territory-assignment-record-download/TerritoryAssignmentRecordDownload";
import { MapLogDownload } from "./components/map-log-download/MapLogDownload";

export function PdfsContent() {
  return (
    <>
      <TerritoryAssignmentRecordDownload />
      <MapLogDownload />
    </>
  );
}
