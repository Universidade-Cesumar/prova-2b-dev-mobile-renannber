import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../services/api';
import { validarRetirada } from '../utils/validacoes';

/**
 * Tela principal do almoxarifado.
 * Gerencia cadastro, listagem, baixa, exclusao, pesquisa e alertas de estoque.
 */
export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [materiais, setMateriais] = useState([]);
  const [retiradas, setRetiradas] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState('');

  const materiaisFiltrados = materiais.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase().trim())
  );

  /** Busca todos os materiais cadastrados na MockAPI com tratamento de erro (GET). */
  const buscarMateriais = async () => {
    try {
      setCarregando(true);
      const resposta = await api.get('/');
      setMateriais(resposta.data);
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'N?o foi poss?vel conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  };

  /** Carrega o estoque ao abrir o aplicativo. */
  useEffect(() => {
    buscarMateriais();
  }, []);

  /** Valida os campos e cadastra um novo material na MockAPI (POST). */
  const handleCadastrar = async () => {
    if (!nome.trim() || !quantidade.trim()) {
      Alert.alert('Aten??o', 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    try {
      setCarregando(true);
      await api.post('/', {
        nome: nome.trim(),
        quantidade: Number(quantidade),
      });

      setNome('');
      setQuantidade('');
      await buscarMateriais();
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'N?o foi poss?vel conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  };

  /** Registra a quantidade informada para retirada de um item. */
  const handleRetiradaChange = (id, valor) => {
    setRetiradas((prev) => ({ ...prev, [id]: valor }));
  };

  /** Executa baixa de estoque via PUT apos validar a retirada. */
  const handleBaixar = async (item) => {
    const quantidadeRetirada = Number(retiradas[item.id]);

    if (!validarRetirada(item.quantidade, quantidadeRetirada)) {
      Alert.alert('Aten??o', 'Retirada inv?lida. Verifique a quantidade informada.');
      return;
    }

    try {
      setCarregando(true);
      await api.put(`/${item.id}`, {
        nome: item.nome,
        quantidade: item.quantidade - quantidadeRetirada,
      });

      setRetiradas((prev) => ({ ...prev, [item.id]: '' }));
      await buscarMateriais();
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'N?o foi poss?vel conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  };

  /** Remove um material do estoque via DELETE. */
  const handleExcluir = async (item) => {
    try {
      setCarregando(true);
      await api.delete(`/${item.id}`);
      await buscarMateriais();
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'N?o foi poss?vel conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  };

  /** Renderiza item com destaque visual quando estoque critico (qtd menor que 10). */
  const renderItem = ({ item }) => {
    const estoqueCritico = item.quantidade < 10;

    return (
      <View
        style={[styles.item, estoqueCritico && styles.itemCritico]}
        accessibilityLabel={estoqueCritico ? 'estoque-critico' : undefined}
      >
        <View style={styles.itemInfo}>
          <Text style={styles.itemNome}>{item.nome}</Text>
          <Text style={styles.itemQuantidade}>Qtd: {item.quantidade}</Text>
        </View>

        <View style={styles.itemAcoes}>
          <TextInput
            testID="input-retirada"
            style={styles.inputRetirada}
            placeholder="Qtd"
            keyboardType="numeric"
            value={retiradas[item.id] || ''}
            onChangeText={(valor) => handleRetiradaChange(item.id, valor)}
          />

          <TouchableOpacity
            testID="btn-baixar"
            style={styles.botaoAcao}
            onPress={() => handleBaixar(item)}
            disabled={carregando}
          >
            <Text style={styles.botaoTexto}>Baixar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="btn-excluir"
            style={styles.botaoAcao}
            onPress={() => handleExcluir(item)}
            disabled={carregando}
          >
            <Text style={styles.botaoTexto}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Material:</Text>
      <TextInput
        testID="input-nome"
        style={styles.input}
        placeholder="Ex: Seringa "
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        testID="input-quantidade"
        style={styles.input}
        placeholder="Ex: 50"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <TouchableOpacity
        testID="btn-cadastrar"
        style={styles.botao}
        onPress={handleCadastrar}
        disabled={carregando}
      >
        <Text style={styles.botaoTexto}>Cadastrar Material</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Estoque Atual</Text>

      <Text style={styles.label}>Pesquisar Material:</Text>
      <TextInput
        testID="input-busca"
        style={styles.input}
        placeholder="Buscar por nome..."
        value={busca}
        onChangeText={setBusca}
      />

      <Text testID="total-itens" style={styles.totalItens}>
        Total de itens: {materiaisFiltrados.length}
      </Text>

      {carregando && materiais.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          testID="lista-materials"
          data={materiaisFiltrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum material cadastrado.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, backgroundColor: '#fafafa' },
  botao: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 24 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subtitulo: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  totalItens: { fontSize: 14, color: '#555', marginBottom: 12, fontWeight: '500' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#f9f9f9', borderRadius: 6, marginBottom: 8 },
  itemCritico: { backgroundColor: '#ffe5e5', borderWidth: 1, borderColor: '#ff6b6b' },
  itemNome: { fontSize: 16, color: '#333', fontWeight: '500' },
  itemQuantidade: { fontSize: 14, color: '#666' },
  vazio: { textAlign: 'center', color: '#999', marginTop: 20, fontSize: 14 },
  loader: { marginTop: 30 },
  itemInfo: { flex: 1 },
  itemAcoes: { flexDirection: 'row', alignItems: 'center' },
  inputRetirada: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, fontSize: 14, width: 50, backgroundColor: '#fafafa', marginRight: 6 },
  botaoAcao: { backgroundColor: '#007AFF', padding: 8, borderRadius: 8, alignItems: 'center', marginLeft: 4 },
});
