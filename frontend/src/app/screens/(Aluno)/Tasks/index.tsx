import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Button } from "../../../../components/Button/button";
import { styles } from "../../../../styles/Tasks";
import {
  DISCIPLINAS,
  MONTH_NAMES,
  Tarefa,
  TAREFAS_INICIAIS,
  WEEK_DAYS,
} from "../../../../data/Tasks";
import TaskFilterTabs, { TaskFilter } from "../../../../components/pill/pill";

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = MONTH_NAMES[date.getMonth()];
  return `${day} ${month}`;
}

function getMonthMatrix(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayIndex = firstDayOfMonth.getDay();
  const matrix: Array<Array<{ date: Date; currentMonth: boolean }>> = [];

  let current = new Date(year, month, 1 - startDayIndex);

  for (let week = 0; week < 6; week += 1) {
    const days: Array<{ date: Date; currentMonth: boolean }> = [];
    for (let day = 0; day < 7; day += 1) {
      days.push({
        date: new Date(current),
        currentMonth: current.getMonth() === month,
      });
      current.setDate(current.getDate() + 1);
    }
    matrix.push(days);
  }

  return matrix;
}

export default function Tasks() {
  const [filter, setFilter] = useState<TaskFilter>("todas");
  const [tarefas, setTarefas] = useState<Tarefa[]>(TAREFAS_INICIAIS);
  const [modalVisible, setModalVisible] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novoTitulo, setNovoTitulo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filter === "pendentes") return !tarefa.concluida;
    if (filter === "concluidas") return tarefa.concluida;
    return true;
  });

  function toggleConclusao(id: string) {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }

  function abrirModal() {
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
    limparFormulario();
  }

  function limparFormulario() {
    setNovoTitulo("");
    setNovaCategoria("");
    setSelectedDate(null);
    setCalendarVisible(false);
    setCalendarMonth(new Date());
  }

  function salvarTarefa() {
    if (!novoTitulo.trim() || !novaCategoria || !selectedDate) {
      return;
    }

    const novaTarefa: Tarefa = {
      id: String(Date.now()),
      titulo: novoTitulo.trim(),
      categoria: novaCategoria,
      prazo: formatDate(selectedDate),
      concluida: false,
    };

    setTarefas((prev) => [novaTarefa, ...prev]);
    fecharModal();
  }

  function abrirCalendario() {
    setCalendarVisible(true);
  }

  function fecharCalendario() {
    setCalendarVisible(false);
  }

  function selecionarData(date: Date) {
    setSelectedDate(date);
    setCalendarVisible(false);
  }

  function mudarMes(increment: number) {
    setCalendarMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment, 1),
    );
  }

  const calendarMatrix = getMonthMatrix(calendarMonth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tarefas</Text>
      </View>

      <TaskFilterTabs activeFilter={filter} onFilterChange={setFilter} />

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {tarefasFiltradas.map((tarefa) => (
          <View key={tarefa.id} style={styles.card}>
            <TouchableOpacity
              style={styles.cardRow}
              activeOpacity={0.8}
              onPress={() => toggleConclusao(tarefa.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  tarefa.concluida && styles.checkboxActive,
                ]}
              >
                {tarefa.concluida && <View style={styles.checkboxTick} />}
              </View>
              <View style={styles.cardContent}>
                <Text
                  style={[
                    styles.cardTitle,
                    tarefa.concluida && styles.cardTitleDone,
                  ]}
                >
                  {tarefa.titulo}
                </Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{tarefa.categoria}</Text>
                  <Text style={styles.metaText}>{tarefa.prazo}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova tarefa</Text>

            <Text style={styles.fieldLabel}>Matéria</Text>
            <View style={styles.disciplinaRow}>
              {DISCIPLINAS.map((disciplina) => {
                const selecionada = disciplina === novaCategoria;
                return (
                  <Pressable
                    key={disciplina}
                    style={[
                      styles.disciplinaButton,
                      selecionada && styles.disciplinaButtonActive,
                    ]}
                    onPress={() => setNovaCategoria(disciplina)}
                  >
                    <Text
                      style={[
                        styles.disciplinaText,
                        selecionada && styles.disciplinaTextActive,
                      ]}
                    >
                      {disciplina}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.fieldLabel}>Nome da tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o título"
              placeholderTextColor="#7f8ca1"
              value={novoTitulo}
              onChangeText={setNovoTitulo}
            />

            <Text style={styles.fieldLabel}>Prazo</Text>
            <Pressable style={styles.input} onPress={abrirCalendario}>
              <Text
                style={selectedDate ? styles.dateText : styles.placeholderText}
              >
                {selectedDate ? formatDate(selectedDate) : "Selecione a data"}
              </Text>
            </Pressable>

            {calendarVisible && (
              <View style={styles.calendarBox}>
                <View style={styles.calendarHeader}>
                  <Pressable
                    style={styles.monthNav}
                    onPress={() => mudarMes(-1)}
                  >
                    <Text style={styles.monthNavText}>{"<"}</Text>
                  </Pressable>
                  <Text style={styles.calendarTitle}>
                    {MONTH_NAMES[calendarMonth.getMonth()]}{" "}
                    {calendarMonth.getFullYear()}
                  </Text>
                  <Pressable
                    style={styles.monthNav}
                    onPress={() => mudarMes(1)}
                  >
                    <Text style={styles.monthNavText}>{">"}</Text>
                  </Pressable>
                </View>
                <View style={styles.weekDaysRow}>
                  {WEEK_DAYS.map((day) => (
                    <Text key={day} style={styles.weekDayText}>
                      {day}
                    </Text>
                  ))}
                </View>
                {calendarMatrix.map((week, weekIndex) => (
                  <View key={weekIndex} style={styles.weekRow}>
                    {week.map(({ date, currentMonth }) => {
                      const isSelected = selectedDate
                        ? date.toDateString() === selectedDate.toDateString()
                        : false;
                      return (
                        <Pressable
                          key={date.toISOString()}
                          style={[
                            styles.dayButton,
                            !currentMonth && styles.dayButtonDisabled,
                            isSelected && styles.dayButtonSelected,
                          ]}
                          onPress={() => selecionarData(date)}
                          disabled={!currentMonth}
                        >
                          <Text
                            style={[
                              styles.dayText,
                              !currentMonth && styles.dayTextDisabled,
                              isSelected && styles.dayTextSelected,
                            ]}
                          >
                            {date.getDate()}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>
            )}

            <View style={styles.modalButtons}>
              <Pressable style={styles.cancelButton} onPress={fecharModal}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={salvarTarefa}>
                <Text style={styles.saveText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
