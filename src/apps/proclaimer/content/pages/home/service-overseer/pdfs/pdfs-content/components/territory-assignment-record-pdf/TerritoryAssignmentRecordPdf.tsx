import { StyleSheet } from "@react-pdf/renderer";
import { PdfDocument } from "@util/vendor/react-pdf/PdfDocument";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import { PdfText } from "@util/vendor/react-pdf/PdfText";
import { PdfView } from "@util/vendor/react-pdf/PdfView";

// Shared styles used by both header and body rows
const shared = StyleSheet.create({
  // Footer: fixed at bottom of every page
  footer: { position: "absolute", bottom: 24, left: 30, right: 30 },
  // Table outer container: bold border, fills remaining vertical space
  // marginBottom reserves space for the fixed footer
  table: { borderWidth: 3, borderColor: "#000", flex: 1, marginTop: 2, marginBottom: 30 },
  // First column: bold right border separating it from columns 2-5
  firstCol: { flex: 1, borderRightWidth: 3, borderRightColor: "#000" },
  // First column, left sub-column ("Terr. no."): thin right divider
  firstColSub: { flex: 1, borderRightWidth: 0.5, borderRightColor: "#000", padding: 4 },
  // First column, right sub-column ("Last date completed*")
  firstColSubLast: { flex: 2, padding: 4 },
  // Columns 2-4: bold right border
  rightCol: { flex: 1, borderRightWidth: 2, borderRightColor: "#000" },
  // Column 5 (last): no right border (table border provides it)
  rightColLast: { flex: 1 },
  // Top row of columns 2-5 ("Assigned to"): thin bottom divider
  rightColTop: { flex: 1, borderBottomWidth: 0.5, borderBottomColor: "#000", padding: 4 },
  // Bottom row of columns 2-5 (contains "Date assigned" | "Date completed")
  rightColBottom: { flex: 2 },
  // Bottom row, left sub-column ("Date assigned"): thin right divider
  rightColSubBottom: { flex: 1, borderRightWidth: 0.5, borderRightColor: "#000", padding: 1 },
  // Bottom row, right sub-column ("Date completed")
  rightColSubBottomLast: { flex: 1, padding: 1 },
});

// Header row specific styles
const headerStyles = StyleSheet.create({
  row: {
    minHeight: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: "#000",
    backgroundColor: "#e8e8e8",
  },
  // Header cell text: 8pt, centered
  text: { fontSize: 8, textAlign: "center" },
  // Header cell text for "Date assigned" / "Date completed": tighter line height
  textDate: { fontSize: 8, textAlign: "center", lineHeight: 1 },
  // Top row of columns 2-5 in header ("Assigned to")
  rightColTop: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  // Bottom row of columns 2-5 in header (contains "Date assigned" | "Date completed")
  rightColBottom: { flex: 2.5 },
  // First column sub-cells in header: minimal padding, vertically centered
  firstColSub: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  firstColSubLast: { flex: 2, padding: 1, justifyContent: "center" },
  // Bottom sub-columns in header: minimal padding, vertically centered
  rightColSubBottom: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  rightColSubBottomLast: { flex: 1, padding: 1, justifyContent: "center" },
  // First column in header: same as shared but ensures full stretch
  firstCol: { flex: 1, borderRightWidth: 3, borderRightColor: "#000" },
});

// Body row specific styles
const bodyStyles = StyleSheet.create({
  row: { flex: 1, borderBottomWidth: 1.5, borderBottomColor: "#000" },
  rowLast: { flex: 1 },
});

function TableRow({ isHeader, isLast }: { isHeader?: boolean; isLast?: boolean }) {
  const rowStyle = isHeader ? headerStyles.row : isLast ? bodyStyles.rowLast : bodyStyles.row;
  return (
    <PdfView row style={rowStyle}>
      <PdfView row style={isHeader ? headerStyles.firstCol : shared.firstCol}>
        <PdfView style={isHeader ? headerStyles.firstColSub : shared.firstColSub}>
          {isHeader && <PdfText style={headerStyles.text}>{"Terr.\nno."}</PdfText>}
        </PdfView>
        <PdfView style={isHeader ? headerStyles.firstColSubLast : shared.firstColSubLast}>
          {isHeader && <PdfText style={headerStyles.text}>{"Last date\ncompleted*"}</PdfText>}
        </PdfView>
      </PdfView>
      {[0, 1, 2, 3].map((i) => (
        <PdfView key={i} style={i < 3 ? shared.rightCol : shared.rightColLast}>
          <PdfView style={isHeader ? headerStyles.rightColTop : shared.rightColTop}>
            {isHeader && <PdfText style={headerStyles.text}>Assigned to</PdfText>}
          </PdfView>
          <PdfView row style={isHeader ? headerStyles.rightColBottom : shared.rightColBottom}>
            <PdfView style={isHeader ? headerStyles.rightColSubBottom : shared.rightColSubBottom}>
              {isHeader && <PdfText style={headerStyles.textDate}>{"Date\nassigned"}</PdfText>}
            </PdfView>
            <PdfView
              style={isHeader ? headerStyles.rightColSubBottomLast : shared.rightColSubBottomLast}
            >
              {isHeader && <PdfText style={headerStyles.textDate}>{"Date\ncompleted"}</PdfText>}
            </PdfView>
          </PdfView>
        </PdfView>
      ))}
    </PdfView>
  );
}

export function TerritoryAssignmentRecordPdf() {
  return (
    <PdfDocument>
      <PdfPage>
        <PdfView fixed>
          <PdfText style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}>
            TERRITORY ASSIGNMENT RECORD
          </PdfText>
          <PdfText style={{ textAlign: "left", marginTop: 0, fontSize: 12, fontWeight: "bold" }}>
            Service Year:
          </PdfText>
        </PdfView>
        <PdfView style={shared.table}>
          {Array.from({ length: 21 }, (_, i) => (
            <TableRow key={i} isHeader={i === 0} isLast={i === 20} />
          ))}
        </PdfView>
        <PdfView style={shared.footer} fixed>
          <PdfText variant="caption" style={{ marginBottom: 2 }}>
            * When beginning a new sheet, use this column to record the date on which each territory
            was last completed.
          </PdfText>
          <PdfText variant="caption">S-13-E 1/22</PdfText>
        </PdfView>
      </PdfPage>
    </PdfDocument>
  );
}
