import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/(Authenticator)/Login/index" />
        <Stack.Screen name="screens/(Authenticator)/Register/index" />
        <Stack.Screen name="screens/(Authenticator)/ForgotPassWord/index" />
        <Stack.Screen name="screens/(Authenticator)/ResetPassWord/index" />
        <Stack.Screen name="screens/(Aluno)" />
        <Stack.Screen name="screens/(Professor)" />
        <Stack.Screen name="screens/(Coordenador)" />
      </Stack>
    </AuthProvider>
  );
}
