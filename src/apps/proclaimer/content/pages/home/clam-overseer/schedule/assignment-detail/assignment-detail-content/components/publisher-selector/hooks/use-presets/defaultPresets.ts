import type { ParticipationType } from "../../utils/participationTypeMap";
import type { FilterSortPreset } from "./types";

export const DEFAULT_PRESET_ID = "default";

export const defaultPresets: Record<ParticipationType, FilterSortPreset> = {
  prayer: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "alphabetical",
    filter: {
      gender: "all",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["prayer"],
    },
  },
  chairman: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "alphabetical",
    filter: {
      gender: "male",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["chairman", "counselor"],
    },
  },
  counselor: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "alphabetical",
    filter: {
      gender: "male",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["chairman", "counselor"],
    },
  },
  bible_reading: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "all",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["bible_reading"],
    },
  },
  apply: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "all",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["apply"],
    },
  },
  assistant: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "all",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["assistant"],
    },
  },
  treasures: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["treasures"],
    },
  },
  gems: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["gems"],
    },
  },
  living: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "male",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["living"],
    },
  },
  cbs_conductor: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "all",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["cbs_conductor"],
    },
  },
  cbs_reader: {
    id: DEFAULT_PRESET_ID,
    name: "Default",
    sort_order: "weeks_away_closest",
    filter: {
      gender: "all",
      min_weeks_away_closest: 0,
      min_avg_weeks_between: 0,
      participation_types: [],
      stat_participation_types: ["cbs_reader"],
    },
  },
};
