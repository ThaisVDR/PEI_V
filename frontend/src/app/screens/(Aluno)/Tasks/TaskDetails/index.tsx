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
import { Feather } from "@expo/vector-icons";
import api from "../../../../../services/api";

export default function TaskDetail() {
  const router = useRouter();
  const { id, titulo, descricao, dataEntrega, pontos, concluida } =
    useLocalSearchParams<{
      id: string;
      titulo: string;
      descricao: string;
      dataEntrega: string;
      pontos: string;
      concluida: string;
    }>();

  const [resposta, setResposta] = useState("");
  const [enviando, setEnviando] = useState(false);
  const jaConcluida = concluida === "true";

  async function handleEnviar() {
    if (!resposta.trim()) {
      Alert.alert("Atenção", "Digite sua resposta antes de enviar.");
      return;
    }
    try {
      setEnviando(true);
      await api.patch(`/tarefas/${id}/concluir`);
      Alert.alert("✅ Enviado!", `Tarefa concluída! +${pontos} XP`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e: any) {
      Alert.alert("Erro", e?.response?.data?.mensagem || "Erro ao enviar.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#050E1D" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 52,
          paddingHorizontal: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.06)",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 12 }}
        >
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text
          style={{ color: "#FFF", fontSize: 18, fontWeight: "700", flex: 1 }}
          numberOfLines={1}
        >
          {titulo}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Info da tarefa */}
        <View
          style={{
            backgroundColor: "#101D33",
            borderRadius: 12,
            padding: 16,
            gap: 12,
            borderWidth: 1,
            borderColor: "rgba(22,199,231,0.15)",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Feather name="award" size={16} color="#00d2b4" />
            <Text style={{ color: "#00d2b4", fontWeight: "700", fontSize: 15 }}>
              +{pontos} XP
            </Text>
            {jaConcluida && (
              <View
                style={{
                  marginLeft: "auto",
                  backgroundColor: "rgba(0,210,180,0.15)",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Feather name="check-circle" size={13} color="#00d2b4" />
                <Text
                  style={{ color: "#00d2b4", fontSize: 12, fontWeight: "600" }}
                >
                  Concluída
                </Text>
              </View>
            )}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Feather name="calendar" size={14} color="#5D708A" />
            <Text style={{ color: "#7c8db5", fontSize: 13 }}>
              Entrega:{" "}
              {dataEntrega
                ? new Date(dataEntrega).toLocaleDateString("pt-BR")
                : "Sem prazo"}
            </Text>
          </View>
        </View>

        {/* Descrição */}
        <View>
          <Text
            style={{
              color: "#FFF",
              fontWeight: "700",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Descrição da Atividade
          </Text>
          <View
            style={{
              backgroundColor: "#101D33",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(22,199,231,0.1)",
            }}
          >
            <Text style={{ color: "#C0CFDF", fontSize: 14, lineHeight: 22 }}>
              {descricao || "Sem descrição."}
            </Text>
          </View>
        </View>

        {/* Resposta */}
        {!jaConcluida && (
          <View>
            <Text
              style={{
                color: "#FFF",
                fontWeight: "700",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Sua Resposta
            </Text>
            <TextInput
              style={{
                backgroundColor: "#101D33",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "rgba(22,199,231,0.2)",
                padding: 16,
                color: "#FFF",
                fontSize: 14,
                minHeight: 120,
                textAlignVertical: "top",
              }}
              placeholder="Digite sua resposta aqui..."
              placeholderTextColor="#3B4A61"
              multiline
              value={resposta}
              onChangeText={setResposta}
            />
            <Text
              style={{
                color: "#3B4A61",
                fontSize: 12,
                marginTop: 6,
                textAlign: "right",
              }}
            >
              {resposta.length} caracteres
            </Text>
          </View>
        )}

        {/* Botão enviar */}
        {!jaConcluida && (
          <TouchableOpacity
            onPress={handleEnviar}
            disabled={enviando}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#00d2b4",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginTop: 4,
            }}
          >
            {enviando ? (
              <ActivityIndicator size="small" color="#050E1D" />
            ) : (
              <>
                <Feather name="send" size={18} color="#050E1D" />
                <Text
                  style={{ color: "#050E1D", fontWeight: "700", fontSize: 16 }}
                >
                  Enviar Atividade
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {jaConcluida && (
          <View
            style={{
              backgroundColor: "rgba(0,210,180,0.08)",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(0,210,180,0.2)",
            }}
          >
            <Feather name="check-circle" size={32} color="#00d2b4" />
            <Text
              style={{
                color: "#00d2b4",
                fontWeight: "700",
                fontSize: 16,
                marginTop: 8,
              }}
            >
              Atividade já concluída!
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
