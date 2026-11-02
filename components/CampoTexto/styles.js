import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  container: { marginBottom: 10 },
  rotulo: { color: cores.texto, fontWeight: '600', marginBottom: 4 },
  input: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: cores.texto,
  },
  inputErro: { borderColor: cores.erro },
  erro: { color: cores.erro, fontSize: 12, marginTop: 3 },
});
