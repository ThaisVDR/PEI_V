import MaskedView from "@react-native-masked-view/masked-view";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RadioSelect } from "../../../components/RadioSelect/RadioSelect";
import LogoQuestio from "../../../img/icon_questio.png";
import { styles } from "./style";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface RegisterPageProps {
  navigation: RegisterScreenNavigationProp;
}

export function RegisterPage({ navigation }: RegisterPageProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={LogoQuestio}
            style={styles.logo}
            resizeMode="contain"
          />

          <MaskedView
            style={styles.maskedContainer}
            maskElement={<Text style={styles.title}>Criar Conta</Text>}
          >
            <LinearGradient
              colors={["#00d2b4", "#007BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome Completo"
            iconName="user"
            placeholder="Digite seu nome completo"
          />
          <Input
            label="E-mail Institucional"
            iconName="mail"
            placeholder="Digite seu e-mail institucional"
          />
          <Input
            label="Curso"
            iconName="book"
            placeholder="Digite o nome do seu curso"
          />

          <RadioSelect
            options={["Estudante", "Professor", "Coordenação"]}
            selected="Estudante"
          />

          <Input
            label="Senha"
            iconName="lock"
            placeholder="Digite a sua nova senha"
            isPassword
          />

          <View style={{ marginTop: 10 }}>
            <Button title="Cadastrar" />
          </View>

          <TouchableOpacity
            style={styles.footerLinks}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.linkText}>
              Já tem uma conta?{" "}
              <Text style={styles.linkTextAccent}>Fazer Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
