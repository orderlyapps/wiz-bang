import { lazy, Suspense } from "react";
import { CongregationHeader } from "@admin-content/pages/tables/congregation/congregation-header/CongregationHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CongregationSkeleton } from "@admin-content/pages/tables/congregation/congregation-content/components/congregation-skeleton/CongregationSkeleton";

const CongregationContent = lazy(() =>
  import("@admin-content/pages/tables/congregation/congregation-content/CongregationContent").then(
    (m) => ({ default: m.CongregationContent }),
  ),
);

function CongregationPage() {
  return (
    <IonPage>
      <IonHeader>
        <CongregationHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <Suspense fallback={<CongregationSkeleton />}>
          <CongregationContent />
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

export default CongregationPage;
