import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StreakCard from "../../../../components/Streak/streakCard";
import { useTarefas } from "../../../../hooks/useTasks";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../services/api";
import { styles } from "../../../../styles/HomeAluno";

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  criadaEm: string;
}

// Formata a data recebida do evento (ex: "2026-06-14T20:00:00")
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

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const [userData, setUserData] = useState({
    streakAtual: 0,
    maiorStreak: 0,
    ultimoCheckinEm: null,
    nivel: 1,
    xpTotal: 0,
  });

  const {
    tarefasPendentes,
    totalTarefas,
    totalConcluidas,
    progressoSemanal,
    carregarTarefas,
  } = useTarefas();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);
  const [listaNotificacoes, setListaNotificacoes] = useState<Notificacao[]>([]);

  const executarCheckinDiario = async () => {
    if (!user?.token) return;
    try {
      const response = await api.post(
        "/checkin",
        {},
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      if (response?.data && typeof response.data.streakAtual !== "undefined") {
        setUserData(response.data);
      }
    } catch (error: any) {
      console.warn(`[Streak Checkin] Falha silenciosa`);
    }
  };

  useEffect(() => {
    carregarTarefas();
    executarCheckinDiario();
  }, [user?.token]);

  const verificarCheckinHoje = () => {
    if (!userData.ultimoCheckinEm) return false;
    return (
      new Date(userData.ultimoCheckinEm).toDateString() ===
      new Date().toDateString()
    );
  };

  const tarefasHome = tarefasPendentes.slice(0, 3);

  // Busca os eventos da mesma rota que o professor publica
  const abrirModalNotificacoes = async () => {
    setModalVisivel(true);
    if (!user?.token) return;

    try {
      const { data } = await api.get("/eventos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Mapeia os campos do seu modelo Java (Evento) para o formato do componente
      const eventosMapeados = data.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(),
        titulo: item.tituloEvento || "Novo Evento",
        mensagem: item.descricaoEvento || "",
        criadaEm: item.dataEvento || new Date().toISOString(),
      }));

      setListaNotificacoes(eventosMapeados);
    } catch (e) {
      console.log("Erro ao buscar eventos para o aluno:", e);
    }
  };

  // Mantém o sininho atualizado com a quantidade de eventos ativos
  useEffect(() => {
    if (!user?.token) return;

    async function fetchContadorNotificacoes() {
      try {
        const { data } = await api.get("/eventos", {
          headers: { Authorization: `Bearer ${user!.token}` },
        });
        setTotalNotificacoes(data.length);
      } catch (e) {
        console.log("Erro ao atualizar contador de eventos:", e);
      }
    }

    fetchContadorNotificacoes();
    const interval = setInterval(fetchContadorNotificacoes, 5000);
    return () => clearInterval(interval);
  }, [user?.token]);

  const obterIcone = (titulo: string) => {
    const t = titulo.toLowerCase();
    if (t.includes("urgente") || t.includes("prazo") || t.includes("prova"))
      return { name: "alarm", color: "#FF5B73" };
    if (t.includes("aviso") || t.includes("importante"))
      return { name: "megaphone", color: "#A85CFF" };
    return { name: "document-text", color: "#4EA3FF" };
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
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

        {/* Restante do conteúdo da Home (Gemas, Tarefas, etc) */}
        <View style={styles.content}>
          <StreakCard
            streak={userData.streakAtual}
            maiorStreak={userData.maiorStreak}
            checkinHoje={verificarCheckinHoje()}
          />

          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Progresso Semanal</Text>
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${Math.round(progressoSemanal * 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressLabel}>
                {totalConcluidas}/{totalTarefas} tarefas concluídas
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tarefas Pendentes</Text>
              <TouchableOpacity
                onPress={() => router.push("/screens/(Aluno)/Tasks")}
              >
                <Text style={styles.verTodas}>Ver todas →</Text>
              </TouchableOpacity>
            </View>

            {tarefasHome.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma tarefa pendente 🎉</Text>
            ) : (
              tarefasHome.map((tarefa, index) => (
                <TouchableOpacity
                  key={tarefa.id ?? index}
                  style={styles.tarefaCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    tarefa.id != null && router.push(`../Tasks/${tarefa.id}`)
                  }
                >
                  <View style={styles.checkbox} />
                  <View style={styles.tarefaContent}>
                    <Text style={styles.tarefaTitulo} numberOfLines={2}>
                      {tarefa.titulo}
                    </Text>
                    <View style={styles.tarefaMeta}>
                      <Text style={styles.atrasadaText}>Pendente</Text>
                    </View>
                  </View>
                  {tarefa.pontos && (
                    <Text style={styles.pontos}>+{tarefa.pontos} XP</Text>
                  )}
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <View style={modalStyles.header}>
              <Text style={modalStyles.headerTitle}>
                Notificações de Eventos
              </Text>
              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={() => setModalVisivel(false)}
              >
                <Ionicons name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            {listaNotificacoes.length === 0 ? (
              <View style={modalStyles.emptyContainer}>
                <Text style={modalStyles.emptyText}>
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
                    <View style={modalStyles.card}>
                      <View
                        style={[
                          modalStyles.iconContainer,
                          { backgroundColor: icone.color + "15" },
                        ]}
                      >
                        <Ionicons
                          name={icone.name as any}
                          size={24}
                          color={icone.color}
                        />
                      </View>
                      <View style={modalStyles.textContent}>
                        <Text style={modalStyles.cardTitle}>{item.titulo}</Text>
                        <Text style={modalStyles.cardBody}>
                          {item.mensagem}
                        </Text>
                        <Text style={modalStyles.cardTime}>
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

// Estilos customizados para o Modal Escuro
const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#051329",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "85%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0A2347",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  closeButton: {
    backgroundColor: "#0F2B54",
    padding: 6,
    borderRadius: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#0A1F3D",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#3AC3FF",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 14,
    color: "#A2B6D0",
    marginBottom: 6,
    lineHeight: 18,
  },
  cardTime: {
    fontSize: 12,
    color: "#5D708A",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#5D708A",
    fontSize: 16,
  },
});
