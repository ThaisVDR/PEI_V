import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../../../styles/Desempenho";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const TURMAS_MOCK = [
  { id: "1", nome: "2A" },
  { id: "2", nome: "2B" },
  { id: "3", nome: "3A" },
];

const ALUNOS_MOCK: Record<string, AlunoDesempenho[]> = {
  "1": [
    {
      id: "a1",
      nome: "Lucas Silva",
      tarefasConcluidas: 8,
      tarefasTotal: 9,
      mediaNotas: 92,
      tarefasPendentes: [],
    },
    {
      id: "a2",
      nome: "Maria Santos",
      tarefasConcluidas: 9,
      tarefasTotal: 9,
      mediaNotas: 88,
      tarefasPendentes: [],
    },
    {
      id: "a3",
      nome: "Ana Costa",
      tarefasConcluidas: 7,
      tarefasTotal: 9,
      mediaNotas: 82,
      tarefasPendentes: [
        {
          id: "t1",
          titulo: "Redação: Sustentabilidade",
          dataEntrega: "2024-06-10",
          resposta:
            "A sustentabilidade é essencial para garantir o equilíbrio do meio ambiente e a qualidade de vida das futuras gerações.",
        },
      ],
    },
    {
      id: "a4",
      nome: "João Oliveira",
      tarefasConcluidas: 6,
      tarefasTotal: 9,
      mediaNotas: 75,
      tarefasPendentes: [
        {
          id: "t2",
          titulo: "Exercícios de Matemática",
          dataEntrega: "2024-06-11",
          resposta:
            "Resolvi os problemas de equações do 2º grau usando Bhaskara e encontrei as raízes corretamente.",
        },
      ],
    },
    {
      id: "a5",
      nome: "Pedro Almeida",
      tarefasConcluidas: 5,
      tarefasTotal: 9,
      mediaNotas: 64,
      tarefasPendentes: [
        {
          id: "t3",
          titulo: "Resumo de História",
          dataEntrega: "2024-06-12",
          resposta:
            "A Revolução Industrial trouxe grandes mudanças econômicas e sociais no século XVIII, iniciando na Inglaterra.",
        },
      ],
    },
  ],
  "2": [
    {
      id: "a6",
      nome: "Carla Mendes",
      tarefasConcluidas: 9,
      tarefasTotal: 9,
      mediaNotas: 95,
      tarefasPendentes: [],
    },
    {
      id: "a7",
      nome: "Rafael Souza",
      tarefasConcluidas: 8,
      tarefasTotal: 9,
      mediaNotas: 84,
      tarefasPendentes: [],
    },
    {
      id: "a8",
      nome: "Isabela Lima",
      tarefasConcluidas: 7,
      tarefasTotal: 9,
      mediaNotas: 76,
      tarefasPendentes: [
        {
          id: "t4",
          titulo: "Estudo de Biologia Celular",
          dataEntrega: "2024-06-10",
          resposta:
            "As células eucarióticas possuem núcleo definido e organelas membranosas, ao contrário das procarióticas.",
        },
      ],
    },
    {
      id: "a9",
      nome: "Felipe Castro",
      tarefasConcluidas: 5,
      tarefasTotal: 9,
      mediaNotas: 58,
      tarefasPendentes: [
        {
          id: "t5",
          titulo: "Análise Literária",
          dataEntrega: "2024-06-09",
          resposta: "",
        },
      ],
    },
  ],
  "3": [
    {
      id: "a10",
      nome: "Beatriz Nunes",
      tarefasConcluidas: 9,
      tarefasTotal: 9,
      mediaNotas: 97,
      tarefasPendentes: [],
    },
    {
      id: "a11",
      nome: "Diego Ferreira",
      tarefasConcluidas: 8,
      tarefasTotal: 9,
      mediaNotas: 89,
      tarefasPendentes: [],
    },
    {
      id: "a12",
      nome: "Larissa Rocha",
      tarefasConcluidas: 6,
      tarefasTotal: 9,
      mediaNotas: 71,
      tarefasPendentes: [
        {
          id: "t6",
          titulo: "Cálculo Diferencial",
          dataEntrega: "2024-06-11",
          resposta:
            "Calculei a derivada de f(x) = x² + 3x usando a regra da potência, obtendo f'(x) = 2x + 3.",
        },
      ],
    },
    {
      id: "a13",
      nome: "Thiago Barros",
      tarefasConcluidas: 4,
      tarefasTotal: 9,
      mediaNotas: 55,
      tarefasPendentes: [
        {
          id: "t7",
          titulo: "Física: Leis de Newton",
          dataEntrega: "2024-06-08",
          resposta:
            "A primeira lei de Newton diz que um corpo em repouso tende a permanecer em repouso.",
        },
      ],
    },
  ],
};

