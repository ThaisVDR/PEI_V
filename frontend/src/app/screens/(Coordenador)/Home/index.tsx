import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { styles } from "../../../../styles/HomeCoordenacao";
import { router, useFocusEffect } from "expo-router";
import api from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext";

interface DashboardResumoDTO {
  totalAlunos: number;
  totalProfessores: number;
  totalCursosAtivos: number;
}

interface CursoResponseDTO {
  idCurso: string;
  nome: string;
  cargaHoraria: string;
  ativo: boolean;
  disciplinas: { idDisciplina: string; nome: string; cargaHoraria: string }[];
}

export default function Home() {
  const { user } = useAuth();
  const [resumo, setResumo] = useState<DashboardResumoDTO>({
    totalAlunos: 0,
    totalProfessores: 0,
    totalCursosAtivos: 0,
  });
  const [cursos, setCursos] = useState<CursoResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (!user?.token) return;

      async function carregar() {
        setCarregando(true);
        try {
          const [resumoRes, cursosRes] = await Promise.all([
            api.get("/coordenacao/dashboard/resumo"),
            api.get("/coordenacao/cursos"),
          ]);
          setResumo(resumoRes.data);
          setCursos(cursosRes.data);
        } catch (error: any) {
          console.log("Erro ao carregar dashboard:", error?.response?.data);
        } finally {
          setCarregando(false);
        }
      }

      carregar();
    }, [user?.token]),
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050E1D" />

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
        style={styles.contentArea}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridInformativo}>
          <View
            style={[
              styles.cardInfo,
              { borderColor: "rgba(22, 199, 231, 0.2)" },
            ]}
          >
            <Feather name="book-open" size={20} color="#16C7E7" />
            <Text style={styles.cardValor}>{resumo.totalCursosAtivos}</Text>
            <Text style={styles.cardLabel}>Cursos Ativos</Text>
          </View>

          <View
            style={[
              styles.cardInfo,
              { borderColor: "rgba(46, 213, 115, 0.2)" },
            ]}
          >
            <Feather name="users" size={20} color="#2ed573" />
            <Text style={styles.cardValor}>{resumo.totalAlunos}</Text>
            <Text style={styles.cardLabel}>Total de Alunos</Text>
          </View>

          <View
            style={[
              styles.cardInfo,
              { borderColor: "rgba(108, 92, 231, 0.2)" },
            ]}
          >
            <Feather name="calendar" size={20} color="#6c5ce7" />
            <Text style={styles.cardValor}>{resumo.totalProfessores}</Text>
            <Text style={styles.cardLabel}>Professores</Text>
          </View>

          <View
            style={[
              styles.cardInfo,
              { borderColor: "rgba(255, 159, 67, 0.2)" },
            ]}
          >
            <Feather name="lock" size={20} color="#ff9f43" />
            <Text style={styles.cardValor}>0</Text>
            <Text style={styles.cardLabel}>Acesso EAD</Text>
          </View>
        </View>

        <Text style={styles.titleAcoes}>Ações</Text>
        <View style={styles.gridAcoes}>
          <TouchableOpacity
            style={[styles.btnAcao, { borderColor: "rgba(46, 213, 115, 0.2)" }]}
            activeOpacity={0.7}
            onPress={() => router.push("/screens/(Coordenador)/Grade")}
          >
            <Feather name="calendar" size={20} color="#2ed573" />
            <Text style={styles.labelAcao}>Montar Grade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnAcao, { borderColor: "rgba(108, 92, 231, 0.2)" }]}
            activeOpacity={0.7}
            onPress={() => router.push("/screens/(Coordenador)/EAD")}
          >
            <Feather name="lock" size={20} color="#6c5ce7" />
            <Text style={styles.labelAcao}>Liberar EAD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cursos Ativos</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/screens/(Coordenador)/Cursos")}
          >
            <Text style={styles.verTodosText}>
              Ver todos <Feather name="chevron-right" size={14} />
            </Text>
          </TouchableOpacity>
        </View>

        {carregando ? (
          <ActivityIndicator
            size="small"
            color="#16C7E7"
            style={{ marginTop: 12 }}
          />
        ) : cursos.length === 0 ? (
          <Text style={styles.cursoDetalhes}>Nenhum curso cadastrado.</Text>
        ) : (
          cursos
            .filter((c) => c.ativo)
            .map((curso) => (
              <View key={curso.idCurso} style={styles.cursoCard}>
                <View style={styles.cursoInfoContainer}>
                  <Text style={styles.cursoNome}>{curso.nome}</Text>
                  <Text style={styles.cursoDetalhes}>
                    {curso.cargaHoraria || "Carga horária não informada"} •{" "}
                    {curso.disciplinas?.length ?? 0} disciplina(s)
                  </Text>
                </View>
                <View style={styles.badgeAtivo}>
                  <Text style={styles.badgeTextActive}>Ativo</Text>
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}
