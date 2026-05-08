import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
    <View>
      <Text>Página de Perfil</Text>
      <Text>ALUNOOO</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
