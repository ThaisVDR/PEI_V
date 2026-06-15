import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Stat {
  label: string;
  value: string | number;
  color?: "blue" | "white" | "pink";
}

interface Props {
  stats: Stat[];
}

export function StatsGrid({ stats }: Props) {
  const colorMap: Record<string, string> = {
    blue: "#00d4ff",
    white: "#ffffff",
    pink: "#e8445a",
  };

  return (
    <View style={styles.grid}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.card}>
          <Text
            style={[styles.value, { color: colorMap[stat.color ?? "white"] }]}
          >
            {stat.value}
          </Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function WeeklyChart() {
  const days = [
    { label: "Seg", height: 45 },
    { label: "Ter", height: 75 },
    { label: "Qua", height: 60 },
    { label: "Qui", height: 85 },
    { label: "Sex", height: 40 },
    { label: "Sáb", height: 50 },
    { label: "Dom", height: 90 },
  ];

  return (
    <View style={styles.chartSection}>
      <Text style={styles.sectionTitle}>Estatísticas</Text>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Atividade Semanal</Text>
        <View style={styles.barsRow}>
          {days.map((d, i) => (
            <View key={i} style={styles.barWrap}>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height: `${d.height}%` as any }]} />
              </View>
              <Text style={styles.barLabel}>{d.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  card: {
    width: "47.5%",
    backgroundColor: "#131c2b",
    borderWidth: 1,
    borderColor: "#1e2d42",
    borderRadius: 14,
    padding: 16,
  },
  value: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#5b7a99",
    fontWeight: "400",
  },
  chartSection: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  chartCard: {
    marginHorizontal: 20,
    backgroundColor: "#131c2b",
    borderWidth: 1,
    borderColor: "#1e2d42",
    borderRadius: 14,
    padding: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  barsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 80,
    gap: 5,
  },
  barWrap: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    height: "100%",
  },
  barTrack: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    backgroundColor: "#00aaff",
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    color: "#4a6580",
  },
});
