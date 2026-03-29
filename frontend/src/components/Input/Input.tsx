import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./style";

interface InputProps extends TextInputProps {
  label: string;
  iconName: keyof typeof Feather.glyphMap;
  isPassword?: boolean;
  rightElement?: React.ReactNode;
}

export function Input({ label, iconName, rightElement, ...rest }: InputProps) {
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

        <TextInput style={styles.input} placeholderTextColor="#555" {...rest} />

        {rightElement && <View style={styles.iconRight}>{rightElement}</View>}
      </View>
    </View>
  );
}
