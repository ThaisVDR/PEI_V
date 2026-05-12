import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      const tipo = await AsyncStorage.getItem("tipoUsuario");

      if (!token) {
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
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return <View style={{ flex: 1, backgroundColor: "#0d1424" }} />;
}
