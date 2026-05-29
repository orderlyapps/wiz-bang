import { IonModal } from "@ionic/react";
import type { ComponentProps } from "react";
import "./ResponsiveModal.css";

type IonModalProps = ComponentProps<typeof IonModal>;

type ResponsiveModalProps = IonModalProps & {
  fullscreen?: boolean;
};

export function ResponsiveModal({ fullscreen = true, ...props }: ResponsiveModalProps) {
  const defaultProps: ResponsiveModalProps = {
    fullscreen,
    ...props,
  };

  return <IonModal {...defaultProps}>{defaultProps.children}</IonModal>;
}
