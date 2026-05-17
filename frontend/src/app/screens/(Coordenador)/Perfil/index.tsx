import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Perfil() {
  const router = useRouter();
  async function handleLogout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("tipoUsuario");
    router.replace("/screens/(Authenticator)/Login");
  }
  return (
    <View style={styles.container}>
      <Text>Página de Perfil</Text>
      <Text>Coordenador</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
});
