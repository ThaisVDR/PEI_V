import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Stat {
  label: string;
  value: string | number;
  icon?: string;
}

interface Props {
  stats: Stat[];
}

export function StatsGrid({ stats }: Props) {
  return (
    <View style={styles.grid}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  card: {
    width: "45%",
    backgroundColor: "#F5F8FF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E8FF",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
});