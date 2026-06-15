import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../../../styles/HomeProfessor";
import { router } from "expo-router";

// ── Tipos ────────────────────────────────────────────────
interface PendingItem {
  id: string;
  titulo: string;
  turma: string;
  prazo: string;
  pendentes: number;
}

interface TurmaItem {
  id: string;
  nome: string;
  alunos: number;
  tarefas: number;
  conclusao: number;
  media: string;
}

// ── Dados de exemplo ─────────────────────────────────────
const pendentes: PendingItem[] = [
  {
    id: "1",
    titulo: "Quiz – Normalização de Banco de Dados",
    turma: "Banco de Dados - 2B",
    prazo: "Até 23 Mar 2026",
    pendentes: 12,
  },
  {
    id: "2",
    titulo: "Diagrama UML do Projeto Final",
    turma: "Engenharia de Software - 2A",
    prazo: "Até 25 Mar 2026",
    pendentes: 8,
  },
];

const turmas: TurmaItem[] = [
  {
    id: "1",
    nome: "Engenharia de Software - 2A",
    alunos: 28,
    tarefas: 3,
    conclusao: 85,
    media: "78%",
  },
  {
    id: "2",
    nome: "Banco de Dados - 2B",
    alunos: 55,
    tarefas: 8,
    conclusao: 62,
    media: "71%",
  },
];

export default function HomeProfessor() {
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
          <Ionicons name="notifications" size={28} color="#5D708A" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="people" size={14} color="#5D708A" />
              <Text style={styles.statLabel}>Alunos</Text>
            </View>
            <Text style={styles.statValue}>83</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="trending-up" size={14} color="#5D708A" />
              <Text style={styles.statLabel}>Média</Text>
            </View>
            <Text style={styles.statValue}>77%</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="time" size={14} color="#5D708A" />
              <Text style={styles.statLabel}>Avaliar</Text>
            </View>
            <Text style={styles.statValue}>35</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pendentes de Avaliação</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Ver todas &gt;</Text>
          </TouchableOpacity>
        </View>

        {pendentes.map((item) => (
          <TouchableOpacity key={item.id} style={styles.pendingCard}>
            <View style={styles.pendingInfo}>
              <Text style={styles.pendingTitle} numberOfLines={1}>
                {item.titulo}
              </Text>
              <Text style={styles.pendingClass}>{item.turma}</Text>
              <View style={styles.pendingDeadlineRow}>
                <Ionicons name="time-outline" size={12} color="#5D708A" />
                <Text style={styles.pendingDeadline}>{item.prazo}</Text>
              </View>
            </View>
            <View style={styles.pendingBadge}>
              <Ionicons name="time" size={14} color="#ff4757" />
              <Text style={styles.pendingBadgeText}>{item.pendentes}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Minhas Turmas</Text>
          <TouchableOpacity
            onPress={() => router.push("/screens/(Professor)/Desempenho")}
          >
            <Text style={styles.sectionLink}>Desempenho &gt;</Text>
          </TouchableOpacity>
        </View>

        {turmas.map((turma) => (
          <View key={turma.id} style={styles.turmaCard}>
            <View style={styles.turmaHeader}>
              <Text style={styles.turmaNome}>{turma.nome}</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#5D708A"
                style={styles.turmaChevron}
              />
            </View>

            <View style={styles.turmaInfoRow}>
              <View style={styles.turmaInfoItem}>
                <Ionicons name="people-outline" size={13} color="#5D708A" />
                <Text style={styles.turmaInfoText}>{turma.alunos} alunos</Text>
              </View>
              <View style={styles.turmaInfoItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={13}
                  color="#5D708A"
                />
                <Text style={styles.turmaInfoText}>
                  {turma.tarefas} tarefas
                </Text>
              </View>
            </View>

            <View style={styles.progressLabel}>
              <Text style={styles.progressLabelText}>Conclusão</Text>
              <Text style={styles.progressLabelValue}>{turma.conclusao}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${turma.conclusao}%` }]}
              />
            </View>

            <View style={styles.turmaMediaRow}>
              <Ionicons name="trending-up" size={13} color="#00d2b4" />
              <Text style={styles.turmaMediaText}>Média: {turma.media}</Text>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}
