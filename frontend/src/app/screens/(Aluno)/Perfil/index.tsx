import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../../context/AuthContext";
import { ProfileHeader } from "../../../../components/profile/ProfileHeader";
import { StatsGrid } from "../../../../components/profile/CardProfile";
import { BadgeList } from "../../../../components/profile/BadgeProfile";

const ALL_BADGES = [
  { label: "Primeiro Passo", icon: "🚀", desbloqueada: false },
  { label: "Streak de 7", icon: "🔥", desbloqueada: false },
  { label: "Top 10", icon: "🏆", desbloqueada: false },
  { label: "Maratonista", icon: "⚡", desbloqueada: false },
  { label: "Hackathon", icon: "🖥️", desbloqueada: false },
];

export default function Perfil() {
 const { user, logout, loading } = useAuth();
  
  console.log("USER:", JSON.stringify(user));
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/screens/(Authenticator)/Login");
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#0f62ff" />
      </View>
    );
  }

  const stats = [
    { label: "XP Total", value: String(user?.xpTotal ?? 0) },
    { label: "Streak Atual", value: String(user?.streakAtual ?? 0) },
    { label: "Nível", value: String(user?.nivel ?? 1) },
    { label: "Insígnias", value: "0" },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        nome={user?.nome || "—"}
        curso={user?.curso || "—"}
        tipoUsuario={user?.tipoUsuario || "—"}
        nivel={user?.nivel ?? 1}
      />

      <StatsGrid stats={stats} />

      <BadgeList badges={ALL_BADGES} />

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 140,
    backgroundColor: "#0d1424",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1424",
  },
  logoutButton: {
    backgroundColor: "#1f1b34",
    borderColor: "#7b1b3a",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: {
    color: "#ff4d6d",
    fontSize: 14,
    fontWeight: "700",
  },
});
