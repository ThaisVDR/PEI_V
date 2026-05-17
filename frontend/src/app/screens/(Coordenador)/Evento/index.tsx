import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CriarEvento() {
  return (
    <View style={styles.container}>
      <Text>Página de Criar Eventos</Text>
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
