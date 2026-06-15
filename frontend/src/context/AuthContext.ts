import React, { createContext, useState, useContext, ReactNode } from "react";
import { API_URL } from "../services/api";
import api from "../services/api";

export interface UsuarioLogado {
  idUsuario: string;
  nome: string;
  email: string;
  token: string;
  id?: string;
  tipoUsuario: "Aluno" | "Professor" | "Coordenacao";
  xpTotal?: number;
  nivel?: number;
  streak?: number;
  maiorStreak?: number; // ✅ Corrigido para propriedade opcional do tipo number
  checkinHoje?: boolean; // ✅ Transformado em opcional para não quebrar o login inicial
  posicao?: string | number;
  insignias?: number;
}

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: UsuarioLogado | null;
  login(email: string, senha: string): Promise<UsuarioLogado>;
  logout(): Promise<void>;
  atualizarXpLocal(pontosGanhos: number): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function extrairDadosDoToken(token: string) {
  try {
    const partes = token.split(".");
    if (partes.length !== 3) return null;

    const base64Url = partes[1].replace(/-/g, "+").replace(/_/g, "/");
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let output = "";
    let buffer = 0;
    let bits = 0;

    for (let i = 0; i < base64Url.length; i++) {
      const char = base64Url.charAt(i);
      if (char === "=") break;
      const valor = caracteres.indexOf(char);
      if (valor === -1) continue;
      buffer = (buffer << 6) | valor;
      bits += 6;
      if (bits >= 8) {
        bits -= 8;
        output += String.fromCharCode((buffer >> bits) & 0xff);
      }
    }

    const jsonStr = decodeURIComponent(
      output
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erro ao ler token:", error);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioLogado | null>(null);
  const [loading, setLoading] = useState(false);

  const atualizarXpLocal = (pontosGanhos: number) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const xpAtual = Number(prevUser.xpTotal) || 0;
      const novoXp = xpAtual + Number(pontosGanhos);
      const novoNivel = Math.floor(novoXp / 100) + 1;

      // 🔥 LOGICA DO STREAK COMPLETA E SEM ERROS DE TIPAGEM
      const jaFezCheckinHoje = prevUser.checkinHoje === true;
      const streakAtual = Number(prevUser.streak) || 0;

      const novoStreak = jaFezCheckinHoje ? streakAtual : streakAtual + 1;
      const maiorStreakAtual = Number(prevUser.maiorStreak) || 0;
      const novoMaiorStreak =
        novoStreak > maiorStreakAtual ? novoStreak : maiorStreakAtual;

      return {
        ...prevUser,
        xpTotal: novoXp,
        nivel: novoNivel,
        streak: novoStreak,
        maiorStreak: novoMaiorStreak,
        checkinHoje: true,
      };
    });
  };

  async function login(email: string, senha: string): Promise<UsuarioLogado> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.mensagem || data?.message || "Erro ao fazer login");
    }

    const decoded = extrairDadosDoToken(data.token);

    const dadosUsuario: UsuarioLogado = {
      idUsuario:
        data.idUsuario ||
        decoded?.idUsuario ||
        "2b555958-0479-4a94-9a86-0e316759841f",
      nome: data.nome || decoded?.nome || "Usuário",
      email: email,
      token: data.token,
      id: data.id || decoded?.id,
      tipoUsuario: (data.tipoUsuario || decoded?.tipo || "Aluno") as
        | "Aluno"
        | "Professor"
        | "Coordenacao",

      xpTotal:
        data.xpTotal !== undefined ? data.xpTotal : (decoded?.xpTotal ?? 0),
      nivel: data.nivel !== undefined ? data.nivel : (decoded?.nivel ?? 1),
      streak: data.streak ?? decoded?.streak ?? 0,
      maiorStreak: data.maiorStreak ?? decoded?.maiorStreak ?? 0, // ✅ Mapeia maior streak vindo da API
      checkinHoje: data.checkinHoje ?? decoded?.checkinHoje ?? false, // ✅ Mapeia status do banco
      posicao: data.posicao ?? decoded?.posicao ?? "—",
      insignias: data.insignias ?? decoded?.insignias ?? 0,
    };

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setUser(dadosUsuario);
    return dadosUsuario;
  }

  async function logout() {
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  }

  return React.createElement(
    AuthContext.Provider,
    {
      value: { signed: !!user, loading, user, login, logout, atualizarXpLocal },
    },
    children,
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
