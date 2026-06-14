import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { styles } from "../../../../styles/Grade";
import { useGradeHoraria } from "../../../../hooks/useGrade";
import { AulaForm } from "../../../../components/AulaForm/aulaForm";
import { AulaList } from "../../../../components/AulaList/aulaList";

export default function MontarGrade() {
  const router = useRouter();
  const {
    turmas,
    professores,
    aulas,
    isLoading,
    isSaving,
    formState,
    setTurmaSelecionada,
    setProfessorSelecionado,
    setDiaSemana,
    setHorario,
    setDisciplina,
    setSala,
    adicionarAula,
    removerAula,
    salvarGrade,
    recarregarDados,
    getTurmaNome,
    getProfessorNome,
  } = useGradeHoraria();
  useFocusEffect(
    React.useCallback(() => {
      recarregarDados();
      return () => {};
    }, []),
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#050E1D" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={recarregarDados} />
      }
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../../assets/icon_questio.png")}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity style={styles.notification}>
          <Ionicons name="notifications" size={30} color="#5D708A" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Montar Grade Horária</Text>

      <TouchableOpacity
        style={styles.createTurmaButton}
        onPress={() => router.push("/screens/(Coordenador)/Turmas")}
      >
        <Feather name="plus-circle" size={20} color="#2E7D32" />
        <Text style={styles.createTurmaButtonText}>+ Criar Nova Turma</Text>
      </TouchableOpacity>

      <AulaForm
        turmaId={formState.turmaSelecionada}
        professorId={formState.professorSelecionado}
        diaSemana={formState.diaSemana}
        horario={formState.horario}
        disciplina={formState.disciplina}
        sala={formState.sala}
        onTurmaChange={setTurmaSelecionada}
        onProfessorChange={setProfessorSelecionado}
        onDiaChange={setDiaSemana}
        onHorarioChange={setHorario}
        onDisciplinaChange={setDisciplina}
        onSalaChange={setSala}
        onAddAula={adicionarAula}
        turmas={turmas}
        professores={professores}
      />

      <AulaList
        aulas={aulas}
        onRemoveAula={(index: number) => removerAula(index)}
        getTurmaNome={getTurmaNome}
        getProfessorNome={getProfessorNome}
      />

      {aulas.length > 0 && (
        <TouchableOpacity
          style={[
            styles.button,
            styles.saveButton,
            isSaving && styles.buttonDisabled,
          ]}
          onPress={salvarGrade}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#050E1D" />
          ) : (
            <>
              <Feather name="save" size={18} color="#050E1D" />
              <Text style={styles.buttonText}>
                Salvar Grade ({aulas.length} aulas)
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {turmas.length === 0 && (
        <View style={styles.emptyContainer}>
          <Feather name="alert-circle" size={48} color="#7c8db5" />
          <Text style={styles.emptyText}>
            Nenhuma turma encontrada.{"\n"}
            Clique em "Criar Nova Turma" para começar.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
