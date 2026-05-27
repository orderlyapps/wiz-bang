import { IonItem, IonLabel } from "@ionic/react";
import { Fragment, type ReactNode } from "react";
import type { ResponsiveListColumn } from "../../types";

interface ResponsiveListCardsProps<T> {
  items: T[];
  columns: ResponsiveListColumn<T>[];
  get_id: (item: T) => string;
  on_select?: (item: T) => void;
  render_card?: (item: T) => ReactNode;
}

export function ResponsiveListCards<T>({
  items,
  columns,
  get_id,
  on_select,
  render_card,
}: ResponsiveListCardsProps<T>) {
  return (
    <>
      {items.map((item) => {
        const id = get_id(item);
        const button_props = on_select
          ? { button: true as const, onClick: () => on_select(item) }
          : {};
        return (
          <IonItem key={id} detail={Boolean(on_select)} {...button_props}>
            <IonLabel>
              {render_card
                ? render_card(item)
                : columns.map((col) => <Fragment key={col.key}>{col.render(item)}</Fragment>)}
            </IonLabel>
          </IonItem>
        );
      })}
    </>
  );
}
