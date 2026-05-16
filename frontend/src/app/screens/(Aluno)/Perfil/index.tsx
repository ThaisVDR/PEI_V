import React, { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../../context/AuthContext";
import { ProfileHeader } from "../../../../components/Profile/ProfileHeader";
import { StatsGrid } from "../../../../components/Profile/CardProfile";
import { BadgeList } from "../../../../components/Profile/BadgeProfile";

// Mapeamos um 'id' único para cruzar com o banco de dados
const ALL_BADGES = [
  {
    id: "primeiro_passo",
    label: "Primeiro Passo",
    icon: "🚀",
    desbloqueada: false,
  },
  { id: "streak_7", label: "Streak de 7", icon: "🔥", desbloqueada: false },
  { id: "top_10", label: "Top 10", icon: "🏆", desbloqueada: false },
  { id: "maratonista", label: "Maratonista", icon: "⚡", desbloqueada: false },
  { id: "hackathon", label: "Hackathon", icon: "🖥️", desbloqueada: false },
];

export default function Perfil() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  console.log("USER NO PERFIL:", JSON.stringify(user));

  async function handleLogout() {
    try {
      await logout();
      router.replace("/screens/(Authenticator)/Login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }

  const userAny = user as any;

  // Processa as insígnias dinamicamente usando useMemo para evitar re-renderizações desnecessárias
  const { badgesUsuario, totalInsignias } = useMemo(() => {
    // Array contendo os IDs das insígnias que o usuário possui (vindo do banco)
    // Adapte 'user?.insignias' para o nome exato da propriedade que vem do seu backend
    const insigniasConquistadas = Array.isArray(userAny?.insignias)
      ? userAny.insignias
      : [];

    const listaAtualizada = ALL_BADGES.map((badge) => ({
      ...badge,
      // Se o ID da insígnia global estiver na lista do usuário, ela é desbloqueada
      desbloqueada: insigniasConquistadas.includes(badge.id),
    }));

    return {
      badgesUsuario: listaAtualizada,
      totalInsignias: insigniasConquistadas.length,
    };
  }, [userAny?.insignias]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#0f62ff" size="large" />
      </View>
    );
  }

  const stats = [
    { label: "XP Total", value: String(user?.xpTotal ?? 0) },
    { label: "Streak Atual", value: String(user?.streakAtual ?? 0) },
    { label: "Nível", value: String(user?.nivel ?? 1) },
    { label: "Insígnias", value: String(totalInsignias) }, // Agora dinâmico!
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        nome={user?.nome || "Usuário"}
        curso={user?.curso || "Não informado"}
        tipoUsuario={user?.tipoUsuario || "Aluno"}
        nivel={user?.nivel ?? 1}
      />

      <StatsGrid stats={stats} />

      {/* Passa a lista atualizada com os booleanos corretos */}
      <BadgeList badges={badgesUsuario} />

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

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
  logoutText: {
    color: "#ff4d6d",
    fontSize: 14,
    fontWeight: "700",
  },
});
