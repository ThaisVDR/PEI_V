import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

type Badge = {
  id: string; // Adicionado id na tipagem para controle do map
  label: string;
  icon: string;
  desbloqueada: boolean;
};

type Props = { badges: Badge[] };

export function BadgeList({ badges }: Props) {
  return (
    <>
      <Text style={styles.title}>Conquistas</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {badges.map((badge) => (
          <View
            key={badge.id} // Alterado para badge.id para evitar problemas com labels iguais
            style={[styles.card, !badge.desbloqueada && styles.locked]}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                {badge.desbloqueada ? badge.icon : "🔒"}
              </Text>
            </View>
            <Text style={styles.label} numberOfLines={2}>
              {badge.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  row: {
    paddingBottom: 18,
  },
  card: {
    width: 100,
    height: 120,
    backgroundColor: "#101a35",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#293259",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#15204a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
  },
  locked: {
    opacity: 0.3,
  },
});
