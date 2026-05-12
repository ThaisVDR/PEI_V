import React from "react";
import { Text, View } from "react-native";

type Stat = { label: string; value: string };
type Props = { stats: Stat[] };

export function StatsGrid({ stats }: Props) {
  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.card}>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  card: {
    width: "48%",
    backgroundColor: "#101a35",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#293259",
    padding: 16,
    marginBottom: 12,
  },
  value: {
    color: "#0f62ff",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 6,
  },
  label: {
    color: "#8e9cca",
    fontSize: 12,
  },
});
