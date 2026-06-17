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
    paddingHorizontal: 25,
    justifyContent: "center",
  },

  header: {
    marginBottom: height * 0.05,
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    backgroundColor: "transparent",
  },

  form: {
    gap: 12,
  },

  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  linkText: {
    color: "#38bdf8",
    fontSize: 14,
  },

  divider: {
    color: "#64748b",
    marginHorizontal: 8,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#020617",
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
});
