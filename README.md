# SysAlmoxarifado — Sprint 1

Aplicativo mobile de **Almoxarifado** desenvolvido com React Native e Expo. Permite cadastrar novos materiais e visualizar o estoque em tempo real, integrado à [MockAPI](https://mockapi.io/).

## Descrição do Projeto

Sistema para controle de insumos médicos do almoxarifado de enfermagem. A Sprint 1 cobre:

- Cadastro de novos materiais (nome e quantidade)
- Listagem dinâmica do estoque via `FlatList`
- Integração REST com MockAPI (GET e POST)

## Tecnologias Utilizadas

- **React Native** — interface mobile
- **Expo** (~51) — ambiente de desenvolvimento
- **Axios** — requisições HTTP
- **React Hooks** — `useState`, `useEffect`
- **Jest + Testing Library** — testes automatizados

## Estrutura de Pastas

```
├── App.js                  # Entrada do app, renderiza HomeScreen
├── index.js                # Registro do componente raiz no Expo
├── src/
│   ├── screens/
│   │   └── HomeScreen.js   # Tela principal (formulário + lista)
│   ├── services/
│   │   └── api.js          # Instância Axios apontando para MockAPI
│   └── components/         # Componentes reutilizáveis (Sprints futuras)
├── __tests__/              # Testes automatizados por sprint
└── README.md
```

## Como Instalar Dependências

```bash
npm install --legacy-peer-deps
```

## Como Executar o Projeto

```bash
# Iniciar o servidor Expo
npm start

# Android
npm run android

# iOS (macOS)
npm run ios

# Web
npm run web
```

## Como Configurar a MockAPI

1. Acesse [mockapi.io](https://mockapi.io/) e crie uma conta gratuita.
2. Crie um novo projeto com o recurso **`materiais`**.
3. Adicione os campos:
   - `nome` — String
   - `quantidade` — Number
4. Copie a URL base do recurso e atualize em `src/services/api.js`:

```js
const api = axios.create({
  baseURL: 'https://SUA-URL.mockapi.io/materiais',
});
```

**URL configurada neste projeto:**

```
https://6a2b3f4eb687a7d5cbc50350.mockapi.io/materiais
```

### Endpoints utilizados

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/`  | Lista todos os materiais |
| POST   | `/`  | Cadastra um novo material |

**Corpo do POST (JSON):**

```json
{
  "nome": "Caneta Azul",
  "quantidade": 50
}
```

## Como Testar

### Testes automatizados

```bash
npm test
```

### Teste manual

1. Execute `npm start` e abra no emulador ou Expo Go.
2. Verifique se a lista carrega ao abrir (GET).
3. Preencha **Nome** e **Quantidade** e toque em **Cadastrar Material**.
4. Confirme que os campos são limpos e o item aparece na lista.
5. Valide na MockAPI que o registro foi criado.

## testIDs (Sprint 1)

| Elemento | testID |
|----------|--------|
| Input nome | `input-nome` |
| Input quantidade | `input-quantidade` |
| Botão cadastrar | `btn-cadastrar` |
| Lista de materiais | `lista-materials` |
