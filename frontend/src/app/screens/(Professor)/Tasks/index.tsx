import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
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
    if (!titulo.trim() || !objetivo.trim() || !dataEntrega) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha o título, objetivo e data de entrega."
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Tarefa criada com sucesso!");
      router.back();
    }, 1500);
  };

  const formularioValido = titulo.trim() && objetivo.trim() && dataEntrega;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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
        style={{ flex: 1, backgroundColor: "#050E1D" }}
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
              <Text style={styles.charCounterMax}>/500</Text>
            </Text>
          </View>

          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Materiais (PDFs)</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickDocument}
              activeOpacity={0.7}
            >
              <View style={styles.uploadIconCircle}>
                <Feather name="upload-cloud" size={26} color="#00D2B4" />
              </View>
              <Text style={styles.uploadTitle}>Adicionar PDFs</Text>
              <Text style={styles.uploadSubtitle}>
                Toque para selecionar um ou mais arquivos
              </Text>
            </TouchableOpacity>
          </View>

          {arquivos.length > 0 && (
            <View style={styles.filesList}>
              <Text style={styles.filesListLabel}>
                {arquivos.length} arquivo{arquivos.length > 1 ? "s" : ""} selecionado{arquivos.length > 1 ? "s" : ""}
              </Text>
              {arquivos.map((file, idx) => (
                <View key={idx} style={styles.fileItem}>
                  <View style={styles.fileIconWrap}>
                    <Feather name="file-text" size={15} color="#00D2B4" />
                  </View>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoverArquivo(idx)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Feather name="x" size={15} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
          >
            <View pointerEvents="none">
              <Input
                label="Data de Entrega"
                iconName="calendar"
                placeholder="dd/mm/aaaa"
                value={dataEntrega ? dataEntrega.toLocaleDateString("pt-BR") : ""}
                rightElement={
                  <Feather name="chevron-down" size={18} color="#5D708A" />
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
            disabled={loading || !formularioValido}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}