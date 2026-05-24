import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  nome: string;
  curso: string;
  tipoUsuario: string;
  nivel: number;
}

export function ProfileHeader({ nome, curso, tipoUsuario, nivel }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={48} color="#007BFF" />
      </View>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.curso}>{curso}</Text>
      <View style={styles.badges}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{tipoUsuario}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Nível {nivel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E8F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A2E",
  },
  curso: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  badge: {
    backgroundColor: "#007BFF22",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#007BFF",
    fontSize: 12,
    fontWeight: "600",
  },
});