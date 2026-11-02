// Camada de acesso a dados (GET e POST).
// Para usar uma API REST real (ex.: mockapi.io), preencha API_URL com o endereco
// do recurso, por exemplo: 'https://SEU_ID.mockapi.io/produtos'
// Com API_URL vazio, os dados ficam em um vetor em memoria (simulando o BD).
const API_URL = '';

let bancoLocal = [
  { id: '1', nome: 'Banana Prata', preco: 6.5, categoria: 'Tropicais', descricao: 'Preço por kg' },
  { id: '2', nome: 'Maçã Fuji', preco: 9.9, categoria: 'Temperadas', descricao: 'Preço por kg' },
  { id: '3', nome: 'Laranja Pera', preco: 4.5, categoria: 'Cítricas', descricao: 'Preço por kg' },
  { id: '4', nome: 'Limão Tahiti', preco: 5.0, categoria: 'Cítricas', descricao: 'Preço por kg' },
  { id: '5', nome: 'Mamão Formosa', preco: 7.2, categoria: 'Tropicais', descricao: 'Preço por kg' },
  { id: '6', nome: 'Uva Itália', preco: 14.9, categoria: 'Temperadas', descricao: 'Preço por kg' },
];

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: le a lista de produtos
export async function buscarProdutos() {
  if (API_URL) {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) {
      throw new Error('Falha ao carregar produtos (' + resposta.status + ')');
    }
    return await resposta.json();
  }
  await esperar(400);
  return [...bancoLocal];
}

// POST: salva um novo produto
export async function salvarProduto(produto) {
  if (API_URL) {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto),
    });
    if (!resposta.ok) {
      throw new Error('Falha ao salvar produto (' + resposta.status + ')');
    }
    return await resposta.json();
  }
  await esperar(400);
  const novo = { ...produto, id: String(Date.now()) };
  bancoLocal = [...bancoLocal, novo];
  return novo;
}
