import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.12)",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  notification: {
    position: "relative",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#ff4757",
    borderRadius: 8,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  // ── Hero Banner ─────────────────────────────────────────
  heroBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    height: 110,
  },
  heroBannerGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  heroGreeting: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },
  heroName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  heroRole: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    marginTop: 2,
  },
  heroIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Stats Row ───────────────────────────────────────────
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  statLabel: {
    color: "#5D708A",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  statValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  statIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },

  // ── Section Header ──────────────────────────────────────
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionLink: {
    color: "#007BFF",
    fontSize: 13,
    fontWeight: "600",
  },

  // ── Pending Card ────────────────────────────────────────
  pendingCard: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  pendingInfo: {
    flex: 1,
    marginRight: 12,
  },
  pendingTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  pendingClass: {
    color: "#5D708A",
    fontSize: 12,
    marginBottom: 6,
  },
  pendingDeadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pendingDeadline: {
    color: "#5D708A",
    fontSize: 12,
  },
  pendingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,71,87,0.12)",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  pendingBadgeText: {
    color: "#ff4757",
    fontSize: 13,
    fontWeight: "700",
  },

  // ── Turma Card ──────────────────────────────────────────
  turmaCard: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  turmaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  turmaNome: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  turmaChevron: {
    opacity: 0.5,
  },
  turmaInfoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  turmaInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  turmaInfoText: {
    color: "#5D708A",
    fontSize: 12,
  },
  progressLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabelText: {
    color: "#5D708A",
    fontSize: 12,
  },
  progressLabelValue: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: 6,
    backgroundColor: "#007BFF",
    borderRadius: 3,
  },
  turmaMediaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  turmaMediaText: {
    color: "#00d2b4",
    fontSize: 12,
    fontWeight: "600",
  },

  // ── Bottom spacer ───────────────────────────────────────
  bottomSpacer: {
    height: 32,
  },
});
