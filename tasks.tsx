import { Button } from '@/components/button';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import TaskFilterTabs, { TaskFilter } from '../components/pill';

interface Tarefa {
  id: string;
  titulo: string;
  concluida: boolean;
  prazo?: string;
  categoria?: string;
}

const TAREFAS_INICIAIS: Tarefa[] = [
  { id: '1', titulo: 'Quiz – Normalização de banco', concluida: false, prazo: '23 Mar', categoria: 'Banco de Dados' },
  { id: '2', titulo: 'Entregar diagrama UML', concluida: false, prazo: '25 Mar', categoria: 'Eng. de Software' },
  { id: '3', titulo: 'Lista de integrais duplas', concluida: true, prazo: '28 Mar', categoria: 'Cálculo II' },
];

const DISCIPLINAS = ['Banco de Dados', 'Eng. de Software', 'Cálculo II', 'Redes', 'IA', 'Ética'];
const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
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
      days.push({ date: new Date(current), currentMonth: current.getMonth() === month });
      current.setDate(current.getDate() + 1);
    }
    matrix.push(days);
  }

  return matrix;
}

export default function Tasks() {
  const [filter, setFilter] = useState<TaskFilter>('todas');
  const [tarefas, setTarefas] = useState<Tarefa[]>(TAREFAS_INICIAIS);
  const [modalVisible, setModalVisible] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoTitulo, setNovoTitulo] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filter === 'pendentes') return !tarefa.concluida;
    if (filter === 'concluidas') return tarefa.concluida;
    return true;
  });

  function toggleConclusao(id: string) {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
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
    setNovoTitulo('');
    setNovaCategoria('');
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
    setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + increment, 1));
  }

  const calendarMatrix = getMonthMatrix(calendarMonth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tarefas</Text>
        <Button label={'+ \u00A0Nova Tarefa'} onPress={abrirModal} />
      </View>

      <TaskFilterTabs activeFilter={filter} onFilterChange={setFilter} />

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {tarefasFiltradas.map((tarefa) => (
          <View key={tarefa.id} style={styles.card}>
            <TouchableOpacity
              style={styles.cardRow}
              activeOpacity={0.8}
              onPress={() => toggleConclusao(tarefa.id)}
            >
              <View style={[styles.checkbox, tarefa.concluida && styles.checkboxActive]}>
                {tarefa.concluida && <View style={styles.checkboxTick} />}
              </View>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, tarefa.concluida && styles.cardTitleDone]}>
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
                    style={[styles.disciplinaButton, selecionada && styles.disciplinaButtonActive]}
                    onPress={() => setNovaCategoria(disciplina)}
                  >
                    <Text style={[styles.disciplinaText, selecionada && styles.disciplinaTextActive]}>
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
              <Text style={selectedDate ? styles.dateText : styles.placeholderText}>
                {selectedDate ? formatDate(selectedDate) : 'Selecione a data' }
              </Text>
            </Pressable>

            {calendarVisible && (
              <View style={styles.calendarBox}>
                <View style={styles.calendarHeader}>
                  <Pressable style={styles.monthNav} onPress={() => mudarMes(-1)}>
                    <Text style={styles.monthNavText}>{'<'}</Text>
                  </Pressable>
                  <Text style={styles.calendarTitle}>
                    {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                  </Text>
                  <Pressable style={styles.monthNav} onPress={() => mudarMes(1)}>
                    <Text style={styles.monthNavText}>{'>'}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1542',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },
  list: {
    marginTop: 12,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: '#15204a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#23305f',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5d7eff',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#00C8B4',
    borderColor: '#00C8B4',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#0d1424',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardTitleDone: {
    color: '#8a99b8',
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    color: '#8a99b8',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#101a35',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a3b6c',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  fieldLabel: {
    color: '#8a99b8',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 12,
  },
  disciplinaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  disciplinaButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4d5f8f',
    marginBottom: 8,
    marginHorizontal: 4,
  },
  disciplinaButtonActive: {
    backgroundColor: '#00C8B4',
    borderColor: '#00C8B4',
  },
  disciplinaText: {
    color: '#d2d9e8',
    fontSize: 12,
  },
  disciplinaTextActive: {
    color: '#0d1424',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#0f1945',
    color: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a3b6c',
    justifyContent: 'center',
  },
  dateText: {
    color: '#fff',
  },
  placeholderText: {
    color: '#7f8ca1',
  },
  calendarBox: {
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#0e1b3f',
    borderWidth: 1,
    borderColor: '#243463',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthNav: {
    padding: 8,
  },
  monthNavText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  calendarTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDayText: {
    color: '#7f8ca1',
    fontSize: 11,
    width: 30,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dayButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonDisabled: {
    opacity: 0.3,
  },
  dayButtonSelected: {
    backgroundColor: '#00C8B4',
  },
  dayText: {
    color: '#fff',
    fontSize: 12,
  },
  dayTextDisabled: {
    color: '#64739b',
  },
  dayTextSelected: {
    color: '#0d1424',
    fontWeight: '700',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#22315a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#00C8B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: '700',
  },
  saveText: {
    color: '#0d1424',
    fontWeight: '700',
  },
});