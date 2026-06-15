import { IonIcon } from "@ionic/react";
import React from "react";

const iconModules = import.meta.glob("./svgs/*.svg", {
  eager: true,
  as: "url",
});

const icons = Object.entries(iconModules).reduce(
  (acc, [path, url]) => {
    const name = path.split("/").pop()?.replace(".svg", "") || path;
    acc[name] = url;
    return acc;
  },
  {} as Record<string, string>,
);

export type IconName =
  | "add-chairman"
  | "add"
  | "baptise"
  | "bible-study"
  | "bookmark-filled"
  | "bookmark"
  | "boy"
  | "brother-sister"
  | "brother"
  | "cart"
  | "chat"
  | "check-list"
  | "chevronBackJW"
  | "chevronDownJW"
  | "chevronForwardJW"
  | "chevronUpJW"
  | "children"
  | "congregation"
  | "contributions"
  | "convention"
  | "copy"
  | "cross"
  | "delete"
  | "docx"
  | "download"
  | "edit"
  | "expand"
  | "export"
  | "fast"
  | "gem"
  | "girl"
  | "home"
  | "image"
  | "import"
  | "letter-writing"
  | "letter"
  | "map"
  | "memorial"
  | "message"
  | "midweek-meeting"
  | "ministry"
  | "minus"
  | "offline"
  | "outline"
  | "pdf"
  | "play"
  | "publishers"
  | "repeat"
  | "schedules"
  | "settings"
  | "sheep-copy"
  | "sheep"
  | "shepherd"
  | "sister"
  | "slow"
  | "sort"
  | "talk"
  | "upload"
  | "weekend-meeting"
  | "wheat"
  | "work";

interface Props extends Omit<React.ComponentProps<typeof IonIcon>, "icon" | "src"> {
  name: IconName;
}

export const Icon: React.FC<Props> = ({ name, ...props }) => {
  return <IonIcon {...props} src={icons[name]} />;
};
