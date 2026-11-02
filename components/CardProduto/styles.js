import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  card: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: { flex: 1 },
  nome: { fontSize: 18, fontWeight: 'bold', color: cores.texto },
  categoria: { color: cores.primaria, fontWeight: '600', marginTop: 2 },
  descricao: { color: cores.textoSuave, fontSize: 13, marginTop: 2 },
  preco: { fontSize: 16, color: cores.secundaria, fontWeight: 'bold', marginTop: 6 },
  acao: { width: 110 },
});
