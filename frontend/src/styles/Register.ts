import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#020617",
  },

  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 20, // era 40
    backgroundColor: "#020617",
  },

  header: {
    marginBottom: height * 0.02, // era 0.04
    alignItems: "center",
  },

  logo: {
    width: height * 0.1, // era 0.15
    height: height * 0.1, // era 0.15
    marginBottom: 8, // era 12
  },

  maskedContainer: {
    height: 38, // era 45
    width: "100%",
  },

  title: {
    fontSize: height * 0.032, // era 0.04
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  form: {
    gap: 8, // era 12
  },

  footerLinks: {
    marginTop: 10, // era 16
    alignItems: "center",
  },

  linkText: {
    color: "#7C8DB5",
    fontSize: 13, // era 14
    textAlign: "center",
  },

  linkTextAccent: {
    color: "#16C7E7",
    fontWeight: "600",
  },
});
