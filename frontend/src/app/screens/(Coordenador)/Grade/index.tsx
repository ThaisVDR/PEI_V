import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../../../../services/api";

interface Aula {
  id: string;
  dia: string;
  horario: string;
  disciplina: string;
  idProfessor: string;
  sala: string;
  turma: string;
}

export default function Grade() {
  const [dia] = useState("Segunda");
  const [horario] = useState("08:00");

  const [disciplina, setDisciplina] = useState("");
  const [idProfessor, setIdProfessor] = useState<string>("");
  const [sala, setSala] = useState("");
  const [turma, setTurma] = useState("");

  const [aulas, setAulas] = useState<Aula[]>([]);

  function adicionarAula() {
    if (!disciplina || !idProfessor || !sala || !turma) return;
    setAulas((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        dia,
        horario,
        disciplina,
        idProfessor,
        sala,
        turma,
      },
    ]);

    setDisciplina("");
    setIdProfessor("");
    setSala("");
  }

  function removerAula(id: string) {
    setAulas((prev) => prev.filter((item) => item.id !== id));
  }

  async function salvarGrade() {
    try {
      if (aulas.length === 0) return;

      const turmasUnicas = [...new Set(aulas.map((a) => a.turma))];

      const turmasCriadas: any[] = [];

      for (const nomeTurma of turmasUnicas) {
        for (const nomeTurma of turmasUnicas) {
          const aulasDaTurma = aulas.filter((a) => a.turma === nomeTurma);

          if (aulasDaTurma.length === 0) continue;

          const { data } = await api.post("/coordenacao/turmas", {
            nome: nomeTurma,
            idProfessor: aulasDaTurma[0].idProfessor,
          });

          turmasCriadas.push(data);
        }
      }
      console.log("TURMAS CRIADAS:", turmasCriadas);
      console.log("GRADE:", aulas);
    } catch (error: any) {
      console.log(error?.response?.data || error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Aula</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Disciplina</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Banco de Dados"
          placeholderTextColor="#7c8db5"
          value={disciplina}
          onChangeText={setDisciplina}
        />

        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.label}>ID Professor</Text>

            <TextInput
              style={styles.input}
              placeholder="UUID do professor"
              placeholderTextColor="#7c8db5"
              value={idProfessor}
              onChangeText={setIdProfessor}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Sala</Text>

            <TextInput
              style={styles.input}
              placeholder="Sala 101"
              placeholderTextColor="#7c8db5"
              value={sala}
              onChangeText={setSala}
            />
          </View>
        </View>

        <Text style={styles.label}>Turma</Text>
        <TextInput
          style={styles.input}
          placeholder="2A"
          placeholderTextColor="#7c8db5"
          value={turma}
          onChangeText={setTurma}
        />

        <TouchableOpacity style={styles.addButton} onPress={adicionarAula}>
          <Text style={styles.addButtonText}>+ Aula</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Grade Horária ({aulas.length} aulas)
      </Text>

      {aulas.map((aula) => (
        <View key={aula.id} style={styles.aulaCard}>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => removerAula(aula.id)}
          >
            <Feather name="trash-2" size={18} color="#ff5b5b" />
          </TouchableOpacity>

          <Text style={styles.day}>
            {aula.dia} {aula.horario}
          </Text>

          <Text style={styles.subject}>{aula.disciplina}</Text>

          <Text style={styles.info}>Professor ID: {aula.idProfessor}</Text>

          <Text style={styles.info}>{aula.sala}</Text>

          <Text style={styles.tag}>{aula.turma}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={salvarGrade}>
        <Text style={styles.saveButtonText}>Salvar Grade</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
    padding: 16,
  },

  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#10213E",
    borderRadius: 12,
    padding: 14,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  flex: {
    flex: 1,
  },

  label: {
    color: "#A8B3CF",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#223654",
    borderRadius: 10,
    padding: 12,
    color: "#FFF",
  },

  addButton: {
    marginTop: 16,
    backgroundColor: "#16C7E7",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  addButtonText: {
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
  },

  aulaCard: {
    backgroundColor: "#10213E",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  delete: {
    alignSelf: "flex-end",
  },

  day: {
    color: "#00D9FF",
    fontWeight: "700",
  },

  subject: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },

  info: {
    color: "#A8B3CF",
    marginTop: 2,
  },

  tag: {
    color: "#C6B6FF",
    marginTop: 6,
  },

  saveButton: {
    backgroundColor: "#16C7E7",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 40,
    alignItems: "center",
  },

  saveButtonText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
