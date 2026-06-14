import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "../../../../components/Input/input";
import { ScreenLoader } from "../../../../components/Loading/loader";
import { styles } from "../../../../styles/CreateTasks";
import api from "../../../../services/api";

interface Turma {
  idClass: string;
  nome: string;
}

export default function CreateTask() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [pontos, setPontos] = useState("");
  const [arquivos, setArquivos] = useState<any[]>([]);
  const [dataEntrega, setDataEntrega] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [loadingTurmas, setLoadingTurmas] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarTurmas();
  }, []);

  const buscarTurmas = async () => {
    try {
      setLoadingTurmas(true);
      const res = await api.get("/coordenacao/turmas");
      if (res.data) {
        const turmasNormalizadas: Turma[] = res.data.map((item: any) => ({
          idClass: item.idTurma || item.idClass,
          nome: item.nome,
        }));
        setTurmas(turmasNormalizadas);
      }
    } catch (e: any) {
      Alert.alert("Erro", "Não foi possível carregar as turmas.");
    } finally {
      setLoadingTurmas(false);
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: true,
      });
      if (!result.canceled) {
        setArquivos((prev) => [...prev, ...result.assets]);
      }
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os documentos.");
    }
  };

  const handleRemoverArquivo = (index: number) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDataEntrega(selectedDate);
  };

  const handleSalvarTarefa = async () => {
    if (
      !titulo.trim() ||
      !objetivo.trim() ||
      !dataEntrega ||
      !turmaSelecionada
    ) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    const body = {
      titulo: titulo.trim(),
      descricao: objetivo.trim(),
      prazo: dataEntrega.toISOString().slice(0, 19),
      pontos: parseInt(pontos, 10) || 0,
      idClass: turmaSelecionada.idClass,
    };

    try {
      setLoading(true);
      const res = await api.post("/tarefas/criar", body);
      if (res.status === 201 || res.status === 200) {
        Alert.alert("Sucesso", "Tarefa criada com sucesso!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (e: any) {
      Alert.alert(
        "Erro",
        e.response?.data?.message || "Erro ao criar a tarefa.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenLoader visible={loading} message="Salvando tarefa no diário..." />

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
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.pageTitleRow}>
          <Text style={styles.headerTitle}>Criar Nova Tarefa</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Título da Tarefa"
            iconName="edit-2"
            placeholder="Ex: Quiz – Normalização de Banco de Dados"
            value={titulo}
            onChangeText={setTitulo}
          />
          <Input
            label="Pontos (XP)"
            iconName="award"
            placeholder="Ex: 10"
            value={pontos}
            onChangeText={(t) => setPontos(t.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
          />
          <View style={styles.textAreaContainer}>
            <Input
              label="Objetivo da Tarefa"
              iconName="align-left"
              placeholder="Descreva o que os alunos devem fazer, o que será avaliado e critérios de sucesso..."
              multiline
              numberOfLines={4}
              maxLength={500}
              value={objetivo}
              onChangeText={setObjetivo}
            />
            <Text style={styles.charCounter}>
              {objetivo.length}
              <Text style={styles.charCounterMax}> caracteres</Text>
            </Text>
          </View>

          {/* Upload de PDFs */}
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Materiais (PDFs)</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickDocument}
              activeOpacity={0.7}
            >
              <View style={styles.uploadIconCircle}>
                <Feather name="upload-cloud" size={26} color="#5D708A" />
              </View>
              <Text style={styles.uploadTitle}>Clique para adicionar PDFs</Text>
              <Text style={styles.uploadSubtitle}>
                Você pode adicionar múltiplos PDFs
              </Text>
            </TouchableOpacity>
          </View>

          {arquivos.map((file, idx) => (
            <View key={idx} style={styles.fileItem}>
              <Feather name="file-text" size={20} color="#00D2B4" />
              <Text style={styles.fileName} numberOfLines={1}>
                {file.name}
              </Text>
              <TouchableOpacity onPress={() => handleRemoverArquivo(idx)}>
                <Feather name="x" size={18} color="#FF5A5A" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Data de Entrega */}
          <Text style={styles.uploadLabel}>Data de Entrega</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text
              style={dataEntrega ? styles.dateText : styles.datePlaceholder}
            >
              {dataEntrega
                ? dataEntrega.toLocaleDateString("pt-BR")
                : "dd/mm/aaaa"}
            </Text>
            <Feather name="calendar" size={18} color="#5D708A" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dataEntrega || new Date()}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          {/* Turmas inline */}
          <Text style={styles.turmasLabel}>Enviar para Turmas</Text>

          {loadingTurmas ? (
            <ActivityIndicator
              size="small"
              color="#16C7E7"
              style={{ marginVertical: 20 }}
            />
          ) : turmas.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma turma cadastrada.</Text>
          ) : (
            turmas.map((item) => {
              const selecionada = turmaSelecionada?.idClass === item.idClass;
              return (
                <TouchableOpacity
                  key={item.idClass}
                  style={[
                    styles.turmaItem,
                    selecionada && styles.turmaItemSelecionado,
                  ]}
                  onPress={() => setTurmaSelecionada(item)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.turmaRadio,
                      selecionada && styles.turmaRadioSelecionado,
                    ]}
                  >
                    {selecionada && <View style={styles.turmaRadioDot} />}
                  </View>
                  <View style={styles.turmaItemContent}>
                    <Text style={styles.turmaItemText}>{item.nome}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          {/* Botão Enviar */}
          <TouchableOpacity
            style={[
              styles.btnEnviar,
              (!titulo || !objetivo || !turmaSelecionada || !dataEntrega) && {
                opacity: 0.5,
              },
            ]}
            onPress={handleSalvarTarefa}
            disabled={!titulo || !objetivo || !turmaSelecionada || !dataEntrega}
            activeOpacity={0.8}
          >
            <Feather name="send" size={18} color="#050E1D" />
            <Text style={styles.btnEnviarText}>Enviar Tarefa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
