import React from 'react';
import { View, Text } from 'react-native';
import Botao from '../Botao';
import styles from './styles';

// Comunicacao direta: o pai passa o produto e a acao via props (desestruturacao)
export default function CardProduto({ produto, onAdicionar }) {
  const { nome, preco, categoria, descricao } = produto;
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.categoria}>{categoria}</Text>
        {descricao ? <Text style={styles.descricao}>{descricao}</Text> : null}
        <Text style={styles.preco}>R$ {Number(preco).toFixed(2).replace('.', ',')}</Text>
      </View>
      <View style={styles.acao}>
        <Botao titulo="Adicionar" tipo="destaque" onPress={() => onAdicionar(produto)} />
      </View>
    </View>
  );
}
