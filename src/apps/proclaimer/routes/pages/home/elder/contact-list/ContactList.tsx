import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ContactListHeader } from "@proclaimer-content/pages/home/elder/contact-list/contact-list-header/ContactListHeader";
import { ContactListContent } from "@proclaimer-content/pages/home/elder/contact-list/contact-list-content/ContactListContent";

function ContactListPage() {
  return (
    <IonPage>
      <IonHeader>
        <ContactListHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ContactListContent />
      </IonContent>
    </IonPage>
  );
}

export default ContactListPage;
