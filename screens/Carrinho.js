import React from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import Botao from '../components/Botao';
import { useApp } from '../context/AppContext';
import { cores } from '../theme';

export default function Carrinho({ navigation }) {
  const { carrinho, total, removerDoCarrinho, limparCarrinho, usuarioAtual } = useApp();

  const finalizar = () => {
    if (!usuarioAtual) {
      Alert.alert('Atenção', 'Faça o cadastro antes de finalizar o pedido.');
      navigation.navigate('Cadastro');
      return;
    }
    Alert.alert('Pedido enviado', 'Obrigado, ' + usuarioAtual.nome + '! Total: R$ ' +
      total.toFixed(2).replace('.', ','));
    limparCarrinho();
  };

  return (
    <View style={styles.tela}>
      <FlatList
        data={carrinho}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => {
          const { nome, preco, quantidade } = item;
          return (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.detalhe}>
                  {quantidade} x R$ {preco.toFixed(2).replace('.', ',')}
                </Text>
              </View>
              <View style={{ width: 100 }}>
                <Botao titulo="Remover" tipo="perigo" onPress={() => removerDoCarrinho(item.id)} />
              </View>
            </View>
          );
        }}
      />
      <View style={styles.rodape}>
        <Text style={styles.total}>Total: R$ {total.toFixed(2).replace('.', ',')}</Text>
        <Botao titulo="Finalizar pedido" onPress={finalizar} desabilitado={carrinho.length === 0} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, padding: 16 },
  vazio: { textAlign: 'center', color: cores.textoSuave, marginTop: 40 },
  item: {
    backgroundColor: cores.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
  },
  nome: { fontSize: 17, fontWeight: 'bold', color: cores.texto },
  detalhe: { color: cores.textoSuave },
  rodape: { borderTopWidth: 1, borderTopColor: cores.borda, paddingTop: 10 },
  total: { fontSize: 20, fontWeight: 'bold', color: cores.primariaEscura, textAlign: 'right' },
});
