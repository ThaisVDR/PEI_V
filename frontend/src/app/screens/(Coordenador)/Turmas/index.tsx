import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../../../styles/Grade";
import api from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext";

interface Professor {
  idUsuario: string;
  nome: string;
  email: string;
}

export default function CriarTurma() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [carregandoProfessores, setCarregandoProfessores] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    idProfessor: "",
  });

  useEffect(() => {
    carregarProfessores();
  }, []);

  async function carregarProfessores() {
    if (!user?.token) return;

    setCarregandoProfessores(true);
    try {
      const response = await api.get("/coordenacao/professores", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfessores(response.data);
    } catch (error: any) {
      console.log("Erro ao carregar professores:", error?.response?.data);
      Alert.alert("Erro", "Não foi possível carregar a lista de professores.");
    } finally {
      setCarregandoProfessores(false);
    }
  }

  async function handleSubmit() {
    if (!formData.nome.trim()) {
      Alert.alert("Atenção", "Informe o nome da turma.");
      return;
    }

    if (!formData.idProfessor) {
      Alert.alert("Atenção", "Selecione um professor responsável.");
      return;
    }

    if (!user?.token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        nome: formData.nome,
        idProfessor: formData.idProfessor,
      };

      const response = await api.post("/coordenacao/turmas/criar", payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      Alert.alert(
        "Sucesso",
        `Turma "${response.data.nome}" criada com sucesso!\nProfessor: ${response.data.nomeProfessor}`,
        [
          {
            text: "OK",
            onPress: () => router.push("/screens/(Coordenador)/Grade"),
          },
        ],
      );
    } catch (error: any) {
      console.log("Erro ao criar turma:", error?.response?.data);

      const errorMessage =
        error?.response?.data?.message || "Erro ao criar turma.";

      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
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

      <Text style={styles.title}>Criar Nova Turma</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome da Turma *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Turma A - 2024"
          placeholderTextColor="#7c8db5"
          value={formData.nome}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, nome: text }))
          }
        />

        <Text style={styles.label}>Professor Responsável *</Text>
        {carregandoProfessores ? (
          <ActivityIndicator
            size="small"
            color="#050E1D"
            style={{ marginVertical: 20 }}
          />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.pickerScroll}
          >
            <View style={styles.pickerContainer}>
              {professores.map((professor) => (
                <TouchableOpacity
                  key={professor.idUsuario}
                  style={[
                    styles.pickerOption,
                    formData.idProfessor === professor.idUsuario &&
                      styles.pickerOptionSelected,
                  ]}
                  onPress={() =>
                    setFormData((prev) => ({
                      ...prev,
                      idProfessor: professor.idUsuario,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.pickerOptionText,
                      formData.idProfessor === professor.idUsuario &&
                        styles.pickerOptionTextSelected,
                    ]}
                  >
                    {professor.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {formData.idProfessor && (
          <Text style={styles.selectedInfo}>
            Professor selecionado:{" "}
            {
              professores.find((p) => p.idUsuario === formData.idProfessor)
                ?.nome
            }
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#050E1D" />
          ) : (
            <>
              <Feather name="check-circle" size={18} color="#050E1D" />
              <Text style={styles.buttonText}>Criar Turma</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
