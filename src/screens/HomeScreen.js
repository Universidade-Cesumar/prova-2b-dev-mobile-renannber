import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [materiais, setMateriais] = useState([]);

  const handleCadastrar = () => {
    if (!nome.trim() || !quantidade.trim()) {
      Alert.alert('Atencao', 'Preencha todos os campos antes de cadastrar.');
      return;
    }
  };

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
});
