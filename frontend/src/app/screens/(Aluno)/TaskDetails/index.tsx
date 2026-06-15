import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import api from "../../../../services/api";
import { styles } from "../../../../styles/TaskDetails";
import { useAuth } from "../../../../context/AuthContext"; // 🔥 Garante a importação do useAuth

// ── Tipos ────────────────────────────────────────────────
type Tab = "atividade" | "resposta";

interface ArquivoSelecionado {
  nome: string;
  uri: string;
  tamanho?: number;
}

// ── Helpers ──────────────────────────────────────────────
function formatBytes(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function diasRestantes(dataEntrega?: string): number | null {
  if (!dataEntrega) return null;
  const diff = new Date(dataEntrega).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ── Componente ───────────────────────────────────────────
export default function TaskDetail() {
  const router = useRouter();
  const { atualizarXpLocal } = useAuth(); // 🔥 Puxa a função de atualizar os pontos localmente

  const { id, titulo, descricao, dataEntrega, pontos, concluida, arquivoUrl } =
    useLocalSearchParams<{
      id: string;
      titulo: string;
      descricao: string;
      dataEntrega: string;
      pontos: string;
      concluida: string;
      arquivoUrl?: string;
    }>();

  const [tab, setTab] = useState<Tab>("atividade");
  const [resposta, setResposta] = useState("");
  const [arquivo, setArquivo] = useState<ArquivoSelecionado | null>(null);
  const [enviando, setEnviando] = useState(false);

  const jaConcluida = concluida === "true";
  const dias = diasRestantes(dataEntrega);
  const urgente = dias !== null && dias <= 3 && !jaConcluida;

  // ── Abrir PDF do Professor ──────────────────────────────
  async function handleOpenPDF(url: string) {
    try {
      const suportado = await Linking.canOpenURL(url);
      if (suportado) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível abrir o link do arquivo neste dispositivo.",
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao abrir o arquivo anexo.");
    }
  }

  // ── Pick arquivo do Aluno ────────────────────────────────
  async function handlePickArquivo() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
          "application/zip",
        ],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.size && asset.size > 10 * 1024 * 1024) {
          Alert.alert("Arquivo muito grande", "O tamanho máximo é 10 MB.");
          return;
        }
        setArquivo({ nome: asset.name, uri: asset.uri, tamanho: asset.size });
      }
    } catch {
      Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
    }
  }

  // ── Enviar Resposta do Aluno ─────────────────────────────
  async function handleEnviar() {
    if (!resposta.trim() && !arquivo) {
      Alert.alert("Atenção", "Digite uma resposta ou envie um arquivo.");
      return;
    }
    try {
      setEnviando(true);

      console.log("--- 📝 DETALHES DO ENVIO ---");
      console.log("ID da Tarefa:", id);
      console.log("Valor Bruto de 'pontos' recebido da rota:", pontos);

      // 1. Envia para o seu backend salvar
      await api.patch(`/tarefas/${id}/concluir`);

      // TRATAMENTO DO PARÂMETRO: Garante que limpa textos como "XP" se houver e isola o número
      const pontosLimpos = pontos ? String(pontos).replace(/\D/g, "") : "";
      const pontosNumericos = parseInt(pontosLimpos, 10);

      console.log("Pontos após conversão numérica:", pontosNumericos);

      // 2. Dispara a atualização global se for um número válido
      if (atualizarXpLocal && !isNaN(pontosNumericos) && pontosNumericos > 0) {
        console.log(`Disparando atualizarXpLocal com: ${pontosNumericos}`);
        atualizarXpLocal(pontosNumericos);
      } else {
        console.log(
          "⚠️ Falha: atualizarXpLocal não foi chamada. Pontos inválidos ou função ausente.",
        );
      }

      Alert.alert(
        "✅ Enviado!",
        `Tarefa concluída! +${pontosNumericos || 0} XP`,
        [
          {
            text: "OK",
            onPress: () => {
              setTimeout(() => {
                router.back();
              }, 150);
            },
          },
        ],
      );
    } catch (e: any) {
      Alert.alert("Erro", e?.response?.data?.mensagem || "Erro ao enviar.");
    } finally {
      setEnviando(false);
    }
  }

  // ── Aba Atividade ────────────────────────────────────────
  function renderAtividade() {
    return (
      <>
        {/* Descrição */}
        <View>
          <Text style={styles.sectionLabel}>Descrição da Atividade</Text>
          <View style={styles.descCard}>
            <Text style={styles.descText}>
              {descricao || "Sem descrição disponível."}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionLabel}>Arquivo da Atividade</Text>
          {arquivoUrl ? (
            <TouchableOpacity
              style={[
                styles.pdfBox,
                { borderColor: "#00d2b4", borderWidth: 1 },
              ]}
              onPress={() => handleOpenPDF(arquivoUrl)}
              activeOpacity={0.7}
            >
              <Feather name="file-text" size={42} color="#00d2b4" />
              <Text style={[styles.pdfPlaceholderText, { color: "#FFF" }]}>
                Visualizar Material Anexo
              </Text>
              <Text
                style={{
                  color: "#00d2b4",
                  fontSize: 12,
                  fontWeight: "600",
                  marginTop: 4,
                }}
              >
                Clique aqui para abrir o PDF ↗
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.pdfBox, { opacity: 0.6 }]}>
              <Feather name="file-text" size={40} color="#5D708A" />
              <Text style={styles.pdfPlaceholderText}>
                Nenhum anexo disponível
              </Text>
              <Text style={{ color: "#5D708A", fontSize: 11 }}>
                O professor não incluiu arquivos para esta tarefa.
              </Text>
            </View>
          )}
        </View>
      </>
    );
  }

  // ── Aba Resposta ─────────────────────────────────────────
  function renderResposta() {
    if (jaConcluida) {
      return (
        <View style={styles.concludedBanner}>
          <Feather name="check-circle" size={36} color="#00d2b4" />
          <Text style={styles.concludedBannerText}>
            Atividade já concluída!
          </Text>
          <Text style={styles.concludedBannerSub}>
            Você ganhou +{pontos} XP por esta tarefa.
          </Text>
        </View>
      );
    }

    return (
      <>
        {/* Texto */}
        <View>
          <Text style={styles.sectionLabel}>Sua Resposta (Texto)</Text>
          <View style={styles.respostaCard}>
            <TextInput
              style={styles.textInput}
              placeholder="Digite sua resposta aqui... (opcional se você enviar um arquivo)"
              placeholderTextColor="#3B4A61"
              multiline
              value={resposta}
              onChangeText={setResposta}
            />
            <Text style={styles.charCount}>{resposta.length} caracteres</Text>
          </View>
        </View>

        {/* Upload */}
        <View>
          <Text style={styles.sectionLabel}>Ou Envie um Arquivo</Text>
          {arquivo ? (
            <View style={styles.uploadedFile}>
              <Feather name="file" size={20} color="#00d2b4" />
              <View style={{ flex: 1 }}>
                <Text style={styles.uploadedFileName} numberOfLines={1}>
                  {arquivo.nome}
                </Text>
                {arquivo.tamanho !== undefined && (
                  <Text style={styles.uploadedFileSize}>
                    {formatBytes(arquivo.tamanho)}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.removeFile}
                onPress={() => setArquivo(null)}
              >
                <Feather name="x" size={18} color="#ff4757" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickArquivo}
              activeOpacity={0.75}
            >
              <Feather name="upload" size={28} color="#007BFF" />
              <Text style={styles.uploadTitle}>
                Clique para enviar um arquivo
              </Text>
              <Text style={styles.uploadSubtitle}>
                PDF, Word, TXT ou ZIP (máx. 10MB)
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Botão enviar */}
        <TouchableOpacity
          onPress={handleEnviar}
          disabled={enviando}
          activeOpacity={0.8}
          style={[styles.submitBtn, enviando && styles.submitBtnDisabled]}
        >
          {enviando ? (
            <ActivityIndicator size="small" color="#050E1D" />
          ) : (
            <>
              <Feather name="send" size={18} color="#050E1D" />
              <Text style={styles.submitBtnText}>Enviar Atividade</Text>
            </>
          )}
        </TouchableOpacity>
      </>
    );
  }

  // ── Render Principal ─────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {titulo}
        </Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "atividade" && styles.tabBtnActive]}
          onPress={() => setTab("atividade")}
          activeOpacity={0.8}
        >
          <Feather
            name="book-open"
            size={14}
            color={tab === "atividade" ? "#fff" : "#5D708A"}
          />
          <Text
            style={[
              styles.tabBtnText,
              tab === "atividade" && styles.tabBtnTextActive,
            ]}
          >
            Atividade
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, tab === "resposta" && styles.tabBtnActive]}
          onPress={() => setTab("resposta")}
          activeOpacity={0.8}
        >
          <Feather
            name="edit-3"
            size={14}
            color={tab === "resposta" ? "#fff" : "#5D708A"}
          />
          <Text
            style={[
              styles.tabBtnText,
              tab === "resposta" && styles.tabBtnTextActive,
            ]}
          >
            Sua Resposta
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Feather name="award" size={16} color="#00d2b4" />
            <Text style={styles.xpText}>+{pontos} XP</Text>
            {urgente && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>Urgente</Text>
              </View>
            )}
            {jaConcluida && (
              <View style={styles.concludedBadge}>
                <Feather name="check-circle" size={13} color="#00d2b4" />
                <Text style={styles.concludedText}>Concluída</Text>
              </View>
            )}
          </View>

          <View style={styles.infoRow}>
            <Feather name="calendar" size={14} color="#5D708A" />
            <Text style={styles.deadlineText}>
              Entrega:{" "}
              {dataEntrega
                ? new Date(dataEntrega).toLocaleDateString("pt-BR")
                : "Sem prazo"}
              {dias !== null && !jaConcluida && (
                <Text style={{ color: urgente ? "#ff4757" : "#5D708A" }}>
                  {" "}
                  ({dias > 0 ? `${dias} dia${dias !== 1 ? "s" : ""}` : "Hoje"})
                </Text>
              )}
            </Text>
          </View>
        </View>

        {/* Conteúdo da aba */}
        {tab === "atividade" ? renderAtividade() : renderResposta()}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
