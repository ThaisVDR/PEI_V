import { StyleSheet, Platform } from "react-native";

export const COLORS = {
  background: "#091628",
  active: "#0372D6",
  inactive: "#4A6281",
  text: "#4A6281",
};

export const styleScreen = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    height: 85,
    backgroundColor: "#091628",
    paddingBottom: 10,
    paddingTop: 5,
    shadowColor: "#091628",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
  },

  tabBarLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: -2,
  },
});
