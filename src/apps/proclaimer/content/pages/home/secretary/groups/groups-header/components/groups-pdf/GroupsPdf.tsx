import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Group } from "@shared/database/schemas/group";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  groupColumn: {
    width: "22%",
    marginRight: 10,
  },
  groupName: {
    fontSize: 12,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 4,
    marginBottom: 8,
  },
  overseerName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  assistantName: {
    fontSize: 9,
    color: "#666",
    marginBottom: 2,
  },
  memberGap: {
    height: 6,
  },
  member: {
    fontSize: 10,
    marginBottom: 3,
  },
});

interface GroupsPdfProps {
  groups: Group[];
  publishers: Publisher[];
  congregation_name?: string;
}

export function GroupsPdf({ groups, publishers, congregation_name }: GroupsPdfProps) {
  const getGroupPublishers = (group_id: string) => {
    return publishers.filter((p) => p.group_id === group_id);
  };

  const getPublisherName = (publisher_id?: string | null) => {
    if (!publisher_id) return null;
    const publisher = publishers.find((p) => p.id === publisher_id);
    return publisher ? getPublisherDisplayName(publisher) : null;
  };

  const chunkGroups = (arr: Group[], size: number): Group[][] => {
    const chunks: Group[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const group_rows = chunkGroups(groups, 4);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          {congregation_name ? `${congregation_name} - ` : ""}Field Service Groups
        </Text>

        {group_rows.map((row_groups, row_index) => (
          <View key={row_index} style={styles.row}>
            {row_groups.map((group) => {
              const overseer_name = getPublisherName(group.overseer_id);
              const assistant_name = getPublisherName(group.assistant_id);
              const excluded_ids = [group.overseer_id, group.assistant_id].filter(Boolean);
              const group_members = getGroupPublishers(group.id ?? "").filter(
                (p) => !excluded_ids.includes(p.id),
              );

              return (
                <View key={group.id} style={styles.groupColumn}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  {overseer_name && <Text style={styles.overseerName}>{overseer_name}</Text>}
                  {assistant_name && <Text style={styles.assistantName}>{assistant_name}</Text>}
                  {group_members.length > 0 && <View style={styles.memberGap} />}
                  {group_members.map((publisher) => (
                    <Text key={publisher.id} style={styles.member}>
                      {getPublisherDisplayName(publisher)}
                    </Text>
                  ))}
                </View>
              );
            })}
          </View>
        ))}
      </Page>
    </Document>
  );
}
