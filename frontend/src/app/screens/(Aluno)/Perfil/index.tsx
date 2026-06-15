import React, { useState, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  Modal,
  FlatList,
  StyleSheet,
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

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  criadaEm: string;
}

const Uk_formatarData = (dataString: string) => {
  if (!dataString) return "Recentemente";
  try {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "Recentemente";
  }
};

export default function Perfil() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [perfil, setPerfil] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Estados dinâmicos das notificações
  const [modalVisivel, setModalVisivel] = useState(false);
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);
  const [listaNotificacoes, setListaNotificacoes] = useState<Notificacao[]>([]);

  const carregarPerfil = useCallback(async () => {
    try {
      const res = await api.get("/user/me");
      setPerfil(res.data);
    } catch (err) {
      console.log("Erro ao buscar perfil atualizado, usando local:", err);
      setPerfil(user);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      carregarPerfil();
    }, [carregarPerfil]),
  );

  // Polling para o sininho manter o contador real
  useEffect(() => {
    if (!user?.token) return;

    async function fetchContadorNotificacoes() {
      try {
        const { data } = await api.get("/eventos", {
          headers: { Authorization: `Bearer ${user!.token}` },
        });
        setTotalNotificacoes(data.length);
      } catch (e) {
        console.log("Erro ao atualizar contador em Perfil:", e);
      }
    }

    fetchContadorNotificacoes();
    const interval = setInterval(fetchContadorNotificacoes, 5000);
    return () => clearInterval(interval);
  }, [user?.token]);

  const abrirModalNotificacoes = async () => {
    setModalVisivel(true);
    if (!user?.token) return;

    try {
      const { data } = await api.get("/eventos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const eventosMapeados = data.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(),
        titulo: item.tituloEvento || "Novo Evento",
        mensagem: item.descricaoEvento || "",
        criadaEm: item.dataEvento || new Date().toISOString(),
      }));

      setListaNotificacoes(eventosMapeados);
    } catch (e) {
      console.log("Erro ao buscar eventos em Perfil:", e);
    }
  };

  const obterIcone = (titulo: string) => {
    const t = titulo.toLowerCase();
    if (t.includes("urgente") || t.includes("prazo") || t.includes("prova"))
      return { name: "alarm", color: "#FF5B73" };
    if (t.includes("aviso") || t.includes("importante"))
      return { name: "megaphone", color: "#A85CFF" };
    return { name: "document-text", color: "#4EA3FF" };
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregarPerfil();
    setRefreshing(false);
  }, [carregarPerfil]);

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
        <TouchableOpacity
          style={styles.notification}
          onPress={abrirModalNotificacoes}
        >
          <Ionicons name="notifications" size={30} color="#5D708A" />
          {totalNotificacoes > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>
                {totalNotificacoes > 9 ? "9+" : totalNotificacoes}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00d4ff"
            colors={["#00d4ff"]}
            progressBackgroundColor="#101D33"
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

      {/* Modal de Notificações */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Notificações de Eventos</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisivel(false)}
              >
                <Ionicons name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            {listaNotificacoes.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Nenhum evento ou aviso por aqui... 🌟
                </Text>
              </View>
            ) : (
              <FlatList
                data={listaNotificacoes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => {
                  const icone = obterIcone(item.titulo);
                  return (
                    <View style={styles.card}>
                      <View
                        style={[
                          styles.iconContainer,
                          { backgroundColor: icone.color + "15" },
                        ]}
                      >
                        <Ionicons
                          name={icone.name as any}
                          size={24}
                          color={icone.color}
                        />
                      </View>
                      <View style={styles.textContent}>
                        <Text style={styles.cardTitle}>{item.titulo}</Text>
                        <Text style={styles.cardBody}>{item.mensagem}</Text>
                        <Text style={styles.cardTime}>
                          {Uk_formatarData(item.criadaEm)}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
