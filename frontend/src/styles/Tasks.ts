import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.26)",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 100,
    height: 80,
  },
  pageTitle: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 16,
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
  cardRow: {
    flexDirection: "row",
    alignItems: "center", // Garante que checkbox, conteúdo e botão fiquem alinhados horizontalmente
    justifyContent: "space-between",
  },
  cardObjective: {
    color: "#8a99b8",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 6,
  },
  resolverBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00d2b4", // Cor ciano correspondente aos seus botões "Resolver"
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
    marginLeft: 8,
  },
  resolverBtnConcluido: {
    backgroundColor: "rgba(255, 255, 255, 0.05)", // Fundo sutil para tarefas já resolvidas
    paddingHorizontal: 8,
  },
  resolverBtnText: {
    color: "#050E1D",
    fontSize: 12,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
  },
  list: {
    marginTop: 12,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: "#15204a",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#23305f",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#051329",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "85%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#FFF" },
  closeButton: { backgroundColor: "#0F2B54", padding: 6, borderRadius: 20 },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContent: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 14,
    color: "#A2B6D0",
    marginBottom: 6,
    lineHeight: 18,
  },
  cardTime: {
    fontSize: 12,
    color: "#5D708A",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#5D708A",
    fontSize: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5d7eff",
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  checkboxTick: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#0d1424",
  },
  cardContent: {
    flex: 1,
  },
  cardTitleDone: {
    color: "#8a99b8",
    textDecorationLine: "line-through",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    color: "#8a99b8",
    fontSize: 12,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
  },
  fieldLabel: {
    color: "#8a99b8",
    fontSize: 13,
    marginBottom: 8,
    marginTop: 12,
  },
  disciplinaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  disciplinaButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4d5f8f",
    marginBottom: 8,
    marginHorizontal: 4,
  },
  disciplinaButtonActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  disciplinaText: {
    color: "#d2d9e8",
    fontSize: 12,
  },
  disciplinaTextActive: {
    color: "#0d1424",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#0f1945",
    color: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#2a3b6c",
    justifyContent: "center",
  },
  dateText: {
    color: "#fff",
  },
  placeholderText: {
    color: "#7f8ca1",
  },
  calendarBox: {
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#0e1b3f",
    borderWidth: 1,
    borderColor: "#243463",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthNav: {
    padding: 8,
  },
  monthNavText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  calendarTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDayText: {
    color: "#7f8ca1",
    fontSize: 11,
    width: 30,
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  dayButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dayButtonDisabled: {
    opacity: 0.3,
  },
  dayButtonSelected: {
    backgroundColor: "#007bff",
  },
  dayText: {
    color: "#fff",
    fontSize: 12,
  },
  dayTextDisabled: {
    color: "#64739b",
  },
  dayTextSelected: {
    color: "#0d1424",
    fontWeight: "700",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#22315a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "700",
  },
  saveText: {
    color: "#0d1424",
    fontWeight: "700",
  },
  newTaskButton: {
    width: "auto",
    marginTop: 10,
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 5,
  },
});
