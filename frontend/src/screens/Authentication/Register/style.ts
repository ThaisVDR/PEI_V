import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050a12",
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
    width: "100%",
  },
  logo: {
    width: 165,
    height: 165,
    marginBottom: -15,
  },
  maskedContainer: {
    height: 45,
    width: "100%",
    marginBottom: 0,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -12,
  },
  form: {
    width: "100%",
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  linkText: {
    color: "#7a869a",
    fontSize: 14,
  },
  linkTextAccent: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
