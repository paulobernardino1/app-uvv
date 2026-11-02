import React, { useState } from 'react';
import { ScrollView, Text, Alert, StyleSheet } from 'react-native';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import { useApp } from '../context/AppContext';
import { cores } from '../theme';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CadastroUsuario({ navigation }) {
  const { cadastrarUsuario, usuarios } = useApp();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmar: '',
  });
  const [erros, setErros] = useState({});

  const alterar = (campo, valor) => setForm({ ...form, [campo]: valor });

  const validar = () => {
    const { nome, email, telefone, senha, confirmar } = form;
    const novos = {};
    if (nome.trim().length < 3) novos.nome = 'Informe o nome completo (mín. 3 letras).';
    if (!REGEX_EMAIL.test(email.trim())) novos.email = 'E-mail inválido.';
    else if (usuarios.some((u) => u.email === email.trim().toLowerCase()))
      novos.email = 'Este e-mail já está cadastrado.';
    const digitos = telefone.replace(/\D/g, '');
    if (digitos.length < 10 || digitos.length > 11)
      novos.telefone = 'Telefone deve ter 10 ou 11 dígitos (com DDD).';
    if (senha.length < 6) novos.senha = 'A senha deve ter no mínimo 6 caracteres.';
    if (confirmar !== senha) novos.confirmar = 'As senhas não conferem.';
    setErros(novos);
    return Object.keys(novos).length === 0;
  };

  const salvar = () => {
    try {
      if (!validar()) return;
      const { nome, email, telefone } = form;
      cadastrarUsuario({ nome: nome.trim(), email: email.trim().toLowerCase(), telefone });
      Alert.alert('Sucesso', 'Cadastro realizado! Bem-vindo(a), ' + nome.trim() + '.');
      setForm({ nome: '', email: '', telefone: '', senha: '', confirmar: '' });
      navigation.navigate('Catalogo');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível concluir o cadastro.');
    }
  };

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Crie sua conta</Text>
      <CampoTexto rotulo="Nome completo *" value={form.nome} erro={erros.nome}
        onChangeText={(v) => alterar('nome', v)} placeholder="Ex.: Maria da Silva" />
      <CampoTexto rotulo="E-mail *" value={form.email} erro={erros.email}
        onChangeText={(v) => alterar('email', v)} placeholder="maria@email.com"
        keyboardType="email-address" autoCapitalize="none" />
      <CampoTexto rotulo="Telefone *" value={form.telefone} erro={erros.telefone}
        onChangeText={(v) => alterar('telefone', v)} placeholder="(27) 99999-9999"
        keyboardType="phone-pad" />
      <CampoTexto rotulo="Senha *" value={form.senha} erro={erros.senha}
        onChangeText={(v) => alterar('senha', v)} placeholder="Mínimo 6 caracteres"
        secureTextEntry />
      <CampoTexto rotulo="Confirmar senha *" value={form.confirmar} erro={erros.confirmar}
        onChangeText={(v) => alterar('confirmar', v)} placeholder="Repita a senha"
        secureTextEntry />
      <Botao titulo="Cadastrar" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: cores.primariaEscura, marginBottom: 14 },
});
