// components/AulaForm.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../../styles/Grade"; // Ajuste o caminho conforme necessário
import {
  DIAS_SEMANA,
  HORARIOS,
  DiaSemana,
  Turma,
  Professor,
} from "../../data/Grade";

interface AulaFormProps {
  turmaId: string;
  professorId: string;
  diaSemana: DiaSemana;
  horario: string;
  disciplina: string;
  sala: string;
  onTurmaChange: (value: string) => void;
  onProfessorChange: (value: string) => void;
  onDiaChange: (value: DiaSemana) => void;
  onHorarioChange: (value: string) => void;
  onDisciplinaChange: (value: string) => void;
  onSalaChange: (value: string) => void;
  onAddAula: () => void;
  turmas: Turma[];
  professores: Professor[];
  isAdding?: boolean;
}

export function AulaForm({
  turmaId,
  professorId,
  diaSemana,
  horario,
  disciplina,
  sala,
  onTurmaChange,
  onProfessorChange,
  onDiaChange,
  onHorarioChange,
  onDisciplinaChange,
  onSalaChange,
  onAddAula,
  turmas,
  professores,
  isAdding = false,
}: AulaFormProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Turma *</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pickerScroll}
      >
        <View style={styles.pickerContainer}>
          {turmas.map((turma) => (
            <TouchableOpacity
              key={turma.idTurma}
              style={[
                styles.pickerOption,
                turmaId === turma.idTurma && styles.pickerOptionSelected,
              ]}
              onPress={() => onTurmaChange(turma.idTurma)}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  turmaId === turma.idTurma && styles.pickerOptionTextSelected,
                ]}
              >
                {turma.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.label}>Professor *</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pickerScroll}
      >
        <View style={styles.pickerContainer}>
          {professores.map((professor) => (
            <TouchableOpacity
              key={professor.idUsuario}
              style={[
                styles.pickerOption,
                professorId === professor.idUsuario &&
                  styles.pickerOptionSelected,
              ]}
              onPress={() => onProfessorChange(professor.idUsuario)}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  professorId === professor.idUsuario &&
                    styles.pickerOptionTextSelected,
                ]}
              >
                {professor.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.label}>Dia da Semana *</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pickerScroll}
      >
        <View style={styles.pickerContainer}>
          {DIAS_SEMANA.map((dia) => (
            <TouchableOpacity
              key={dia}
              style={[
                styles.pickerOption,
                diaSemana === dia && styles.pickerOptionSelected,
              ]}
              onPress={() => onDiaChange(dia)}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  diaSemana === dia && styles.pickerOptionTextSelected,
                ]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.label}>Horário *</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pickerScroll}
      >
        <View style={styles.pickerContainer}>
          {HORARIOS.map((h) => (
            <TouchableOpacity
              key={h}
              style={[
                styles.pickerOption,
                horario === h && styles.pickerOptionSelected,
              ]}
              onPress={() => onHorarioChange(h)}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  horario === h && styles.pickerOptionTextSelected,
                ]}
              >
                {h}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.label}>Disciplina *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Banco de Dados"
        placeholderTextColor="#7c8db5"
        value={disciplina}
        onChangeText={onDisciplinaChange}
      />

      <Text style={styles.label}>Sala</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Sala 101"
        placeholderTextColor="#7c8db5"
        value={sala}
        onChangeText={onSalaChange}
      />

      <TouchableOpacity
        style={[styles.button, isAdding && styles.buttonDisabled]}
        onPress={onAddAula}
        disabled={isAdding}
      >
        <Feather name="plus" size={18} color="#050E1D" />
        <Text style={styles.buttonText}>Adicionar Aula</Text>
      </TouchableOpacity>
    </View>
  );
}
