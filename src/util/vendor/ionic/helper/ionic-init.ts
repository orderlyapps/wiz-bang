import { setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "@ionic/react/css/palettes/dark.class.css";

const PORTRAIT_LAYOUT = "icon-top";
const LANDSCAPE_LAYOUT = "icon-start";

function getLayoutForOrientation() {
  return window.matchMedia("(orientation: landscape)").matches ? LANDSCAPE_LAYOUT : PORTRAIT_LAYOUT;
}

function applyTabButtonLayout() {
  const layout = getLayoutForOrientation();
  document.querySelectorAll("ion-tab-button").forEach((button) => {
    const tabButton = button as HTMLIonTabButtonElement;
    if (tabButton.layout !== layout) {
      tabButton.layout = layout;
    }
  });
}

setupIonicReact({
  swipeBackEnabled: false,
  tabButtonLayout: getLayoutForOrientation(),
});

applyTabButtonLayout();

window.addEventListener("orientationchange", applyTabButtonLayout);
window.addEventListener("resize", applyTabButtonLayout);

const tabButtonObserver = new MutationObserver((mutations) => {
  const hasTabButton = mutations.some((mutation) =>
    Array.from(mutation.addedNodes).some(
      (node) =>
        node instanceof Element &&
        (node.tagName === "ION-TAB-BUTTON" || node.querySelector("ion-tab-button") !== null),
    ),
  );
  if (hasTabButton) {
    applyTabButtonLayout();
  }
});

tabButtonObserver.observe(document.body, { childList: true, subtree: true });
