import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

import api from "../../../../services/api";
import { styles } from "../../../../styles/Tasks";
import TaskFilterTabs, { TaskFilter } from "../../../../components/pill/pill";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter, useFocusEffect } from "expo-router";
import { useAuth } from "../../../../context/AuthContext";

interface Tarefa {
  id: string;
  titulo: string;
  objetivo: string;
  dataEntrega: string;
  concluida: boolean;
  pontos?: number;
}

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

export default function Tasks() {
  const [filter, setFilter] = useState<TaskFilter>("todas");
  const [loading, setLoading] = useState(true);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  // Estados dinâmicos das notificações
  const [modalVisivel, setModalVisivel] = useState(false);
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);
  const [listaNotificacoes, setListaNotificacoes] = useState<Notificacao[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();

      const interval = setInterval(() => {
        atualizarTarefasSilenciosamente();
      }, 10000);

      return () => clearInterval(interval);
    }, []),
  );

  useEffect(() => {
    if (!user?.token) return;

    async function fetchContadorNotificacoes() {
      try {
        const { data } = await api.get("/eventos", {
          headers: { Authorization: `Bearer ${user!.token}` },
        });
        setTotalNotificacoes(data.length);
      } catch (e) {
        console.log("Erro ao atualizar contador em Tasks:", e);
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
      console.log("Erro ao buscar eventos em Tasks:", e);
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

  async function carregarTarefas() {
    try {
      setLoading(true);
      const { data } = await api.get("/tarefas");

      const tarefasMapeadas: Tarefa[] = data.map((item: any) => ({
        id: item.id,
        titulo: item.titulo,
        objetivo: item.descricao || item.objetivo || "",
        dataEntrega: item.prazo || item.dataEntrega || "",
        concluida: item.concluida,
        pontos: item.pontos,
      }));

      setTarefas(tarefasMapeadas);
    } catch (error: any) {
      console.log(error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  }

  async function atualizarTarefasSilenciosamente() {
    try {
      const { data } = await api.get("/tarefas");
      const tarefasMapeadas: Tarefa[] = data.map((item: any) => ({
        id: item.id,
        titulo: item.titulo,
        objetivo: item.descricao || item.objetivo || "",
        dataEntrega: item.prazo || item.dataEntrega || "",
        concluida: item.concluida,
        pontos: item.pontos,
      }));
      setTarefas(tarefasMapeadas);
    } catch (error) {
      console.log("Erro na atualização automática:", error);
    }
  }

  async function concluirTarefa(id: string) {
    try {
      await api.patch(`/tarefas/${id}/concluir`);
      setTarefas((prev) =>
        prev.map((tarefa) =>
          tarefa.id === id
            ? { ...tarefa, concluida: !tarefa.concluida }
            : tarefa,
        ),
      );
    } catch (error: any) {
      console.log(error?.response?.data || error);
    }
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filter === "pendentes") return !tarefa.concluida;
    if (filter === "concluidas") return tarefa.concluida;
    return true;
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00d2b4" />
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
      <Text style={styles.pageTitle}>Tarefas</Text>

      <TaskFilterTabs activeFilter={filter} onFilterChange={setFilter} />

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {tarefasFiltradas.length === 0 && (
          <Text style={{ color: "#FFF", textAlign: "center", marginTop: 30 }}>
            Nenhuma tarefa encontrada.
          </Text>
        )}

        {tarefasFiltradas.map((tarefa) => (
          <View key={tarefa.id} style={styles.card}>
            <View style={styles.cardRow}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  tarefa.concluida && styles.checkboxActive,
                ]}
                activeOpacity={0.7}
                onPress={() => concluirTarefa(tarefa.id)}
              >
                {tarefa.concluida && <View style={styles.checkboxTick} />}
              </TouchableOpacity>

              <View style={styles.cardContent}>
                <Text
                  style={[
                    styles.cardTitle,
                    tarefa.concluida && styles.cardTitleDone,
                  ]}
                  numberOfLines={1}
                >
                  {tarefa.titulo}
                </Text>
                <Text style={styles.cardObjective} numberOfLines={2}>
                  {tarefa.objetivo || "Sem descrição"}
                </Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>
                    Prazo:{" "}
                    {tarefa.dataEntrega
                      ? new Date(tarefa.dataEntrega).toLocaleDateString("pt-BR")
                      : "Sem prazo"}
                  </Text>
                  {tarefa.pontos !== undefined && (
                    <Text
                      style={[
                        styles.metaText,
                        { color: "#00d2b4", fontWeight: "700" },
                      ]}
                    >
                      +{tarefa.pontos} XP
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.resolverBtn,
                  tarefa.concluida && styles.resolverBtnConcluido,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  router.push({
                    pathname: "../TaskDetails",
                    params: {
                      id: tarefa.id,
                      titulo: tarefa.titulo,
                      descricao: tarefa.objetivo,
                      dataEntrega: tarefa.dataEntrega,
                      pontos: String(tarefa.pontos || 0),
                      concluida: String(tarefa.concluida),
                    },
                  });
                }}
              >
                {tarefa.concluida ? (
                  <Ionicons name="chevron-forward" size={18} color="#8a99b8" />
                ) : (
                  <>
                    <Ionicons name="flash" size={14} color="#050E1D" />
                    <Text style={styles.resolverBtnText}>Resolver</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
