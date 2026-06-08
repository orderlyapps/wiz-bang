import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Label } from "@ui/components/display/text/label/Label";
import type { LabelValue } from "@util/types/LabelValue";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface LabelValueItemProps extends Partial<LabelValue> {
  label: string;
  label_color?: IonicColor;
  value_color?: IonicColor;
  value_2?: string;
  value_2_color?: IonicColor;
  detail?: boolean;
  router_link?: string;
  on_click?: () => void;
}

export function LabelValueItem({
  label,
  value,
  label_color = "medium",
  value_color,
  value_2,
  value_2_color,
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
        <Label color={label_color} size="sm">
          {label}
        </Label>
        {value && (
          <div className="ion-padding-start">
            <Body color={value_color}>{value}</Body>
          </div>
        )}
        {value_2 && (
          <div className="ion-padding-start">
            <Body color={value_2_color}>{value_2}</Body>
          </div>
        )}
      </IonLabel>
    </IonItem>
  );
}
