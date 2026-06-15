import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // ─── Layout base ───────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // ─── Header ────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#050E1D",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 80,
  },
  notification: {
    position: "relative",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: 2,
    backgroundColor: "#ff4757",
    borderRadius: 8,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },

  // ─── Tabs de turma ─────────────────────────────────────────────
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#0F1E33",
  },
  tabActive: {
    backgroundColor: "#00D2B4",
  },
  tabText: {
    color: "#5D708A",
    fontSize: 13,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#050E1D",
  },

  // ─── Título da página ──────────────────────────────────────────
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    marginTop: 4,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 4,
  },
  emptyText: {
    color: "#5D708A",
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
  },

  // ─── Cards de estatísticas ─────────────────────────────────────
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0F1E33",
    borderRadius: 14,
    padding: 16,
  },
  statIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  statLabel: {
    color: "#5D708A",
    fontSize: 12,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "600",
  },

  // ─── Card genérico ─────────────────────────────────────────────
  card: {
    backgroundColor: "#0F1E33",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 14,
  },

  // ─── Gráfico de faixas ─────────────────────────────────────────
  faixaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  faixaLabel: {
    color: "#5D708A",
    fontSize: 11,
    width: 44,
  },
  faixaBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#162030",
    borderRadius: 4,
    overflow: "hidden",
  },
  faixaBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  faixaCount: {
    fontSize: 12,
    fontWeight: "700",
    width: 18,
    textAlign: "right",
  },

  // ─── Card de aluno ─────────────────────────────────────────────
  alunoCard: {
    backgroundColor: "#0F1E33",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  alunoTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alunoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  medalha: {
    fontSize: 20,
    width: 30,
    textAlign: "center",
  },
  posicao: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#162030",
    color: "#5D708A",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30,
  },
  alunoNome: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  alunoSub: {
    color: "#5D708A",
    fontSize: 11,
    marginTop: 2,
  },
  alunoRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  alunoNota: {
    fontSize: 16,
    fontWeight: "700",
  },

  // ─── Tarefas pendentes ─────────────────────────────────────────
  pendentesContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#162030",
    paddingTop: 10,
    gap: 8,
  },
  tarefaPendenteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  tarefaPendenteNome: {
    color: "#8899AA",
    fontSize: 12,
    flex: 1,
  },
  btnIA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#00D2B4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnIAText: {
    color: "#050E1D",
    fontSize: 11,
    fontWeight: "700",
  },

  // ─── Modal ─────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(5, 14, 29, 0.85)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#0F1E33",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalTitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalTarefa: {
    color: "#5D708A",
    fontSize: 13,
    marginTop: 3,
  },

  // ─── Resposta do aluno ─────────────────────────────────────────
  respostaBox: {
    backgroundColor: "#162030",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  respostaLabel: {
    color: "#5D708A",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  respostaTexto: {
    color: "#A0B4C8",
    fontSize: 13,
    lineHeight: 20,
  },
  semResposta: {
    color: "#5D708A",
    fontSize: 13,
    fontStyle: "italic",
  },

  // ─── Avaliação IA ──────────────────────────────────────────────
  avaliacaoBox: {
    backgroundColor: "#162030",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  avaliacaoHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  avaliacaoHeaderText: {
    color: "#F5C542",
    fontSize: 13,
    fontWeight: "600",
  },
  avaliacaoNota: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 8,
  },
  avaliacaoFeedback: {
    color: "#8899AA",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  avaliacaoBtns: {
    flexDirection: "row",
    gap: 10,
  },
  btnConcordar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#00D2B4",
    borderRadius: 10,
    paddingVertical: 10,
  },
  btnConcordarText: {
    color: "#00D2B4",
    fontSize: 13,
    fontWeight: "600",
  },

  // ─── Botão avaliar IA ──────────────────────────────────────────
  btnAvaliarIA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#00D2B4",
    borderRadius: 12,
    paddingVertical: 14,
  },
  btnAvaliarIAText: {
    color: "#050E1D",
    fontSize: 14,
    fontWeight: "700",
  },
});
