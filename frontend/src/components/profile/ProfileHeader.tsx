import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  nome: string;
  curso: string;
  tipoUsuario: string;
  nivel: number;
};

export function ProfileHeader({ nome, curso, tipoUsuario, nivel }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Text style={styles.avatarIcon}>👤</Text>
      </View>
      <Text style={styles.name}>{nome}</Text>
      <Text style={styles.curso}>{curso}</Text>
      <Text style={styles.tipo}>{tipoUsuario}</Text>
      <View style={styles.nivelBadge}>
        <Text style={styles.nivelText}>Nível {nivel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#0f62ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarIcon: {
    fontSize: 40,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  curso: {
    color: "#8e9cca",
    fontSize: 14,
    marginBottom: 2,
  },
  tipo: {
    color: "#7a89b8",
    fontSize: 12,
  },
  nivelBadge: {
    marginTop: 10,
    backgroundColor: "#0f62ff22",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#0f62ff55",
  },
  nivelText: {
    color: "#0f62ff",
    fontSize: 12,
    fontWeight: "700",
  },
});
