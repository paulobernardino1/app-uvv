import React, { useState } from 'react';
import { ScrollView, Text, View, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import { salvarProduto } from '../services/api';
import { cores } from '../theme';

export const CATEGORIAS = ['Tropicais', 'Cítricas', 'Temperadas', 'Vermelhas'];

export default function NovoProduto({ navigation }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [descricao, setDescricao] = useState('');
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);

  const validar = () => {
    const novos = {};
    if (nome.trim().length < 2) novos.nome = 'Informe o nome da fruta.';
    const valor = parseFloat(preco.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) novos.preco = 'Informe um preço válido maior que zero.';
    setErros(novos);
    return Object.keys(novos).length === 0;
  };

  // POST: salva o produto
  const salvar = async () => {
    if (!validar()) return;
    try {
      setSalvando(true);
      await salvarProduto({
        nome: nome.trim(),
        preco: parseFloat(preco.replace(',', '.')),
        categoria,
        descricao: descricao.trim(),
      });
      Alert.alert('Sucesso', 'Produto cadastrado!');
      setNome('');
      setPreco('');
      setDescricao('');
      navigation.navigate('Catalogo', { atualizar: Date.now() });
    } catch (e) {
      Alert.alert('Erro', e.message || 'Não foi possível salvar.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <ScrollView style={styles.tela} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.titulo}>Cadastrar fruta</Text>
      <CampoTexto rotulo="Nome *" value={nome} erro={erros.nome}
        onChangeText={setNome} placeholder="Ex.: Abacaxi" />
      <CampoTexto rotulo="Preço por kg (R$) *" value={preco} erro={erros.preco}
        onChangeText={setPreco} placeholder="Ex.: 8,50" keyboardType="decimal-pad" />
      <Text style={styles.rotulo}>Categoria *</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={categoria} onValueChange={(v) => setCategoria(v)}>
          {CATEGORIAS.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>
      <CampoTexto rotulo="Descrição" value={descricao}
        onChangeText={setDescricao} placeholder="Opcional" />
      <Botao titulo={salvando ? 'Salvando...' : 'Salvar produto'} onPress={salvar}
        desabilitado={salvando} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  titulo: { fontSize: 22, fontWeight: 'bold', color: cores.primariaEscura, marginBottom: 14 },
  rotulo: { fontWeight: '600', color: cores.texto, marginBottom: 4 },
  pickerBox: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    marginBottom: 10,
  },
});
