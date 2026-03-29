import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

interface RadioSelectProps {
  options: string[];
  selected: string;
}

export function RadioSelect({ options, selected }: RadioSelectProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Conta</Text>
      <View style={styles.radioContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioOption}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                selected === option && styles.radioCircleSelected,
              ]}
            >
              {selected === option && <View style={styles.radioInnerCircle} />}
            </View>

            <Text
              style={[
                styles.radioText,
                selected === option && styles.radioTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
