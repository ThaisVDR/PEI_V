import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../../../../services/api";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import { Button } from "../../../../components/button/button";
import { Input } from "../../../../components/input/input";
import { styles } from "../../../../styles/Login";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao fazer login");
      }

      // Decodifica o JWT para pegar o tipo
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
      const tipo = tokenPayload.tipo;

      console.log("Tipo extraído do JWT:", tipo);

      console.log("Login OK:", data);

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("tipoUsuario", tipo);

      if (tipo === "Aluno") {
        router.replace("/screens/(Aluno)/Home");
      } else if (tipo === "Professor") {
        router.replace("/screens/(Professor)/Home");
      } else {
        Alert.alert("Erro", "Tipo de usuário inválido.");
      }
    } catch (error: any) {
      Alert.alert("Erro no login", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../../../../assets/icon_questio.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <MaskedView
              style={{ height: 45, width: "100%" }}
              maskElement={
                <Text
                  style={[styles.title, { backgroundColor: "transparent" }]}
                >
                  Questio
                </Text>
              }
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
              label="Email"
              iconName="user"
              placeholder="Digite o seu Email"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              label="Senha"
              iconName="lock"
              placeholder="Digite sua Senha"
              isPassword
              value={senha}
              onChangeText={setSenha}
            />

            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={loading}
              disabled={!email || !senha}
            />

            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => console.log("Recuperar senha")}>
                <Text style={styles.linkText}>Esqueci minha senha</Text>
              </TouchableOpacity>

              <Text style={styles.divider}>|</Text>
              <TouchableOpacity
                onPress={() => router.push("/screens/(Authenticator)/Register")}
              >
                <Text style={styles.linkText}>Primeiro acesso</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
