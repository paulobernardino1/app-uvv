import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function Botao({ titulo, onPress, tipo = 'primario', desabilitado = false }) {
  return (
    <TouchableOpacity
      style={[styles.botao, styles[tipo], desabilitado && styles.desabilitado]}
      onPress={onPress}
      disabled={desabilitado}
      activeOpacity={0.8}>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}
