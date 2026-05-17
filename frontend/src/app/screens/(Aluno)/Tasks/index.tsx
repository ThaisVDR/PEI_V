import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Tasks() {
  return (
    <View style={styles.container}>
      <Text>Página de Tarefas</Text>
      <Text>ALUNOOO</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
});
