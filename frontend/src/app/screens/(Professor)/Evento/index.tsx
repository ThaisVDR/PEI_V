import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Evento() {
  return (
    <View style={styles.container}>
      <Text>Página de Evento</Text>
      <Text>PROFESSOR</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
});
