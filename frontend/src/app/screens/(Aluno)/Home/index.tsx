import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StreakCard from "../../../../components/Streak/streakCard";
import { useTarefas } from "../../../../hooks/useTasks";
import {styles} from "../../../../styles/HomeAluno";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({ streakAtual: 0 });
  const userId = "MUDE_PELO_UUID_DO_USUARIO_LOGADO";

  const {
    tarefasPendentes,
    totalTarefas,
    totalConcluidas,
    progressoSemanal,
    concluirTarefa,
    carregarTarefas,
  } = useTarefas();

  useEffect(() => {
    carregarTarefas();
  }, []);

  const handleCompletarQuestao = async () => {
    try {
      const response = await fetch(
        `http://192.168.18.68:8080/auth/streak/${userId}?novosPontos=150`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserData({ streakAtual: data.streakAtual });
        Alert.alert("Parabéns!", "Questão respondida! Sua ofensiva foi atualizada.");
      } else {
        Alert.alert("Erro", data.mensagem || "Erro ao atualizar os dados.");
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    }
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
        <StreakCard streak={userData.streakAtual} />

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
                onPress={() => tarefa.id != null && concluirTarefa(String(tarefa.id))}
              >
                {/* Checkbox */}
                <View style={styles.checkbox} />

                {/* Conteúdo */}
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
                    <Text style={styles.atrasadaText}>Atrasada!</Text>
                  </View>
                </View>
                {tarefa.pontos && (
                  <Text style={styles.pontos}>+{tarefa.pontos}</Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

