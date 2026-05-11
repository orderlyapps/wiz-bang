import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";

const items = [
  {
    label: "PdfViewer.tsx",
    value: "Wraps PDFViewer from @react-pdf/renderer with sensible defaults.",
  },
];

const code = `import { PdfViewer } from "@util/vendor/react-pdf/PdfViewer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40 },
  heading: { fontSize: 20, fontWeight: "bold" },
});

function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Hello World</Text>
        </View>
      </Page>
    </Document>
  );
}

// Render inline with a fixed height container:
<div style={{ height: 480 }}>
  <PdfViewer document={<MyDocument />} />
</div>`;

export function UsageSection() {
  return (
    <ModuleSection
      title="Usage"
      path="src/util/vendor/react-pdf/PdfViewer.tsx"
      description="Import PdfViewer and pass any @react-pdf/renderer Document as the document prop."
      items={items}
    >
      <IonItem>
        <Body>
          <strong>Source</strong>
        </Body>
      </IonItem>
      <IonItem lines="none">
        <pre
          style={{
            margin: 0,
            width: "100%",
            whiteSpace: "pre-wrap",
            fontSize: "0.8125rem",
          }}
        >
          {code}
        </pre>
      </IonItem>
    </ModuleSection>
  );
}
