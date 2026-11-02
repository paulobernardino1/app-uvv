import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AppProvider, useApp } from './context/AppContext';
import CadastroUsuario from './screens/CadastroUsuario';
import Catalogo from './screens/Catalogo';
import NovoProduto from './screens/NovoProduto';
import Carrinho from './screens/Carrinho';
import { cores } from './theme';

const Drawer = createDrawerNavigator();

// Menu lateral customizado
function MenuCustomizado(props) {
  const { usuarioAtual, carrinho } = useApp();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.cabecalho}>
        <Text style={styles.logo}>🍎 FrutaFácil</Text>
        <Text style={styles.saudacao}>
          {usuarioAtual ? 'Olá, ' + usuarioAtual.nome : 'Visitante'}
        </Text>
        <Text style={styles.itens}>Itens no carrinho: {carrinho.length}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// Tratamento de erros para evitar que o app caia
class ErroBoundary extends React.Component {
  state = { erro: false };
  static getDerivedStateFromError() {
    return { erro: true };
  }
  render() {
    if (this.state.erro) {
      return (
        <View style={styles.erroTela}>
          <Text style={styles.erroTexto}>Ops! Algo deu errado. Reinicie o aplicativo.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErroBoundary>
      <AppProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Cadastro"
            drawerContent={(props) => <MenuCustomizado {...props} />}
            screenOptions={{
              headerStyle: { backgroundColor: cores.primaria },
              headerTintColor: '#FFF',
              drawerActiveTintColor: cores.primariaEscura,
              drawerActiveBackgroundColor: cores.borda,
            }}>
            <Drawer.Screen name="Cadastro" component={CadastroUsuario}
              options={{ title: 'Cadastro de Usuário' }} />
            <Drawer.Screen name="Catalogo" component={Catalogo}
              options={{ title: 'Catálogo de Frutas' }} />
            <Drawer.Screen name="NovoProduto" component={NovoProduto}
              options={{ title: 'Cadastrar Fruta' }} />
            <Drawer.Screen name="Carrinho" component={Carrinho}
              options={{ title: 'Meu Carrinho' }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AppProvider>
    </ErroBoundary>
  );
}

const styles = StyleSheet.create({
  cabecalho: { backgroundColor: cores.primaria, padding: 20, marginTop: -4, marginBottom: 8 },
  logo: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  saudacao: { color: '#FFF', marginTop: 6, fontSize: 16 },
  itens: { color: '#C8E6C9', marginTop: 2 },
  erroTela: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  erroTexto: { color: cores.erro, fontSize: 16, textAlign: 'center' },
});
