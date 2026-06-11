import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "../../../../components/input/input";
import { Button } from "../../../../components/button/button";
import { ScreenLoader } from "../../../../components/Loading/loader";
import { styles } from "../../../../styles/CreateTasks";

export default function CreateTask() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [arquivos, setArquivos] = useState<any[]>([]);
  const [dataEntrega, setDataEntrega] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: true,
      });

      if (!result.canceled) {
        setArquivos([...arquivos, ...result.assets]);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os documentos.");
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataEntrega(selectedDate);
    }
  };

  const handleSalvarTarefa = async () => {
    if (!titulo || !objetivo || !dataEntrega) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha o título, objetivo e data de entrega.",
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Nova tarefa salva com sucesso!");
      router.back();
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenLoader visible={loading} message="Salvando tarefa no diário..." />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
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
            <Text style={styles.charCounter}>{objetivo.length} caracteres</Text>
          </View>

          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Materiais (PDFs)</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickDocument}
            >
              <Feather name="upload-cloud" size={32} color="#475569" />
              <Text style={styles.uploadTitle}>Clique para adicionar PDFs</Text>
              <Text style={styles.uploadSubtitle}>
                Você pode adicionar múltiplos PDFs
              </Text>
            </TouchableOpacity>
          </View>

          {arquivos.length > 0 && (
            <View style={styles.filesList}>
              {arquivos.map((file, idx) => (
                <View key={idx} style={styles.fileItem}>
                  <Feather name="file-text" size={16} color="#00d2b4" />
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file.name}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowDatePicker(true)}
          >
            <View pointerEvents="none">
              <Input
                label="Data de Entrega"
                iconName="calendar"
                placeholder="dd/mm/aaaa"
                value={
                  dataEntrega ? dataEntrega.toLocaleDateString("pt-BR") : ""
                }
                rightElement={
                  <Feather name="chevron-down" size={18} color="#555" />
                }
              />
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dataEntrega || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          <Button
            title="Salvar Tarefa"
            onPress={handleSalvarTarefa}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
