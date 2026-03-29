import MaskedView from "@react-native-masked-view/masked-view"; // Importe isso
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient"; // Importe isso
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import LogoQuestio from "../../../img/icon_questio.png";
import { styles } from "./style";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginPageProps {
  navigation: LoginScreenNavigationProp;
}

export function LoginPage({ navigation }: LoginPageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoQuestio} style={styles.logo} resizeMode="contain" />

        {/* TEXTO COM GRADIENT AQUI */}
        <MaskedView
          style={{ height: 45, width: "100%" }} // Altura para caber o texto
          maskElement={
            <Text style={[styles.title, { backgroundColor: "transparent" }]}>
              Questio
            </Text>
          }
        >
          <LinearGradient
            colors={["#00d2b4", "#007BFF"]} // Ciano e Azul
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>

      <View style={styles.form}>
        <Input label="Email" iconName="user" placeholder="Digite o seu Email" />
        <Input
          label="Senha"
          iconName="lock"
          placeholder="Digite sua Senha"
          isPassword
        />

        <Button title="Entrar" />

        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <Text style={styles.divider}>•</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.linkText}>Primeiro acesso</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
