import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function Button({ title, loading, disabled, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      disabled={disabled || loading}
      {...rest}
    >
      <LinearGradient
        colors={["#007BFF", "#00D2B4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, (disabled || loading) && { opacity: 0.7 }]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 25,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
