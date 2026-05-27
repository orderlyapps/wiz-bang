import { ResponsiveList } from "@ui/components/display/responsive-list/ResponsiveList";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "items", value: "— Array of records to display." },
  {
    label: "columns",
    value:
      "— Column definitions. Each has { key, header, render(item), align?, width? }. The header and rendered cell are used as-is on desktop tables and stacked inside an IonItem on mobile cards.",
  },
  { label: "get_id", value: "— Function that returns a stable unique id for each item." },
  {
    label: "on_select",
    value:
      "— Optional click/Enter handler. When provided, rows become focusable and clickable on desktop and tappable IonItems on mobile.",
  },
  {
    label: "render_card",
    value:
      "— Optional custom renderer for the mobile card body. Defaults to stacking each column's render output.",
  },
  { label: "empty", value: "— Optional node shown when items is empty." },
];

type Demo = { id: string; name: string; email: string; role: string };

const demo_items: Demo[] = [
  { id: "1", name: "Ada Lovelace", email: "ada@example.com", role: "Admin" },
  { id: "2", name: "Grace Hopper", email: "grace@example.com", role: "Engineer" },
  { id: "3", name: "Alan Turing", email: "alan@example.com", role: "Engineer" },
];

const columns = [
  { key: "name", header: "Name", render: (u: Demo) => u.name },
  { key: "email", header: "Email", render: (u: Demo) => u.email },
  { key: "role", header: "Role", render: (u: Demo) => u.role, align: "end" as const },
];

export function ResponsiveListSection() {
  return (
    <ComponentSection
      title="ResponsiveList"
      description="A generic list that renders an accessible HTML table on desktop (>= 1024px) and IonItem cards on mobile/tablet. Use it for any tabular data so users get a real table on large screens and a touch-friendly list on phones."
      props={props}
    >
      <ResponsiveList
        items={demo_items}
        columns={columns}
        get_id={(u) => u.id}
        on_select={(u) => console.log("selected", u.id)}
      />
    </ComponentSection>
  );
}
