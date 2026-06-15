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

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },

  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  verTodas: {
    color: "#0177F1",
    fontSize: 13,
    fontWeight: "600",
  },

  progressBarTrack: {
    height: 15,
    backgroundColor: "#0F2137",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0177F1",
    borderRadius: 99,
    minWidth: 8,
  },
  progressLabel: {
    color: "#5D708A",
    fontSize: 12,
    marginTop: 8,
  },
 card: {
    backgroundColor: '#071427',
    borderRadius: 16,
    padding: 25,
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#0177F1',
  },

  tarefaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A1929",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#5D708A",
    marginRight: 12,
    flexShrink: 0,
  },
  tarefaContent: {
    flex: 1,
  },
  tarefaTitulo: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    lineHeight: 19,
  },
  tarefaMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoriaBadge: {
    backgroundColor: "rgba(0,210,180,0.15)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoriaText: {
    color: "#00D2B4",
    fontSize: 11,
    fontWeight: "600",
  },
  atrasadaText: {
    color: "#FF6B6B",
    fontSize: 11,
    fontWeight: "500",
  },
  pontos: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },

  emptyText: {
    color: "#5D708A",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },

    atalhoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0A1929",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  atalhoText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});