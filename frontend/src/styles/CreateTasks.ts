import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1D",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    marginTop: 10,
  },
  textAreaContainer: {
    position: "relative",
  },
  textAreaInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 30,
  },
  charCounter: {
    color: "#5D708A",
    fontSize: 12,
    textAlign: "left",
    marginTop: -12,
    marginBottom: 20,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadLabel: {
    color: "#7a869a",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  uploadBox: {
    width: "100%",
    backgroundColor: "#0a121f",
    borderWidth: 1,
    borderColor: "#1a2433",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  uploadTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  uploadSubtitle: {
    color: "#475569",
    fontSize: 12,
  },
  filesList: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 8,
    padding: 12,
    gap: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1a2433",
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fileName: {
    color: "#94A3B8",
    fontSize: 13,
    flex: 1,
  },
});
