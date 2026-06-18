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
 * Gerencia cadastro e listagem de materiais do estoque.
 */
export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [retiradas, setRetiradas] = useState({});

  /** Busca todos os materiais cadastrados na MockAPI (GET). */
  const buscarMateriais = async () => {
    try {
      setCarregando(true);
      const resposta = await api.get('/');
      setMateriais(resposta.data);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar o estoque.');
      console.error('Erro ao buscar materiais:', erro);
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
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
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
      Alert.alert('Erro', 'Não foi possível cadastrar o material.');
      console.error('Erro ao cadastrar material:', erro);
    } finally {
      setCarregando(false);
    }
  };

  const handleRetiradaChange = (id, valor) => {
    setRetiradas((prev) => ({ ...prev, [id]: valor }));
  };

  /** Renderiza cada item da lista de materiais. */
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemNome}>{item.nome}</Text>
      <Text style={styles.itemQuantidade}>Qtd: {item.quantidade}</Text>
      <TextInput
        testID="input-retirada"
        style={styles.inputRetirada}
        placeholder="Qtd"
        keyboardType="numeric"
        value={retiradas[item.id] || ''}
        onChangeText={(valor) => handleRetiradaChange(item.id, valor)}
      />
      <TouchableOpacity testID="btn-baixar" style={styles.botaoAcao}>
        <Text style={styles.botaoTexto}>Baixar</Text>
      </TouchableOpacity>
    </View>
  );

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

      {carregando && materiais.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          testID="lista-materials"
          data={materiais}
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
  container: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginBottom: 8,
  },
  itemNome: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  itemQuantidade: {
    fontSize: 14,
    color: '#666',
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 14,
  },
  loader: {
    marginTop: 30,
  },
});
