import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import api from '../services/api';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [materiais, setMateriais] = useState([]);

  const buscarMateriais = async () => {
    try {
      const resposta = await api.get('/');
      setMateriais(resposta.data);
    } catch (erro) {
      Alert.alert('Erro', 'Nao foi possivel carregar o estoque.');
    }
  };

  useEffect(() => {
    buscarMateriais();
  }, []);

  const handleCadastrar = async () => {
    if (!nome.trim() || !quantidade.trim()) {
      Alert.alert('Atencao', 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    try {
      await api.post('/', {
        nome: nome.trim(),
        quantidade: Number(quantidade),
      });
    } catch (erro) {
      Alert.alert('Erro', 'Nao foi possivel cadastrar o material.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemNome}>{item.nome}</Text>
      <Text style={styles.itemQuantidade}>Qtd: {item.quantidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>

      <Text style={styles.label}>Nome do Material:</Text>
      <TextInput
        testID="input-nome"
        style={styles.input}
        placeholder="Ex: Caneta Azul"
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

      <TouchableOpacity testID="btn-cadastrar" style={styles.botao} onPress={handleCadastrar}>
        <Text style={styles.botaoTexto}>Cadastrar Material</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Estoque Atual</Text>
      <FlatList
        testID="lista-materials"
        data={materiais}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum material cadastrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
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
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  itemNome: { fontSize: 16, color: '#333' },
  itemQuantidade: { fontSize: 14, color: '#666' },
  vazio: { textAlign: 'center', color: '#999', marginTop: 20 },
});
