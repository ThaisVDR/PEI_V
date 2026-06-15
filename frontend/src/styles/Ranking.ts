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
    paddingTop: 5,
    paddingBottom: 5,
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

  lista: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#061B33",
    borderWidth: 1,
    borderColor: "#003A5D",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  rowHighlight: {
    borderColor: "#0177F1",
    backgroundColor: "#08253F",
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

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  closeButton: {
    backgroundColor: "#0F2B54",
    padding: 6,
    borderRadius: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#0A1F3D",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#3AC3FF",
  },
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

  posicao: {
    width: 30,
    color: "#64748B",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0177F1",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  avatarText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 14,
  },

  info: {
    flex: 1,
  },

  nome: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cargo: {
    color: "#7B8CA7",
    fontSize: 12,
    marginTop: 2,
  },

  pontos: {
    color: "#FFD700",
    fontWeight: "800",
    fontSize: 18,
  },
  notification: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0B3556",
    justifyContent: "center",
    alignItems: "center",
  },

  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF3B7A",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 10,
  },
});
