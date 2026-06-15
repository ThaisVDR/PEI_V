import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
  },
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
  pageTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    marginTop: 4,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  headerTitle: {
    color: "#E8EDF8",
    fontSize: 22,
    fontWeight: "700",
  },

  // ─── Formulário ───────────────────────────────────────────────────────────
  form: {
    gap: 6,
  },
  textAreaContainer: {
    position: "relative",
  },
  charCounter: {
    color: "#5D708A",
    fontSize: 12,
    textAlign: "left",
    marginTop: 4,
    marginBottom: 12,
  },
  charCounterMax: {
    color: "#2A4070",
  },

  // ─── Upload ───────────────────────────────────────────────────────────────
  uploadContainer: {
    marginBottom: 8,
  },
  uploadLabel: {
    color: "#7a869a",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  uploadBox: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.08)",
    borderStyle: "dashed",
    borderRadius: 14,
    paddingVertical: 28,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  uploadIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  uploadTitle: {
    color: "#E8EDF8",
    fontSize: 14,
    fontWeight: "700",
  },
  uploadSubtitle: {
    color: "#5D708A",
    fontSize: 12,
  },

  // ─── Lista de arquivos ────────────────────────────────────────────────────
  filesList: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1E2D47",
  },
  filesListLabel: {
    color: "#5D708A",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0A1929",
    borderRadius: 8,
    padding: 10,
  },
  fileIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(0,210,180,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  fileName: {
    color: "#8DA6C8",
    fontSize: 13,
    flex: 1,
  },

  // ─── Seção de turmas (lista inline, sem modal) ────────────────────────────
  turmasLabel: {
    color: "#7a869a",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 8,
  },
  turmaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1B2E",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  turmaItemSelecionado: {
    borderColor: "#16C7E7",
    backgroundColor: "rgba(22, 199, 231, 0.06)",
  },
  turmaRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3B4E6B",
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  turmaRadioSelecionado: {
    borderColor: "#16C7E7",
  },
  turmaRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16C7E7",
  },
  turmaItemContent: {
    flex: 1,
  },
  turmaItemText: {
    color: "#E8EDF8",
    fontSize: 15,
    fontWeight: "600",
  },
  turmaItemSub: {
    color: "#5D708A",
    fontSize: 12,
    marginTop: 2,
  },

  // ─── Botão enviar ─────────────────────────────────────────────────────────
  btnEnviar: {
    flexDirection: "row",
    backgroundColor: "#16C7E7",
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
    marginBottom: 40,
  },
  btnEnviarText: {
    color: "#050E1D",
    fontSize: 16,
    fontWeight: "700",
  },

  // ─── Modal ────────────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#0D1B2E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalTitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  modalContent: {
    backgroundColor: "#101D33",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "70%",
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: "rgba(22, 199, 231, 0.15)",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: "#0A1628",
  },
  modalItemSelecionado: {
    backgroundColor: "rgba(0,210,180,0.1)",
    borderWidth: 1,
    borderColor: "#00D2B4",
  },
  modalItemTexto: {
    flex: 1,
    color: "#A0AEC0",
    fontSize: 14,
  },
  modalItemTextoSelecionado: {
    color: "#00D2B4",
    fontWeight: "600",
  },
  modalEmpty: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 12,
  },
  modalEmptyText: {
    color: "#5D708A",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  emptyText: {
    color: "#7c8db5",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 40,
  },

  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0D1B2E",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  dateText: {
    color: "#E8EDF8",
    fontSize: 15,
  },
  datePlaceholder: {
    color: "#3B4E6B",
    fontSize: 15,
  },
});
