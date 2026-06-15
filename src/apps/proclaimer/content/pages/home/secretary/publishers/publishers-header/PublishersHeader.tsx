import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";

interface PublishersHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export function PublishersHeader({ searchTerm, onSearch }: PublishersHeaderProps) {
  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/secretary" />
        </IonButtons>
        <IonTitle>Publishers</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <SearchInput value={searchTerm} on_change={onSearch} />
      </IonToolbar>
    </>
  );
}
