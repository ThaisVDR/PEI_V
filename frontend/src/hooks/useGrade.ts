// hooks/useGrade.ts
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Turma, Professor, AulaRequestDTO, DiaSemana } from "../data/Grade";

export function useGradeHoraria() {
  const { user } = useAuth();

  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [aulas, setAulas] = useState<AulaRequestDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [professorSelecionado, setProfessorSelecionado] = useState("");
  const [diaSemana, setDiaSemana] = useState<DiaSemana>("SEGUNDA");
  const [horario, setHorario] = useState("08:00");
  const [disciplina, setDisciplina] = useState("");
  const [sala, setSala] = useState("");

  async function carregarDados() {
    if (!user?.token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const [turmasResponse, professoresResponse] = await Promise.all([
        api.get("/coordenacao/turmas", {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
        api.get("/coordenacao/professores", {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
      ]);

      const turmasData = turmasResponse.data.map((t: any) => ({
        idTurma: t.idTurma,
        nome: t.nome,
        nomeProfessor: t.nomeProfessor,
        ativa: t.ativa,
      }));

      const professoresData = professoresResponse.data.map((p: any) => ({
        ...p,
        id: p.idUsuario || p.id, // Garante compatibilidade se o formulário ler .id
        idUsuario: p.idUsuario || p.id, // Garante compatibilidade se o hook ler .idUsuario
        nome: p.nome || "Professor sem nome",
      }));

      setTurmas(turmasData);
      setProfessores(professoresData);
    } catch (error: any) {
      console.log("Erro ao carregar dados:", error?.response?.data || error);
      Alert.alert("Erro", "Não foi possível carregar turmas e professores.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function adicionarAula(): boolean {
    if (!turmaSelecionada) {
      Alert.alert("Atenção", "Selecione uma turma.");
      return false;
    }

    if (!professorSelecionado) {
      Alert.alert("Atenção", "Selecione um professor.");
      return false;
    }

    if (!disciplina.trim()) {
      Alert.alert("Atenção", "Informe a disciplina.");
      return false;
    }

    const novaAula: AulaRequestDTO = {
      diaSemana,
      horario,
      disciplina: disciplina.trim(),
      sala: sala.trim() || "Sala não informada",
      idProfessor: professorSelecionado,
      idTurma: turmaSelecionada,
    };

    setAulas((prev) => [...prev, novaAula]);

    setDisciplina("");
    setSala("");

    return true;
  }

  function removerAula(index: number) {
    Alert.alert("Remover Aula", "Tem certeza que deseja remover esta aula?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setAulas((prev) => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  }

  async function salvarGrade(): Promise<boolean> {
    if (!user?.token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return false;
    }

    const aulasNovas = aulas.filter((a) => !a.salva);

    if (aulasNovas.length === 0) {
      Alert.alert("Atenção", "Adicione pelo menos uma aula nova.");
      return false;
    }

    setIsSaving(true);

    try {
      const payload = { aulas: aulasNovas };

      await api.post("/coordenacao/grade", payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      Alert.alert("Sucesso", "Grade salva com sucesso!");

      // marca todas como salvas, sem remover da lista
      setAulas((prev) => prev.map((a) => ({ ...a, salva: true })));
      setDisciplina("");
      setSala("");

      return true;
    } catch (error: any) {
      console.log("Erro ao salvar grade:", error?.response?.data);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "Erro ao salvar grade.";
      Alert.alert("Erro", errorMessage);
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  const getTurmaNome = useCallback(
    (idTurma: string) => {
      const turma = turmas.find((t) => t.idTurma === idTurma);
      return turma?.nome || idTurma;
    },
    [turmas],
  );

  const getProfessorNome = useCallback(
    (idProfessor: string) => {
      const professor = professores.find((p) => p.idUsuario === idProfessor);
      return professor?.nome || idProfessor;
    },
    [professores],
  );

  return {
    turmas,
    professores,
    aulas,
    isLoading,
    isSaving,
    formState: {
      turmaSelecionada,
      professorSelecionado,
      diaSemana,
      horario,
      disciplina,
      sala,
    },
    setTurmaSelecionada,
    setProfessorSelecionado,
    setDiaSemana,
    setHorario,
    setDisciplina,
    setSala,
    adicionarAula,
    removerAula,
    salvarGrade,
    recarregarDados: carregarDados,
    getTurmaNome,
    getProfessorNome,
  };
}
