import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CardProduto from '../components/CardProduto';
import Botao from '../components/Botao';
import { useApp } from '../context/AppContext';
import { buscarProdutos } from '../services/api';
import { cores } from '../theme';
import { CATEGORIAS } from './NovoProduto';

export default function Catalogo({ route }) {
  const { adicionarAoCarrinho } = useApp();
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('Todas');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // GET: carrega os produtos
  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      const dados = await buscarProdutos();
      setProdutos(dados);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar produtos.');
    } finally {
      setCarregando(false);
    }
  };

  // recarrega ao abrir a tela e quando um produto novo for cadastrado
  useEffect(() => {
    carregar();
  }, [route && route.params && route.params.atualizar]);

  const filtrados =
    filtro === 'Todas' ? produtos : produtos.filter((p) => p.categoria === filtro);

  const adicionar = (produto) => {
    adicionarAoCarrinho(produto);
    Alert.alert('Carrinho', produto.nome + ' adicionado!');
  };

  return (
    <View style={styles.tela}>
      <Text style={styles.rotulo}>Filtrar por categoria</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={filtro} onValueChange={(v) => setFiltro(v)}>
          <Picker.Item label="Todas" value="Todas" />
          {CATEGORIAS.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color={cores.primaria} style={{ marginTop: 30 }} />
      ) : erro ? (
        <View>
          <Text style={styles.erro}>{erro}</Text>
          <Botao titulo="Tentar novamente" onPress={carregar} />
        </View>
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CardProduto produto={item} onAdicionar={adicionar} />}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto nesta categoria.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, padding: 16 },
  rotulo: { fontWeight: '600', color: cores.texto, marginBottom: 4 },
  pickerBox: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    marginBottom: 12,
  },
  erro: { color: cores.erro, textAlign: 'center', marginVertical: 10 },
  vazio: { textAlign: 'center', color: cores.textoSuave, marginTop: 30 },
});