// ─── TIPOS ────────────────────────────────────────────────────────────────────

interface TarefaPendente {
  id: string;
  titulo: string;
  dataEntrega: string;
  resposta?: string;
}

interface AlunoDesempenho {
  id: string;
  nome: string;
  tarefasConcluidas: number;
  tarefasTotal: number;
  mediaNotas: number | null;
  tarefasPendentes: TarefaPendente[];
}

interface AvaliacaoIA {
  nota: number;
  label: string;
  feedback: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function notaColor(nota: number | null): string {
  if (nota === null) return "#5D708A";
  if (nota >= 90) return "#00D2B4";
  if (nota >= 70) return "#F5C542";
  return "#FF6B6B";
}

function conclusaoPercent(aluno: AlunoDesempenho): number {
  if (aluno.tarefasTotal === 0) return 0;
  return Math.round((aluno.tarefasConcluidas / aluno.tarefasTotal) * 100);
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export default function Desempenho() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("1");
  const [alunos, setAlunos] = useState<AlunoDesempenho[]>(ALUNOS_MOCK["1"]);

  const [modalVisible, setModalVisible] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] =
    useState<AlunoDesempenho | null>(null);
  const [tarefaSelecionada, setTarefaSelecionada] =
    useState<TarefaPendente | null>(null);
  const [avaliando, setAvaliando] = useState(false);
  const [avaliacao, setAvaliacao] = useState<AvaliacaoIA | null>(null);

  function selecionarTurma(id: string) {
    setTurmaSelecionada(id);
    setAlunos(ALUNOS_MOCK[id]);
  }

  const mediaGeral = (() => {
    const comNota = alunos.filter((a) => a.mediaNotas !== null);
    if (comNota.length === 0) return null;
    return Math.round(
      comNota.reduce((acc, a) => acc + (a.mediaNotas ?? 0), 0) / comNota.length,
    );
  })();

  const mediaConclusao =
    alunos.length === 0
      ? 0
      : Math.round(
          alunos.reduce((acc, a) => acc + conclusaoPercent(a), 0) /
            alunos.length,
        );

  const faixas = [
    { label: "90-100", min: 90, max: 100, color: "#00D2B4" },
    { label: "80-89", min: 80, max: 89, color: "#4D9EFF" },
    { label: "70-79", min: 70, max: 79, color: "#F5C542" },
    { label: "60-69", min: 60, max: 69, color: "#FF8C42" },
    { label: "< 60", min: 0, max: 59, color: "#FF6B6B" },
  ];

  function countFaixa(min: number, max: number) {
    return alunos.filter(
      (a) =>
        a.mediaNotas !== null && a.mediaNotas >= min && a.mediaNotas <= max,
    ).length;
  }

  const maxFaixaCount = Math.max(
    ...faixas.map((f) => countFaixa(f.min, f.max)),
    1,
  );

  function abrirModal(aluno: AlunoDesempenho, tarefa: TarefaPendente) {
    setAlunoSelecionado(aluno);
    setTarefaSelecionada(tarefa);
    setAvaliacao(null);
    setModalVisible(true);
  }

