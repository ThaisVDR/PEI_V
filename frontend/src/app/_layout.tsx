import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/(Authenticator)" />
        <Stack.Screen name="screens/(Aluno)" />
        <Stack.Screen name="screens/(Professor)" />
      </Stack>
    </AuthProvider>
  );
}
