import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  botao: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 6,
  },
  primario: { backgroundColor: cores.primaria },
  destaque: { backgroundColor: cores.secundaria },
  perigo: { backgroundColor: cores.erro },
  desabilitado: { opacity: 0.5 },
  texto: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
