import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  nome: string;
  email: string;
  curso: string;
  tipoUsuario: string;
  xpTotal: number;
  nivel: number;
  streakAtual: number;
};

type AuthContextData = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const raw = await AsyncStorage.getItem("user");
      if (raw) setUserState(JSON.parse(raw));
      setLoading(false);
    }
    loadUser();
  }, []);

  async function setUser(data: User | null) {
    setUserState(data);
    if (data) {
      await AsyncStorage.setItem("user", JSON.stringify(data));
    }
  }

  async function logout() {
    await AsyncStorage.multiRemove(["token", "tipoUsuario", "user"]);
    setUserState(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
