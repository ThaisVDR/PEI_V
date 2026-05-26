import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

interface StreakCardProps {
  streak: number;
}

export default function StreakCard({ streak }: StreakCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.streakContainer}>
        <Ionicons
          name="flame"
          size={40}
          color={streak > 0 ? "#f54242" : "#5D708A"}
        />
        <View style={styles.textGroup}>
          <Text style={styles.streakNumber}>
            {streak} {streak === 1 ? "Dia" : "Dias"}
          </Text>
          <Text style={styles.streakLabel}>Ofensiva Atual</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0D1B2A",
    padding: 38,
    marginHorizontal: 20,
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(195, 105, 105, 0.08)",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  textGroup: {
    marginLeft: 12,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  streakLabel: {
    fontSize: 14,
    color: "#2160b8",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(76, 103, 165, 0.43)",
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  statBox: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    color: "#FFD700",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});
