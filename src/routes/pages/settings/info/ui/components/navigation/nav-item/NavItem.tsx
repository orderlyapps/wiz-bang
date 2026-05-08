import { NavItemContent } from "@content/pages/settings/info/ui/components/navigation/nav-item/nav-item-content/NavItemContent";
import { NavItemHeader } from "@content/pages/settings/info/ui/components/navigation/nav-item/nav-item-header/NavItemHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function NavItemPage() {
  return (
    <IonPage>
      <IonHeader>
        <NavItemHeader />
      </IonHeader>
      <IonContent>
        <NavItemContent />
      </IonContent>
    </IonPage>
  );
}

export default NavItemPage;
