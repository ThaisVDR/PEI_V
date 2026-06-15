import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },

  // ── Header ───────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  backBtn: {
    marginRight: 12,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },

  // ── Tab Bar ──────────────────────────────────────────────
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 4,
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: "#007BFF",
  },
  tabBtnText: {
    color: "#5D708A",
    fontSize: 13,
    fontWeight: "600",
  },
  tabBtnTextActive: {
    color: "#fff",
  },

  // ── Scroll content ───────────────────────────────────────
  scrollContent: {
    padding: 20,
    gap: 16,
  },

  // ── Info Card (XP + prazo) ───────────────────────────────
  infoCard: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(0,210,180,0.15)",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  xpText: {
    color: "#00d2b4",
    fontWeight: "700",
    fontSize: 15,
  },
  deadlineText: {
    color: "#7c8db5",
    fontSize: 13,
  },
  urgentBadge: {
    backgroundColor: "rgba(255,71,87,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  urgentText: {
    color: "#ff4757",
    fontSize: 11,
    fontWeight: "700",
  },
  concludedBadge: {
    marginLeft: "auto" as any,
    backgroundColor: "rgba(0,210,180,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  concludedText: {
    color: "#00d2b4",
    fontSize: 12,
    fontWeight: "600",
  },

  // ── Descrição ────────────────────────────────────────────
  sectionLabel: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 8,
  },
  descCard: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  descText: {
    color: "#C0CFDF",
    fontSize: 14,
    lineHeight: 22,
  },

  // ── PDF Viewer ───────────────────────────────────────────
  pdfBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    overflow: "hidden",
  },
  pdfPlaceholderText: {
    color: "#aaa",
    fontSize: 13,
  },

  // ── Resposta (aba direita) ───────────────────────────────
  respostaCard: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    overflow: "hidden",
  },
  respostaCardLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  textInput: {
    backgroundColor: "transparent",
    padding: 16,
    paddingTop: 0,
    color: "#FFF",
    fontSize: 14,
    minHeight: 110,
    textAlignVertical: "top",
  },
  charCount: {
    color: "#3B4A61",
    fontSize: 12,
    textAlign: "right",
    paddingHorizontal: 16,
    paddingBottom: 14,
  },

  // ── Upload ───────────────────────────────────────────────
  uploadBox: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(0,123,255,0.3)",
    borderStyle: "dashed",
    padding: 28,
    alignItems: "center",
    gap: 8,
  },
  uploadTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 4,
  },
  uploadSubtitle: {
    color: "#5D708A",
    fontSize: 12,
  },
  uploadedFile: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,210,180,0.25)",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  uploadedFileName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  uploadedFileSize: {
    color: "#5D708A",
    fontSize: 12,
  },
  removeFile: {
    padding: 4,
  },

  // ── Botão Enviar ─────────────────────────────────────────
  submitBtn: {
    backgroundColor: "#00d2b4",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: "#050E1D",
    fontWeight: "700",
    fontSize: 16,
  },

  // ── Concluída banner ─────────────────────────────────────
  concludedBanner: {
    backgroundColor: "rgba(0,210,180,0.08)",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,210,180,0.2)",
    gap: 8,
  },
  concludedBannerText: {
    color: "#00d2b4",
    fontWeight: "700",
    fontSize: 16,
  },
  concludedBannerSub: {
    color: "#5D708A",
    fontSize: 13,
  },

  bottomSpacer: {
    height: 40,
  },
});
