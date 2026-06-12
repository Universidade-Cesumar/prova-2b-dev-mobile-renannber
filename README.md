# SysAlmoxarifado â€” Sprint 1

Aplicativo mobile de **Almoxarifado** desenvolvido com React Native e Expo. Permite cadastrar novos materiais e visualizar o estoque em tempo real, integrado a MockAPI.

## Descricao do Projeto

Sistema para controle de insumos medicos do almoxarifado de enfermagem. A Sprint 1 cobre cadastro de materiais, listagem com FlatList e integracao REST (GET e POST).

## Tecnologias Utilizadas

- React Native
- Expo (~51)
- Axios
- useState / useEffect
- Jest + Testing Library

## Estrutura de Pastas

```
App.js
src/screens/HomeScreen.js
src/services/api.js
src/components/
```

## Como Instalar

```bash
npm install --legacy-peer-deps
```

## Como Executar

```bash
npm start
npm run android
npm run ios
```

## Configurar MockAPI

URL: `https://6a2b3f4eb687a7d5cbc50350.mockapi.io/materiais`

Campos: `nome` (String), `quantidade` (Number)

## Como Testar

```bash
npm test
```
