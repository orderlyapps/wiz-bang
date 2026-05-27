import { IonModal } from "@ionic/react";
import type { ComponentProps, ReactNode } from "react";
import { useBreakpoint } from "@util/hooks/use-breakpoint/use-breakpoint";
import "./ResponsiveModal.css";

type IonModalProps = ComponentProps<typeof IonModal>;

type Size = "sm" | "md" | "lg";

interface ResponsiveModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  children: ReactNode;
  size?: Size;
  mobile_breakpoints?: number[];
  initial_breakpoint?: number;
  class_name?: string;
  ion_modal_props?: Partial<IonModalProps>;
}

const size_class: Record<Size, string> = {
  sm: "responsive-modal-sm",
  md: "responsive-modal-md",
  lg: "responsive-modal-lg",
};

export function ResponsiveModal({
  is_open,
  on_dismiss,
  children,
  size = "md",
  mobile_breakpoints = [0, 1],
  initial_breakpoint = 1,
  class_name,
  ion_modal_props,
}: ResponsiveModalProps) {
  const { is_mobile } = useBreakpoint();
  const classes = ["responsive-modal", size_class[size], class_name].filter(Boolean).join(" ");

  const sheet_props = is_mobile
    ? { breakpoints: mobile_breakpoints, initialBreakpoint: initial_breakpoint }
    : {};

  return (
    <IonModal
      key={is_mobile ? "sheet" : "card"}
      isOpen={is_open}
      onDidDismiss={on_dismiss}
      className={classes}
      {...sheet_props}
      {...ion_modal_props}
    >
      {children}
    </IonModal>
  );
}
