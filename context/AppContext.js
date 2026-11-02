import React, { createContext, useContext, useState } from 'react';

// Contexto global: usuarios cadastrados, usuario logado e carrinho
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [carrinho, setCarrinho] = useState([]);

  const cadastrarUsuario = (usuario) => {
    setUsuarios((anteriores) => [...anteriores, usuario]);
    setUsuarioAtual(usuario);
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((itens) => {
      const existente = itens.find((i) => i.id === produto.id);
      if (existente) {
        return itens.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...itens, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((itens) => itens.filter((i) => i.id !== id));
  };

  const limparCarrinho = () => setCarrinho([]);

  const total = carrinho.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

  return (
    <AppContext.Provider
      value={{
        usuarios,
        usuarioAtual,
        carrinho,
        total,
        cadastrarUsuario,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const contexto = useContext(AppContext);
  if (!contexto) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return contexto;
}
