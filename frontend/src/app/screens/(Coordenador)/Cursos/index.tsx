import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CriarCursos() {
  return (
    <View style={styles.container}>
      <Text>Página de Criar Cursos</Text>
      <Text>COORDENADOR</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
});
