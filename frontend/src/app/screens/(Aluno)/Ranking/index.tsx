import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { useAuth } from "../../../../context/AuthContext";
import { styles } from "../../../../styles/Ranking";
import api from "../../../../services/api";
import { Ionicons } from "@expo/vector-icons";

interface RankingDTO {
  nome: string;
  xpTotal: number;
  nivel: number;
  posicao?: number;
  tipoUsuario?: string;
}

interface UserRankingResponseDTO {
  top10: RankingDTO[];
  usuarioAtual: RankingDTO;
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

function RankRow({
  item,
  isCurrentUser,
  index,
}: {
  item: RankingDTO;
  isCurrentUser: boolean;
  index: number;
}) {
  const iniciais = item.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View style={[styles.row, isCurrentUser && styles.rowHighlight]}>
      <Text style={styles.posicao}>#{item.posicao ?? index + 1}</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{iniciais}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.cargo}>Nível {item.nivel}</Text>
      </View>
      <Text style={styles.pontos}>{item.xpTotal} XP</Text>
    </View>
  );
}

export default function Rankings() {
  const { user } = useAuth();
  const [ranking, setRanking] = useState<UserRankingResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  // Estados dinâmicos das notificações
  const [modalVisivel, setModalVisivel] = useState(false);
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);
  const [listaNotificacoes, setListaNotificacoes] = useState<Notificacao[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (user?.token) {
        carregarRanking();
      }
    }, [user]),
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
        console.log("Erro ao atualizar contador em Rankings:", e);
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
      console.log("Erro ao buscar eventos em Rankings:", e);
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

  async function carregarRanking() {
    try {
      setLoading(true);
      setErro(false);
      const { data } = await api.get("/user/ranking", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setRanking(data);
    } catch (error: any) {
      console.log(error?.response?.data || error);
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00d2b4" />
      </SafeAreaView>
    );
  }

  if (erro || !ranking) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#FFF", textAlign: "center" }}>
          {erro ? "Erro ao carregar o ranking." : "Nenhum ranking encontrado."}
        </Text>
      </SafeAreaView>
    );
  }

  const { top10, usuarioAtual } = ranking;
  const alunos = top10
    .filter((item) => item.tipoUsuario === "Aluno" || !item.tipoUsuario)
    .sort((a, b) => b.xpTotal - a.xpTotal);

  return (
    <SafeAreaView style={styles.container}>
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

      <Text style={styles.pageTitle}>Ranking</Text>

      <FlatList
        data={alunos}
        keyExtractor={(item, index) => `${item.nome}-${index}`}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RankRow
            item={item}
            index={index}
            isCurrentUser={item.nome === usuarioAtual.nome}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: "#5D708A", textAlign: "center" }}>
            Ainda não há alunos no ranking.
          </Text>
        }
      />

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
    </SafeAreaView>
  );
}
