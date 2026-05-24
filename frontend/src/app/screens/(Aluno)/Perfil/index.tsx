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
import { ProfileHeader } from "../../../../components/profileHeader";
import { StatsGrid } from "../../../../components/cardProfile";
import { BadgeList } from "../../../../components/badgeProfile";
import { ALL_BADGES, getStats } from "../../../../data/Perfil";
import { styles } from "../../../../styles/Perfil";

export default function Perfil() {
 const { user, logout, loading } = useAuth();
  
  console.log("USER:", JSON.stringify(user));
  const router = useRouter();

  const stats = getStats(user);

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



  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        nome={user?.nome || "—"}
        curso={user?.email || "—"}
        tipoUsuario={user?.tipoUsuario || "—"}
        nivel={1}
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



