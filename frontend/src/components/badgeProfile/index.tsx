import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface Badge {
  label: string;
  description?: string;
  icon: string;
  desbloqueada: boolean;
}

interface Props {
  badges: Badge[];
}

export function BadgeList({ badges }: Props) {
  const desbloqueadas = badges.filter((b) => b.desbloqueada);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Conquistas Recentes</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.iconRow}
      >
        {desbloqueadas.map((badge, index) => (
          <View key={index} style={styles.iconItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>{badge.icon}</Text>
            </View>
            <Text style={styles.iconLabel}>{badge.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
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

  // Linha de ícones
  iconRow: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 4,
  },
  iconItem: {
    alignItems: "center",
    gap: 6,
    width: 60,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#1a2840",
    borderWidth: 1.5,
    borderColor: "#243550",
    justifyContent: "center",
    alignItems: "center",
  },
  iconEmoji: {
    fontSize: 22,
  },
  iconLabel: {
    fontSize: 10,
    color: "#6b8aaa",
    textAlign: "center",
    lineHeight: 13,
  },
});
