import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StreakCard from "../../../../components/Streak/streakCard";
import { useTarefas } from "../../../../hooks/useTasks";
import api from "../../../../services/api"; 
import { styles } from "../../../../styles/HomeAluno";

export default function Home() {
  const router = useRouter();

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

  const executarCheckinDiario = async () => {
    try {
      const response = await api.post("/checkin");

      if (
        response &&
        response.data &&
        typeof response.data.streakAtual !== "undefined"
      ) {
        setUserData(response.data);
        console.log(
          "=== OFENSIVA DUOLINGO ATUALIZADA POR ACESSO ===",
          response.data.streakAtual,
        );
      }
    } catch (error: any) {
      const mensagemErro =
        error?.response?.data?.message || error?.message || "Erro desconhecido";
      const statusErro = error?.response?.status || "Sem status";

      console.warn(
        `[Streak Checkin] Falha silenciosa (${statusErro}): ${mensagemErro}`,
      );
    }
  };

  useEffect(() => {
    carregarTarefas();
    executarCheckinDiario();
  }, []);

  const verificarCheckinHoje = () => {
    if (!userData.ultimoCheckinEm) return false;

    const dataUltimoCheckin = new Date(userData.ultimoCheckinEm).toDateString();
    const dataHoje = new Date().toDateString();

    return dataUltimoCheckin === dataHoje;
  };

  const tarefasHome = tarefasPendentes.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity onPress={() => router.push("../Tasks/index")}>
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
                onPress={() => {
                  if (tarefa.id != null) {
                    router.push(`../Tasks/${tarefa.id}`);
                  }
                }}
              >
                <View style={styles.checkbox} />
                <View style={styles.tarefaContent}>
                  <Text style={styles.tarefaTitulo} numberOfLines={2}>
                    {tarefa.titulo}
                  </Text>
                  <View style={styles.tarefaMeta}>
                    {tarefa.categoria && (
                      <View style={styles.categoriaBadge}>
                        <Text style={styles.categoriaText}>
                          {tarefa.categoria}
                        </Text>
                      </View>
                    )}
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
  );
}
