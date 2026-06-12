export type PublisherSortOrder = "alphabetical" | "weeks_since_last" | "avg_weeks_between";

export const sortOrderLabels: Record<PublisherSortOrder, string> = {
  alphabetical: "Alphabetical",
  weeks_since_last: "Weeks since last assignment",
  avg_weeks_between: "Average weeks between assignments",
};
