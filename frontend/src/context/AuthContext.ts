import React, { createContext, useState, useContext, ReactNode } from "react";
import { API_URL } from "../services/api";

export interface UsuarioLogado {
  idUsuario: string;
  nome: string;
  email: string;
  token: string;
  tipoUsuario: "Aluno" | "Professor" | "Coordenacao";
}

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: UsuarioLogado | null;
  login(email: string, senha: string): Promise<UsuarioLogado>;
  logout(): Promise<void>;
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
      tipoUsuario: (data.tipoUsuario || decoded?.tipo || "Aluno") as
        | "Aluno"
        | "Professor"
        | "Coordenacao",
    };

    setUser(dadosUsuario);
    return dadosUsuario;
  }

  async function logout() {
    setUser(null);
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { signed: !!user, loading, user, login, logout } },
    children,
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
