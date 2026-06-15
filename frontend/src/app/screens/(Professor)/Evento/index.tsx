import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useAuth } from "../../../../context/AuthContext";
import { API_URL } from "../../../../services/api";
import { styles } from "../../../../styles/EventoProfessor";

interface Evento {
  id: string;
  tituloEvento: string;
  descricaoEvento: string;
  dataEvento: string;
  tipo: "reuniao" | "aviso" | "comunicado" | "importante";
  lido: boolean;
  disciplina: string;
  turma: string;
  nomeProfessor: string;
}

const corTipo = (tipo: string) => {
  switch (tipo) {
    case "importante":
      return "#FF5A5A";
    case "reuniao":
      return "#00d2b4";
    case "aviso":
      return "#FFB547";
    case "comunicado":
      return "#16C7E7";
    default:
      return "#7C8DB5";
  }
};

const iconeTipo = (tipo: string) => {
  switch (tipo) {
    case "reuniao":
      return "calendar";
    case "aviso":
      return "alert-triangle";
    case "comunicado":
      return "message-square";
    case "importante":
      return "alert-circle";
    default:
      return "bell";
  }
};

export default function EventoProfessor() {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState<"Todos" | "NaoLidos">("Todos");
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarEventos = useCallback(async () => {
    if (!user?.token || !user?.idUsuario) return;
    try {
      const res = await fetch(`${API_URL}/eventos`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        const data: Evento[] = await res.json();
        setEventos(data);
      } else {
        setEventos([]);
      }
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
      setEventos([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  const onRefresh = () => {
    setRefreshing(true);
    carregarEventos();
  };

  const dadosFiltrados = eventos.filter((ev) =>
    filtro === "NaoLidos" ? !ev.lido : true,
  );

  const totalNaoLidos = eventos.filter((ev) => !ev.lido).length;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#050E1D",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#00d2b4" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <Text style={styles.headerTitle}>Eventos da Coordenação</Text>

      <View style={styles.filterRow}>
        {(["Todos", "NaoLidos"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filtro === f && styles.filterBtnActive]}
            onPress={() => setFiltro(f)}
          >
            <Text
              style={[
                styles.filterBtnText,
                filtro === f && styles.filterBtnTextActive,
              ]}
            >
              {f === "NaoLidos" ? `Não Lidos (${totalNaoLidos})` : "Todos"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00d2b4"
          />
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              !item.lido && { borderColor: corTipo(item.tipo) + "44" },
            ]}
          >
            <View style={styles.cardTop}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: corTipo(item.tipo) + "18" },
                ]}
              >
                <Feather
                  name={iconeTipo(item.tipo) as any}
                  size={18}
                  color={corTipo(item.tipo)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitulo} numberOfLines={1}>
                  {item.tituloEvento}
                </Text>
                <Text style={styles.cardDesc} numberOfLines={2}>
                  {item.descricaoEvento}
                </Text>
              </View>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: item.lido
                      ? "transparent"
                      : corTipo(item.tipo),
                  },
                ]}
              />
            </View>

            <View style={styles.cardFooter}>
              <View
                style={[
                  styles.tipoBadge,
                  {
                    borderColor: corTipo(item.tipo),
                    backgroundColor: corTipo(item.tipo) + "18",
                  },
                ]}
              >
                <Text
                  style={[styles.tipoBadgeText, { color: corTipo(item.tipo) }]}
                >
                  {item.tipo?.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.cardMeta}>
                {item.disciplina} • {item.turma}
              </Text>
              <Text style={styles.cardData}>
                {item.dataEvento
                  ? new Date(item.dataEvento).toLocaleDateString("pt-BR")
                  : "—"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#1a2d4a" />
            <Text style={styles.emptyText}>Nenhum evento encontrado.</Text>
            <Text style={styles.emptySubText}>
              Puxe para baixo para atualizar.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
