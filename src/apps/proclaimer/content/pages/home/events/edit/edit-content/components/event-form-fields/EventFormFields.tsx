import { TextInput } from "@ui/components/inputs/text/TextInput";
import { Select } from "@ui/components/inputs/select/Select";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { eventTypeSchema } from "@shared/database/schemas/event";

const EVENT_TYPE_OPTIONS = eventTypeSchema.options.map((value) => ({
  label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  value,
}));

interface EventFormFieldsProps {
  name: string;
  description: string;
  address: string;
  type: string;
  all_day: boolean;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  on_change: (field: string, value: string | boolean) => void;
}

export function EventFormFields(props: EventFormFieldsProps) {
  const { on_change } = props;
  return (
    <>
      <TextInput label="Name" value={props.name} on_change={(v) => on_change("name", v)} />
      <Select
        label="Type"
        value={props.type}
        options={EVENT_TYPE_OPTIONS}
        on_change={(v) => on_change("type", v as string)}
      />
      <TextInput
        label="Description"
        value={props.description}
        on_change={(v) => on_change("description", v)}
      />
      <TextInput label="Address" value={props.address} on_change={(v) => on_change("address", v)} />
      <ToggleInput
        label="All Day"
        checked={props.all_day}
        on_change={(v) => on_change("all_day", v)}
      />
      <DateInput
        label="Start Date"
        value={props.start_date}
        on_change={(v) => on_change("start_date", v)}
      />
      {!props.all_day && (
        <TextInput
          label="Start Time"
          value={props.start_time}
          placeholder="HH:MM"
          on_change={(v) => on_change("start_time", v)}
        />
      )}
      <DateInput
        label="End Date"
        value={props.end_date}
        on_change={(v) => on_change("end_date", v)}
      />
      {!props.all_day && (
        <TextInput
          label="End Time"
          value={props.end_time}
          placeholder="HH:MM"
          on_change={(v) => on_change("end_time", v)}
        />
      )}
    </>
  );
}
