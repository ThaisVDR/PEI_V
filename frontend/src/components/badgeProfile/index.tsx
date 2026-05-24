import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Badge {
  label: string;
  icon: string;
  desbloqueada: boolean;
}

interface Props {
  badges: Badge[];
}

export function BadgeList({ badges }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Insígnias</Text>
      <View style={styles.list}>
        {badges.map((badge, index) => (
          <View
            key={index}
            style={[styles.item, !badge.desbloqueada && styles.bloqueado]}
          >
            <Text style={styles.icone}>{badge.icon}</Text>
            <Text style={[styles.nome, !badge.desbloqueada && styles.textoInativo]}>
              {badge.label}
            </Text>
            {!badge.desbloqueada && (
              <Text style={styles.cadeado}>🔒</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: 12,
  },
  list: {
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E8FF",
    gap: 12,
  },
  bloqueado: {
    opacity: 0.5,
  },
  icone: {
    fontSize: 28,
  },
  nome: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A2E",
  },
  textoInativo: {
    color: "#999",
  },
  cadeado: {
    fontSize: 16,
  },
});