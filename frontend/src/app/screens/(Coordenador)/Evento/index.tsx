import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API_URL } from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext";
import { styles } from "../../../../styles/CriarEvento";

interface Professor {
  idUsuario: string;
  nome: string;
}
interface Turma {
  idTurma: string;
  nome: string;
}
interface Evento {
  id?: string;
  disciplina: string;
  idProfessor: string;
  nomeProfessor: string;
  turma: string;
  semestre: string;
  tituloEvento?: string;
  descricaoEvento?: string;
  dataEvento?: string;
  tipo: "reuniao" | "aviso" | "comunicado" | "importante";
  lido: boolean;
}

const TIPOS = ["reuniao", "aviso", "comunicado", "importante"] as const;

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

export default function CriarEvento() {
  const { user } = useAuth();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
  };

  const [professores, setProfessores] = useState<Professor[]>([]);
  const [professorSelecionado, setProfessorSelecionado] =
    useState<Professor | null>(null);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [carregando, setCarregando] = useState(true);

  const [tituloEvento, setTituloEvento] = useState("");
  const [descricaoEvento, setDescricaoEvento] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [tipoEvento, setTipoEvento] = useState<(typeof TIPOS)[number]>("aviso");
  const [dataEvento, setDataEvento] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [deletando, setDeletando] = useState<string | null>(null);

  const [modalProfessor, setModalProfessor] = useState(false);
  const [modalTurma, setModalTurma] = useState(false);

  useEffect(() => {
    carregarDados();
  }, [user]);

  async function carregarDados() {
    if (!user?.token) return;
    setCarregando(true);
    try {
      const [resProf, resTurmas, resEventos] = await Promise.all([
        fetch(`${API_URL}/coordenacao/professores`, { headers }),
        fetch(`${API_URL}/coordenacao/turmas`, { headers }),
        fetch(`${API_URL}/eventos`, { headers }),
      ]);
      if (resProf.ok) {
        const profs: Professor[] = await resProf.json();
        setProfessores(profs);
        if (profs.length > 0) setProfessorSelecionado(profs[0]);
      }
      if (resTurmas.ok) {
        const ts: Turma[] = await resTurmas.json();
        const ativas = ts.filter((t: any) => t.ativa !== false);
        setTurmas(ativas);
        if (ativas.length > 0) setTurmaSelecionada(ativas[0]);
      }
      if (resEventos.ok) setEventos(await resEventos.json());
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setCarregando(false);
    }
  }

  async function handleCriarEvento() {
    if (!tituloEvento.trim() || !descricaoEvento.trim()) {
      Alert.alert("Atenção", "Preencha o título e a descrição.");
      return;
    }
    if (!professorSelecionado || !turmaSelecionada) {
      Alert.alert("Atenção", "Selecione professor e turma.");
      return;
    }
    setEnviando(true);
    try {
      // 1. Cria o evento principal
      const res = await fetch(`${API_URL}/eventos`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          disciplina: disciplina.trim() || "Geral",
          idProfessor: professorSelecionado.idUsuario,
          nomeProfessor: professorSelecionado.nome,
          turma: turmaSelecionada.nome,
          semestre: "1º Semestre",
          tituloEvento,
          descricaoEvento,
          dataEvento: dataEvento.toISOString(),
          tipo: tipoEvento,
          lido: false,
        }),
      });

      if (res.ok) {
        const salvo: Evento = await res.json();
        setEventos([salvo, ...eventos]);

        // 2. Dispara a criação automática da Notificação na API para o Aluno/Turma
        try {
          await fetch(`${API_URL}/api/notificacoes`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              titulo: `Novo Evento: ${tituloEvento}`,
              mensagem: descricaoEvento,
              idUsuario: professorSelecionado.idUsuario, // Substitua pelo ID do aluno alvo ou trate de forma global no back-end
            }),
          });
        } catch (errNotif) {
          console.log(
            "Erro secundário ao gerar registro de notificação:",
            errNotif,
          );
        }

        setTituloEvento("");
        setDescricaoEvento("");
        setDisciplina("");
        Alert.alert("✅ Sucesso", "Evento criado e notificação emitida!");
      } else {
        Alert.alert("Erro", `Falha ao salvar evento: ${res.status}`);
      }
    } catch {
      Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor.");
    } finally {
      setEnviando(false);
    }
  }

  function confirmarDelete(id: string, titulo: string) {
    Alert.alert(
      "Excluir Evento",
      `Tem certeza que deseja excluir "${titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => handleDeletar(id),
        },
      ],
    );
  }

  async function handleDeletar(id: string) {
    setDeletando(id);
    try {
      const res = await fetch(`${API_URL}/eventos/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok || res.status === 204) {
        setEventos((prev) => prev.filter((e) => e.id !== id));
      } else {
        Alert.alert("Erro", "Não foi possível excluir o evento.");
      }
    } catch {
      Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor.");
    } finally {
      setDeletando(null);
    }
  }

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
          {eventos.length > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{eventos.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.contentArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Criar Evento</Text>

        <Text style={styles.label}>Título do Evento *</Text>
        <TextInput
          style={styles.input}
          value={tituloEvento}
          onChangeText={setTituloEvento}
          placeholder="Ex: Reunião de Pais e Mestres"
          placeholderTextColor="#5D708A"
        />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={descricaoEvento}
          onChangeText={setDescricaoEvento}
          placeholder="Descreva os detalhes do evento..."
          placeholderTextColor="#5D708A"
        />

        <Text style={styles.label}>Disciplina</Text>
        <TextInput
          style={styles.input}
          value={disciplina}
          onChangeText={setDisciplina}
          placeholder="Ex: Banco de Dados"
          placeholderTextColor="#5D708A"
        />

        <Text style={styles.label}>Tipo de Evento</Text>
        <View style={styles.tipoRow}>
          {TIPOS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.tipoButton,
                tipoEvento === t && {
                  backgroundColor: corTipo(t),
                  borderColor: corTipo(t),
                },
              ]}
              onPress={() => setTipoEvento(t)}
            >
              <Text
                style={[
                  styles.tipoButtonText,
                  tipoEvento === t && { color: "#050E1D" },
                ]}
              >
                {t.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Professor Responsável *</Text>
        <TouchableOpacity
          style={styles.pickerFake}
          onPress={() => setModalProfessor(true)}
          disabled={carregando}
        >
          <Text style={styles.pickerFakeText}>
            {carregando
              ? "Carregando..."
              : professorSelecionado?.nome || "Selecione"}
          </Text>
          <Feather name="chevron-down" size={16} color="#7C8DB5" />
        </TouchableOpacity>

        <Text style={styles.label}>Turma Alvo *</Text>
        <TouchableOpacity
          style={styles.pickerFake}
          onPress={() => setModalTurma(true)}
          disabled={carregando}
        >
          <Text style={styles.pickerFakeText}>
            {carregando
              ? "Carregando..."
              : turmaSelecionada?.nome || "Selecione"}
          </Text>
          <Feather name="chevron-down" size={16} color="#7C8DB5" />
        </TouchableOpacity>

        <Text style={styles.label}>Data do Evento</Text>
        <TouchableOpacity
          style={styles.pickerFake}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.pickerFakeText}>
            {dataEvento.toLocaleDateString("pt-BR")}
          </Text>
          <Feather name="calendar" size={16} color="#7C8DB5" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dataEvento}
            mode="date"
            display="default"
            onChange={(_, date) => {
              setShowDatePicker(false);
              if (date) setDataEvento(date);
            }}
          />
        )}

        <TouchableOpacity
          style={[styles.btnSubmit, enviando && { opacity: 0.6 }]}
          activeOpacity={0.8}
          disabled={enviando}
          onPress={handleCriarEvento}
        >
          {enviando ? (
            <ActivityIndicator color="#050E1D" />
          ) : (
            <>
              <Feather name="send" size={18} color="#050E1D" />
              <Text style={styles.btnSubmitText}>Emitir Evento</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Histórico ({eventos.length})</Text>

        {eventos.map((item) => (
          <View
            key={item.id || Math.random().toString()}
            style={styles.cardEvento}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <View
                style={[
                  styles.tipoBadge,
                  {
                    backgroundColor: corTipo(item.tipo) + "22",
                    borderColor: corTipo(item.tipo),
                  },
                ]}
              >
                <Text
                  style={[styles.tipoBadgeText, { color: corTipo(item.tipo) }]}
                >
                  {item.tipo?.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.cardData}>
                {item.dataEvento
                  ? new Date(item.dataEvento).toLocaleDateString("pt-BR")
                  : "—"}
              </Text>
              {/* Botão de deletar */}
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() =>
                  confirmarDelete(item.id!, item.tituloEvento || "este evento")
                }
                disabled={deletando === item.id}
              >
                {deletando === item.id ? (
                  <ActivityIndicator size="small" color="#FF5A5A" />
                ) : (
                  <Feather name="trash-2" size={16} color="#FF5A5A" />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitulo}>{item.tituloEvento}</Text>
            <Text style={styles.cardDesc}>{item.descricaoEvento}</Text>
            <Text style={styles.cardMeta}>
              {item.disciplina} • {item.turma} • {item.nomeProfessor}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Modal Professor */}
      <Modal
        visible={modalProfessor}
        transparent
        animationType="slide"
        onRequestClose={() => setModalProfessor(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecionar Professor</Text>
              <TouchableOpacity onPress={() => setModalProfessor(false)}>
                <Feather name="x" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={professores}
              keyExtractor={(i) => i.idUsuario}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setProfessorSelecionado(item);
                    setModalProfessor(false);
                  }}
                >
                  <Feather name="user" size={16} color="#16C7E7" />
                  <Text style={styles.modalItemText}>{item.nome}</Text>
                  {professorSelecionado?.idUsuario === item.idUsuario && (
                    <Feather
                      name="check"
                      size={16}
                      color="#00d2b4"
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhum professor encontrado.
                </Text>
              }
            />
          </View>
        </View>
      </Modal>

      {/* Modal Turma */}
      <Modal
        visible={modalTurma}
        transparent
        animationType="slide"
        onRequestClose={() => setModalTurma(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecionar Turma</Text>
              <TouchableOpacity onPress={() => setModalTurma(false)}>
                <Feather name="x" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={turmas}
              keyExtractor={(i) => i.idTurma}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setTurmaSelecionada(item);
                    setModalTurma(false);
                  }}
                >
                  <Feather name="users" size={16} color="#16C7E7" />
                  <Text style={styles.modalItemText}>{item.nome}</Text>
                  {turmaSelecionada?.idTurma === item.idTurma && (
                    <Feather
                      name="check"
                      size={16}
                      color="#00d2b4"
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhuma turma encontrada.</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
