import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl, // ✅ Importado para o arrastar para baixo
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useAuth } from "../../../../context/AuthContext";
import { ProfileHeader } from "../../../../components/profileHeader";
import { StatsGrid } from "../../../../components/cardProfile";
import { BadgeList } from "../../../../components/badgeProfile";
import { getStats } from "../../../../data/Perfil";
import { BADGES } from "../../../../data/Insignias";
import { styles } from "../../../../styles/Perfil";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../../services/api";

export default function Perfil() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [perfil, setPerfil] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false); // ✅ Estado da animação de atualização

  // Função isolada para buscar os dados (reutilizada no foco e no arrastar)
  const carregarPerfil = useCallback(async () => {
    try {
      const res = await api.get("/user/me");
      setPerfil(res.data);
    } catch (err) {
      console.log("Erro ao buscar perfil atualizado, usando local:", err);
      setPerfil(user);
    }
  }, [user]);

  // Carrega automaticamente quando entra na tela
  useFocusEffect(
    useCallback(() => {
      carregarPerfil();
    }, [carregarPerfil]),
  );

  // ✅ Função disparada ao puxar a tela para baixo
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregarPerfil();
    setRefreshing(false);
  }, [carregarPerfil]);

  // Calcula insígnias desbloqueadas com base no perfil real
  const badgesCalculadas = BADGES.map((badge) => ({
    label: badge.title,
    icon: badge.icon,
    description: badge.description,
    desbloqueada: badge.check(perfil),
  }));

  const totalDesbloqueadas = badgesCalculadas.filter(
    (b) => b.desbloqueada,
  ).length;

  const stats = getStats({
    ...perfil,
    xpTotal: perfil?.xpTotal ?? 0,
    streakAtual: perfil?.streakAtual ?? 0,
    insignias: totalDesbloqueadas,
  });

  async function handleLogout() {
    await logout();
    router.replace("/screens/(Authenticator)/Login");
  }

  // Só bloqueia a tela inteira se o Auth global estiver carregando de fato
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#00d4ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../../assets/icon_questio.png")}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity style={styles.notification}>
          <Ionicons name="notifications" size={30} color="#5D708A" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        // ✅ Adicionado o controle de atualização nativo aqui
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00d4ff" // Cor da rodinha no iOS
            colors={["#00d4ff"]} // Cor da rodinha no Android
            progressBackgroundColor="#101D33" // Cor de fundo da rodinha no Android
          />
        }
      >
        <ProfileHeader
          nome={perfil?.nome || user?.nome || "—"}
          curso={perfil?.email || user?.email || "—"}
          tipoUsuario={perfil?.tipoUsuario || user?.tipoUsuario || "—"}
          nivel={perfil?.nivel ?? 1}
        />

        <StatsGrid stats={stats} />

        <BadgeList badges={badgesCalculadas} />

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#e8445a" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
