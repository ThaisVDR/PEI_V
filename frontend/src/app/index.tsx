import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem("token");
      const tipo = await AsyncStorage.getItem("tipoUsuario");

      if (!token || !tipo) {
        router.replace("/screens/(Authenticator)/Login");
        return;
      }

      if (tipo === "Aluno") {
        router.replace("/screens/(Aluno)/Home");
      } else if (tipo === "Professor") {
        router.replace("/screens/(Professor)/Home");
      } else {
        router.replace("/screens/(Authenticator)/Login");
      }
    }

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#00d2b4" />
    </View>
  );
}
