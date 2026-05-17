import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StreakCard from "../../../../components/Streak/streakCard";

export default function Home() {
  const [userData, setUserData] = useState({
    streakAtual: 0,
  });

  const userId = "MUDE_PELO_UUID_DO_USUARIO_LOGADO";

  const handleCompletarQuestao = async () => {
    try {
      const response = await fetch(
        `http:// 192.168.18.68:8080/auth/streak/${userId}?novosPontos=150`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUserData({
          streakAtual: data.streakAtual,
        });
        Alert.alert(
          "Parabéns!",
          "Questão respondida! Sua ofensiva foi atualizada.",
        );
      } else {
        Alert.alert("Erro", data.mensagem || "Erro ao atualizar os dados.");
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    }
  };

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
      <Text style={styles.pageTitle}>Página de ALUNO</Text>
      <StreakCard streak={userData.streakAtual} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.26)",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 100,
    height: 80,
  },
  notification: {
    position: "relative",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationBadge: {
    position: "absolute",
    top: -4,
    right: 2,
    backgroundColor: "#ff4757",
    borderRadius: 8,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  pageTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
});
