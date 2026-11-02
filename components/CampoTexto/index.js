import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

// Campo de formulario reutilizavel com rotulo e mensagem de erro
export default function CampoTexto({ rotulo, erro, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        style={[styles.input, erro ? styles.inputErro : null]}
        placeholderTextColor="#90A4AE"
        {...props}
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    </View>
  );
}
