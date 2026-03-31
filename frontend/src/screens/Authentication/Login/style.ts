import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040B17",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 165,
    height: 165,
    marginBottom: -10,
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -15,
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
    color: "#007BFF",
    fontSize: 15,
  },
  divider: {
    color: "#555",
    marginHorizontal: 10,
  },
});
