import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import type { LabelValue } from "@util/types/LabelValue";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface LabelValueItemProps extends LabelValue {
  label_color?: IonicColor;
  value_color?: IonicColor;
  detail?: boolean;
  router_link?: string;
  on_click?: () => void;
}

export function LabelValueItem({
  label,
  value,
  label_color,
  value_color,
  detail = false,
  router_link,
  on_click,
}: LabelValueItemProps) {
  return (
    <IonItem
      routerLink={router_link}
      detail={detail}
      onClick={on_click}
      className="Label-value-item"
    >
      <IonLabel>
        <Body color={label_color} size="sm" bold>
          {label}
        </Body>
      </IonLabel>
      <div slot="end">
        <Body color={value_color} size="sm">
          {value}
        </Body>
      </div>
    </IonItem>
  );
}
