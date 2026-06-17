import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "../../../../components/Button/button";
import { Input } from "../../../../components/Input/input";
import { RadioSelect } from "../../../../components/RadioSelect/radioSelect";
import { styles } from "../../../../styles/Register";
import { ScreenLoader } from "../../../../components/Loading/loader";
import api, { API_URL } from "../../../../services/api";

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [tipo, setTipo] = useState("Aluno");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [turmas, setTurmas] = useState<{ idTurma: string; nome: string }[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<{
    idTurma: string;
    nome: string;
  } | null>(null);
  const [showTurmaModal, setShowTurmaModal] = useState(false);

  //  Correção no Register:
  useEffect(() => {
    api
      .get("/coordenacao/turmas")
      .then((res) => {
        const turmasAtivas = res.data.filter(
          (t: any) => t.ativa || t.ativa === undefined,
        );
        setTurmas(turmasAtivas);
      })
      .catch((err) => console.log("Erro ao buscar turmas no cadastro:", err));
  }, []);

  async function handleRegister() {
    if (loading) return;
    if (!nome || !email || !curso || !senha) return;
    if (senha.length < 8) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres");
      return;
    }
    if (tipo === "Aluno" && !turmaSelecionada) {
      Alert.alert("Atenção", "Selecione sua turma para continuar.");
      return;
    }

    setLoadingMessage("Enviando dados de cadastro...");
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await api.post("/auth/register", {
          nome,
          email,
          curso,
          tipoUsuario: tipo,
          senha,
          termoAceito: true,
          idTurma: turmaSelecionada?.idTurma || null,
        });

        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Erro ${response.status}`);
        }

        setLoadingMessage("Conta criada com sucesso!");
        setTimeout(() => {
          router.replace("/screens/(Authenticator)/Login");
        }, 800);
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Erro desconhecido";
        Alert.alert("Erro", message);
        setLoading(false);
      }
    }, 1500);
  }

  return (
    <SafeAreaView style={styles.wrapper} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenLoader visible={loading} message={loadingMessage} />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("../../../../../assets/icon_questio.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <MaskedView
                style={styles.maskedContainer}
                maskElement={<Text style={styles.title}>Criar Conta</Text>}
              >
                <LinearGradient
                  colors={["#00d2b4", "#007BFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </MaskedView>
            </View>

            <View style={styles.form}>
              <Input
                label="Nome Completo"
                iconName="user"
                placeholder="Digite seu nome completo"
                value={nome}
                onChangeText={setNome}
                editable={!loading}
              />

              <Input
                label="E-mail Institucional"
                iconName="mail"
                placeholder="Digite seu e-mail institucional"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />

              <Input
                label="Curso"
                iconName="book"
                placeholder="Digite o nome do seu curso"
                value={curso}
                onChangeText={setCurso}
                editable={!loading}
              />

              <RadioSelect
                options={["Aluno", "Professor", "Coordenacao"]}
                selected={tipo}
                onChange={setTipo}
              />

              {tipo === "Aluno" && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowTurmaModal(true)}
                  style={{
                    backgroundColor: "#101D33",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "rgba(22,199,231,0.3)",
                    paddingHorizontal: 14,
                    paddingVertical: 14,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      color: turmaSelecionada ? "#FFF" : "#3B4A61",
                      fontSize: 15,
                    }}
                  >
                    {turmaSelecionada
                      ? turmaSelecionada.nome
                      : "Selecione sua turma"}
                  </Text>
                  <Feather name="chevron-down" size={18} color="#5D708A" />
                </TouchableOpacity>
              )}

              <Input
                label="Senha"
                iconName="lock"
                placeholder="Digite a sua nova senha"
                isPassword
                value={senha}
                onChangeText={setSenha}
                editable={!loading}
              />

              <View style={{ marginTop: 4 }}>
                <Button
                  title="Cadastrar"
                  onPress={handleRegister}
                  disabled={loading || !nome || !email || !curso || !senha}
                />
              </View>

              <TouchableOpacity
                style={styles.footerLinks}
                onPress={() => router.push("/screens/(Authenticator)/Login")}
                disabled={loading}
              >
                <Text style={styles.linkText}>
                  Já tem uma conta?{" "}
                  <Text style={styles.linkTextAccent}>Fazer Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Modal de seleção de turma */}
        <Modal
          visible={showTurmaModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowTurmaModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "#101D33",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                height: "50%",
                paddingBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255,255,255,0.06)",
                }}
              >
                <Text
                  style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}
                >
                  Selecione sua Turma
                </Text>
                <TouchableOpacity onPress={() => setShowTurmaModal(false)}>
                  <Feather name="x" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={turmas}
                keyExtractor={(item) => item.idTurma}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 16,
                      paddingHorizontal: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "rgba(255,255,255,0.04)",
                    }}
                    onPress={() => {
                      setTurmaSelecionada(item);
                      setShowTurmaModal(false);
                    }}
                  >
                    <Feather
                      name="users"
                      size={18}
                      color="#16C7E7"
                      style={{ marginRight: 12 }}
                    />
                    <Text
                      style={{ color: "#FFF", fontSize: 15, fontWeight: "500" }}
                    >
                      {item.nome}
                    </Text>
                    {turmaSelecionada?.idTurma === item.idTurma && (
                      <Feather
                        name="check"
                        size={18}
                        color="#16C7E7"
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text
                    style={{
                      color: "#7c8db5",
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Nenhuma turma disponível.
                  </Text>
                }
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
