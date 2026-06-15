import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { useAuth } from "../../../../context/AuthContext";
import { styles } from "../../../../styles/Insignias";
import { BADGES, CATEGORIES } from "../../../../data/Insignias";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import api from "../../../../services/api";

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  criadaEm: string;
}

// Auxiliar para formatação de datas vinda dos eventos
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

export default function Insignias() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("todas");
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Estados adicionados para gerenciar as notificações dinâmicas
  const [modalVisivel, setModalVisivel] = useState(false);
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);
  const [listaNotificacoes, setListaNotificacoes] = useState<Notificacao[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregarPerfil() {
        try {
          setLoading(true);
          const res = await api.get("/user/me");
          setPerfil(res.data);
        } catch (e) {
          console.log("Erro ao carregar perfil:", e);
          setPerfil(user);
        } finally {
          setLoading(false);
        }
      }
      carregarPerfil();
    }, []),
  );

  // Monitora e atualiza o contador do sininho em tempo real (a cada 5 segundos)
  useEffect(() => {
    if (!user?.token) return;

    async function fetchContadorNotificacoes() {
      try {
        const { data } = await api.get("/eventos", {
          headers: { Authorization: `Bearer ${user!.token}` },
        });
        setTotalNotificacoes(data.length);
      } catch (e) {
        console.log("Erro ao atualizar contador de eventos em Insígnias:", e);
      }
    }

    fetchContadorNotificacoes();
    const interval = setInterval(fetchContadorNotificacoes, 5000);
    return () => clearInterval(interval);
  }, [user?.token]);

  // Abre o modal e busca os eventos criados pelo professor
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
      console.log("Erro ao buscar eventos em Insígnias:", e);
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

  const mappedBadges = BADGES.map((badge) => ({
    ...badge,
    unlocked: badge.check(perfil),
  }));

  const unlockedCount = mappedBadges.filter((b) => b.unlocked).length;
  const progressPercent =
    BADGES.length > 0 ? Math.round((unlockedCount / BADGES.length) * 100) : 0;

  const filteredBadges = mappedBadges.filter((badge) =>
    activeCategory === "todas" ? true : badge.category === activeCategory,
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#16C7E7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header atualizado com ação e contador dinâmico */}
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

      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>Insígnias</Text>

          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>Progresso de Insígnias</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {`${unlockedCount}/${BADGES.length} desbloqueadas (${progressPercent}%)`}
            </Text>
          </View>

          <View style={styles.tabsRow}>
            {CATEGORIES.map((category) => {
              const active = category.key === activeCategory;
              return (
                <TouchableOpacity
                  key={category.key}
                  style={[styles.tabButton, active && styles.tabButtonActive]}
                  onPress={() => setActiveCategory(category.key)}
                >
                  <Text
                    style={[styles.tabText, active && styles.tabTextActive]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.badgeGrid}>
            {filteredBadges.map((badge) => (
              <View
                key={badge.id}
                style={[
                  styles.badgeCard,
                  !badge.unlocked && styles.badgeCardLocked,
                ]}
              >
                <View
                  style={[
                    styles.badgeIconWrapper,
                    !badge.unlocked && styles.badgeIconWrapperLocked,
                  ]}
                >
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  {!badge.unlocked && <Text style={styles.badgeLock}>🔒</Text>}
                </View>
                <Text
                  style={[
                    styles.badgeTitle,
                    !badge.unlocked && styles.badgeTitleLocked,
                  ]}
                  numberOfLines={1}
                >
                  {badge.title}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: badge.unlocked ? "#5D708A" : "#3B4A61",
                    textAlign: "center",
                    marginTop: 2,
                    paddingHorizontal: 4,
                  }}
                  numberOfLines={2}
                >
                  {badge.description}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Modal de Exibição das Notificações sincronizadas */}
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
