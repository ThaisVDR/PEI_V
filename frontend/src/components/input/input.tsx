import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  iconName: keyof typeof Feather.glyphMap;
  isPassword?: boolean;
  rightElement?: React.ReactNode;
}

export function Input({
  label,
  iconName,
  isPassword,
  rightElement,
  ...rest
}: InputProps) {
  const [secure, setSecure] = useState(!!isPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <Feather
          name={iconName}
          size={20}
          color="#555"
          style={styles.iconLeft}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#555"
          secureTextEntry={secure}
          {...rest}
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.iconRight}
          >
            <Feather name={secure ? "eye-off" : "eye"} size={20} color="#555" />
          </TouchableOpacity>
        ) : (
          rightElement && <View style={styles.iconRight}>{rightElement}</View>
        )}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#7a869a",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    width: "100%",
    height: 56,
    backgroundColor: "#0a121f",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1a2433",
    paddingHorizontal: 14,
  },
  iconLeft: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    height: "100%",
  },
  iconRight: {
    marginLeft: 10,
  },
});
