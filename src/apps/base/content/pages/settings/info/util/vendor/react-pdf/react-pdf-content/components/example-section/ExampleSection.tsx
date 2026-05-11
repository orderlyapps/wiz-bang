import { IonItem } from "@ionic/react";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";
import { PdfViewer } from "@util/vendor/react-pdf/PdfViewer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  section: { marginBottom: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  body: { fontSize: 12, lineHeight: 1.6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  label: { fontSize: 11, color: "#555" },
  value: { fontSize: 11 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#ddd", marginVertical: 12 },
});

function ExampleDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Example Document</Text>
          <Text style={styles.body}>
            This is an example PDF built with @react-pdf/renderer. Use the PdfViewer component from
            src/util/vendor/react-pdf/PdfViewer to preview documents while designing them.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={[styles.body, { fontWeight: "bold", marginBottom: 6 }]}>Sample Data</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Jane Doe</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>11 May 2026</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>$1,200.00</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.body}>
            Wrap any Document element with PdfViewer to render it inline. Pass the document as a JSX
            element via the document prop.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

const items = [
  { label: "Document", value: "Root wrapper required by @react-pdf/renderer." },
  { label: "Page", value: "Defines a page with size and padding via StyleSheet." },
  { label: "View", value: "Box layout container — equivalent to a div." },
  { label: "Text", value: "Renders text content." },
  { label: "StyleSheet.create", value: "Defines reusable styles similar to React Native." },
];

export function ExampleSection() {
  return (
    <ModuleSection
      title="Example"
      path="src/util/vendor/react-pdf/"
      description="A live preview of a PDF document rendered inline using PdfViewer."
      items={items}
    >
      <IonItem lines="none">
        <div style={{ width: "100%", height: 480, paddingBlock: 8 }}>
          <PdfViewer>
            <ExampleDocument />
          </PdfViewer>
        </div>
      </IonItem>
    </ModuleSection>
  );
}
