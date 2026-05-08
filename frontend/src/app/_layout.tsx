import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/(Authenticator)" />
      <Stack.Screen name="screens/(Aluno)" />
      <Stack.Screen name="screens/(Professor)" />
    </Stack>
  );
}