  // Simula retorno da IA com dados falsos por tarefa
  async function executarAvaliacaoIA() {
    if (!tarefaSelecionada || !alunoSelecionado) return;
    setAvaliando(true);

    const respostasMock: Record<string, AvaliacaoIA> = {
      t1: {
        nota: 87,
        label: "Bom",
        feedback:
          "Boa argumentação e domínio do tema. O texto flui bem e demonstra capacidade crítica. Aprofunde os exemplos práticos.",
      },
      t2: {
        nota: 78,
        label: "Bom",
        feedback:
          "Os exercícios foram resolvidos corretamente com uso adequado da fórmula. Apresente o desenvolvimento com mais detalhes.",
      },
      t3: {
        nota: 72,
        label: "Regular",
        feedback:
          "O resumo abrange os pontos centrais mas carece de profundidade analítica. Inclua datas e figuras históricas relevantes.",
      },
      t4: {
        nota: 85,
        label: "Bom",
        feedback:
          "Boa compreensão de citologia. A comparação entre tipos celulares foi clara e objetiva.",
      },
      t5: {
        nota: 45,
        label: "Insuficiente",
        feedback:
          "A tarefa foi entregue sem conteúdo textual. É necessário desenvolver a análise literária para avaliação completa.",
      },
      t6: {
        nota: 91,
        label: "Excelente",
        feedback:
          "Excelente aplicação da regra da potência. O desenvolvimento foi claro, preciso e bem estruturado.",
      },
      t7: {
        nota: 68,
        label: "Regular",
        feedback:
          "Abordou apenas a primeira lei. Complete com a segunda e terceira lei de Newton para avaliação completa.",
      },
    };

    await new Promise((r) => setTimeout(r, 1800)); // simula latência da API

    const resultado = respostasMock[tarefaSelecionada.id] ?? {
      nota: 75,
      label: "Bom",
      feedback:
        "Resposta satisfatória com boa compreensão do conteúdo proposto.",
    };

    setAvaliacao(resultado);

    setAlunos((prev) =>
      prev.map((a) =>
        a.id === alunoSelecionado.id
          ? {
              ...a,
              tarefasPendentes: a.tarefasPendentes.filter(
                (t) => t.id !== tarefaSelecionada.id,
              ),
              tarefasConcluidas: a.tarefasConcluidas + 1,
              mediaNotas: a.mediaNotas
                ? Math.round((a.mediaNotas + resultado.nota) / 2)
                : resultado.nota,
            }
          : a,
      ),
    );

    setAvaliando(false);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {TURMAS_MOCK.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tab, turmaSelecionada === t.id && styles.tabActive]}
            onPress={() => selecionarTurma(t.id)}
          >
            <Text
              style={[
                styles.tabText,
                turmaSelecionada === t.id && styles.tabTextActive,
              ]}
            >
              {t.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.pageTitle}>Desempenho</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Ionicons name="trending-up" size={14} color="#00D2B4" />
              <Text style={styles.statLabel}>Média</Text>
            </View>
            <Text style={styles.statValue}>
              {mediaGeral !== null ? `${mediaGeral}%` : "—"}
            </Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconRow}>
              <MaterialCommunityIcons
                name="chart-bar"
                size={14}
                color="#4D9EFF"
              />
              <Text style={styles.statLabel}>Conclusão</Text>
            </View>
            <Text style={styles.statValue}>{mediaConclusao}%</Text>
          </View>
        </View>

        {/* Gráfico de barras */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Distribuição de Notas</Text>
          {faixas.map((f) => {
            const count = countFaixa(f.min, f.max);
            const pct = (count / maxFaixaCount) * 100;
            return (
              <View key={f.label} style={styles.faixaRow}>
                <Text style={styles.faixaLabel}>{f.label}</Text>
                <View style={styles.faixaBarBg}>
                  <View
                    style={[
                      styles.faixaBarFill,
                      { width: `${pct}%` as any, backgroundColor: f.color },
                    ]}
                  />
                </View>
                <Text style={[styles.faixaCount, { color: f.color }]}>
                  {count}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Ranking de Alunos</Text>

        {/* Lista de alunos */}
        {alunos
          .slice()
          .sort((a, b) => (b.mediaNotas ?? -1) - (a.mediaNotas ?? -1))
          .map((aluno, index) => {
            const cor = notaColor(aluno.mediaNotas);
            const temPendente = aluno.tarefasPendentes.length > 0;
            return (
              <View key={aluno.id} style={styles.alunoCard}>
                <View style={styles.alunoTop}>
                  <View style={styles.alunoLeft}>
                    {index === 0 ? (
                      <Text style={styles.medalha}>🏆</Text>
                    ) : (
                      <Text style={styles.posicao}>{index + 1}</Text>
                    )}
                    <View>
                      <Text style={styles.alunoNome}>{aluno.nome}</Text>
                      <Text style={styles.alunoSub}>
                        {aluno.tarefasConcluidas}/{aluno.tarefasTotal} tarefas
                      </Text>
                    </View>
                  </View>
                  <View style={styles.alunoRight}>
                    <Text style={[styles.alunoNota, { color: cor }]}>
                      {aluno.mediaNotas !== null ? `${aluno.mediaNotas}%` : "—"}
                    </Text>
                    <Ionicons
                      name={
                        aluno.mediaNotas !== null && aluno.mediaNotas >= 70
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={14}
                      color={cor}
                    />
                  </View>
                </View>

                {temPendente && (
                  <View style={styles.pendentesContainer}>
                    {aluno.tarefasPendentes.map((tarefa) => (
                      <View key={tarefa.id} style={styles.tarefaPendenteRow}>
                        <Text
                          style={styles.tarefaPendenteNome}
                          numberOfLines={1}
                        >
                          {tarefa.titulo}
                        </Text>
                        <TouchableOpacity
                          style={styles.btnIA}
                          onPress={() => abrirModal(aluno, tarefa)}
                        >
                          <MaterialCommunityIcons
                            name="robot-outline"
                            size={13}
                            color="#050E1D"
                          />
                          <Text style={styles.btnIAText}>Avaliar</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.modalTitulo}>{alunoSelecionado?.nome}</Text>
                <Text style={styles.modalTarefa}>
                  {tarefaSelecionada?.titulo}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#5D708A" />
              </TouchableOpacity>
            </View>

            <View style={styles.respostaBox}>
              {tarefaSelecionada?.resposta ? (
                <>
                  <Text style={styles.respostaLabel}>Resposta enviada:</Text>
                  <Text style={styles.respostaTexto}>
                    {tarefaSelecionada.resposta}
                  </Text>
                </>
              ) : (
                <Text style={styles.semResposta}>
                  O aluno realizou a entrega sem resposta de texto.
                </Text>
              )}
            </View>

            {avaliacao && (
              <View style={styles.avaliacaoBox}>
                <View style={styles.avaliacaoHeaderRow}>
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={15}
                    color="#F5C542"
                  />
                  <Text style={styles.avaliacaoHeaderText}>
                    Avaliação Processada
                  </Text>
                </View>
                <Text style={styles.avaliacaoNota}>
                  Nota:{" "}
                  <Text
                    style={{
                      color: notaColor(avaliacao.nota),
                      fontWeight: "bold",
                    }}
                  >
                    {avaliacao.nota}% — {avaliacao.label}
                  </Text>
                </Text>
                <Text style={styles.avaliacaoFeedback}>
                  {avaliacao.feedback}
                </Text>
                <View style={styles.avaliacaoBtns}>
                  <TouchableOpacity
                    style={styles.btnConcordar}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="checkmark" size={15} color="#00D2B4" />
                    <Text style={styles.btnConcordarText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!avaliacao && (
              <TouchableOpacity
                style={[styles.btnAvaliarIA, avaliando && { opacity: 0.6 }]}
                onPress={executarAvaliacaoIA}
                disabled={avaliando}
              >
                {avaliando ? (
                  <ActivityIndicator color="#050E1D" size="small" />
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name="robot-outline"
                      size={16}
                      color="#050E1D"
                    />
                    <Text style={styles.btnAvaliarIAText}>
                      Gerar Nota com IA
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
