// components/AulaList.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../../styles/Grade";
import { AulaRequestDTO } from "../../data/Grade";

interface AulaListProps {
  aulas: AulaRequestDTO[];
  onRemoveAula: (index: number) => void;
  getTurmaNome?: (id: string) => string;
  getProfessorNome?: (id: string) => string;
}

export function AulaList({
  aulas,
  onRemoveAula,
  getTurmaNome,
  getProfessorNome,
}: AulaListProps) {
  if (aulas.length === 0) return null;

  return (
    <>
      <Text style={styles.sectionTitle}>
        Aulas para salvar ({aulas.length})
      </Text>

      {aulas.map((aula, index) => (
        <View key={index} style={styles.turmaCard}>
          <View style={styles.aulaCardContent}>
            <View style={styles.aulaInfo}>
              <View style={styles.aulaHeader}>
                <Text style={styles.turmaNome}>
                  {aula.diaSemana} - {aula.horario}
                </Text>
                <TouchableOpacity
                  onPress={() => onRemoveAula(index)}
                  style={styles.deleteButton}
                >
                  <Feather name="trash-2" size={20} color="#FF5A5A" />
                </TouchableOpacity>
              </View>

              <Text style={styles.turmaInfo}>
                <Text style={styles.labelBold}>Disciplina:</Text>{" "}
                {aula.disciplina}
              </Text>

              {aula.sala && aula.sala !== "Sala não informada" && (
                <Text style={styles.turmaId}>
                  <Text style={styles.labelBold}>Sala:</Text> {aula.sala}
                </Text>
              )}

              {getTurmaNome && (
                <Text style={styles.turmaId}>
                  <Text style={styles.labelBold}>Turma:</Text>{" "}
                  {getTurmaNome(aula.idTurma)}
                </Text>
              )}

              {getProfessorNome && (
                <Text style={styles.turmaId}>
                  <Text style={styles.labelBold}>Professor:</Text>{" "}
                  {getProfessorNome(aula.idProfessor)}
                </Text>
              )}
            </View>
          </View>
        </View>
      ))}
    </>
  );
}
