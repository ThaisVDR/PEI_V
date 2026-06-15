import React, { useState } from "react";
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
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import api from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext";
import { styles } from "../../../../styles/Cursos";

interface Disciplina {
  id: string;
  nome: string;
  cargaHoraria: string;
}

export default function CriarCursos() {
  // Estados das Informações Básicas
  const [nomeCurso, setNomeCurso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [semestre, setSemestre] = useState("1º Semestre");
  const [coordenador, setCoordenador] = useState("");
  const [vagas, setVagas] = useState("30");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // Estados para a inclusão de Disciplinas
  const [nomeDisciplina, setNomeDisciplina] = useState("");
  const [cargaDisciplina, setCargaDisciplina] = useState("");
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  // Função para adicionar uma disciplina na lista temporária
  const handleAdicionarDisciplina = () => {
    if (!nomeDisciplina.trim() || !cargaDisciplina.trim()) {
      Alert.alert(
        "Atenção",
        "Preencha o nome e a carga horária da disciplina.",
      );
      return;
    }

    const novaDisciplina: Disciplina = {
      id: Date.now().toString(),
      nome: nomeDisciplina,
      cargaHoraria: cargaDisciplina,
    };

    setDisciplinas([...disciplinas, novaDisciplina]);
    setNomeDisciplina("");
    setCargaDisciplina("");
  };

  // Função para remover uma disciplina da lista antes de lançar
  const handleRemoverDisciplina = (id: string) => {
    setDisciplinas(disciplinas.filter((d) => d.id !== id));
  };

  async function handleLancarCurso() {
    if (!nomeCurso.trim() || !descricao.trim()) {
      Alert.alert(
        "Erro",
        "Por favor, preencha os campos obrigatórios do curso.",
      );
      return;
    }

    if (!user?.token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        nome: nomeCurso,
        descricao,
        cargaHoraria,
        semestre,
        coordenador,
        vagas: vagas ? Number(vagas) : null,
        disciplinas: disciplinas.map((d) => ({
          nome: d.nome,
          cargaHoraria: d.cargaHoraria,
        })),
      };

      await api.post("/coordenacao/cursos/criar", payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      Alert.alert("Sucesso", "Curso lançado com sucesso!");

      setNomeCurso("");
      setDescricao("");
      setCargaHoraria("");
      setSemestre("1º Semestre");
      setCoordenador("");
      setVagas("30");
      setDisciplinas([]);
    } catch (error: any) {
      console.log("Erro ao criar curso:", error?.response?.data);
      const errorMessage =
        error?.response?.data?.message || "Erro ao lançar curso.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
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
        <Text style={styles.headerTitle}>Lançar Novo Curso</Text>

        <Text style={styles.label}>Nome do Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Engenharia de Software"
          placeholderTextColor="#3B4A61"
          value={nomeCurso}
          onChangeText={setNomeCurso}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o objetivo e o conteúdo do curso..."
          placeholderTextColor="#3B4A61"
          multiline
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* Linha Dupla: Carga Horária e Semestre */}
        <View style={styles.row}>
          <View style={styles.flexField}>
            <Text style={styles.label}>Carga Horária</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 80 horas"
              placeholderTextColor="#3B4A61"
              value={cargaHoraria}
              onChangeText={setCargaHoraria}
            />
          </View>

          <View style={styles.flexField}>
            <Text style={styles.label}>Semestre</Text>
            {/* Um seletor limpo simulando o Dropdown do print */}
            <TouchableOpacity
              style={styles.pickerFake}
              onPress={() => {
                Alert.alert(
                  "Selecionar Semestre",
                  "Escolha o período correspondente:",
                  [
                    {
                      text: "1º Semestre",
                      onPress: () => setSemestre("1º Semestre"),
                    },
                    {
                      text: "2º Semestre",
                      onPress: () => setSemestre("2º Semestre"),
                    },
                    {
                      text: "3º Semestre",
                      onPress: () => setSemestre("3º Semestre"),
                    },
                  ],
                );
              }}
            >
              <Text style={styles.pickerFakeText}>{semestre}</Text>
              <Feather name="chevron-down" size={16} color="#7C8DB5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Linha Dupla: Coordenador e Vagas */}
        <View style={styles.row}>
          <View style={styles.flexField}>
            <Text style={styles.label}>Coordenador</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do coordena"
              placeholderTextColor="#3B4A61"
              value={coordenador}
              onChangeText={setCoordenador}
            />
          </View>

          <View style={styles.flexField}>
            <Text style={styles.label}>Vagas</Text>
            <TextInput
              style={styles.input}
              placeholder="30"
              placeholderTextColor="#3B4A61"
              keyboardType="numeric"
              value={vagas}
              onChangeText={setVagas}
            />
          </View>
        </View>

        {/* --- SEÇÃO DE DISCIPLINAS --- */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Disciplinas do Curso
        </Text>

        <View style={styles.rowDisciplinas}>
          <View style={{ flex: 1, gap: 10 }}>
            <TextInput
              style={styles.inputInline}
              placeholder="Nome da disciplina"
              placeholderTextColor="#3B4A61"
              value={nomeDisciplina}
              onChangeText={setNomeDisciplina}
            />
            <TextInput
              style={styles.inputInline}
              placeholder="Carga (ex: 40h)"
              placeholderTextColor="#3B4A61"
              value={cargaDisciplina}
              onChangeText={setCargaDisciplina}
            />
          </View>

          <TouchableOpacity
            style={styles.btnAdicionar}
            activeOpacity={0.8}
            onPress={handleAdicionarDisciplina}
          >
            <Text style={styles.btnAdicionarText}>adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Listagem em tempo real das disciplinas adicionadas */}
        {disciplinas.length > 0 && (
          <View style={styles.listaDisciplinasContainer}>
            {disciplinas.map((item) => (
              <View key={item.id} style={styles.itemDisciplina}>
                <View>
                  <Text style={styles.itemDisciplinaNome}>{item.nome}</Text>
                  <Text style={styles.itemDisciplinaCarga}>
                    {item.cargaHoraria}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoverDisciplina(item.id)}
                >
                  <Feather name="trash-2" size={18} color="#ff4757" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* --- BOTÃO PRINCIPAL DE SALVAR --- */}
        <TouchableOpacity
          style={[styles.btnLancar, isLoading && { opacity: 0.6 }]}
          activeOpacity={0.8}
          onPress={handleLancarCurso}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.btnLancarText}>Lançar Curso</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
