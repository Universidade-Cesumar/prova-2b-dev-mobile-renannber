# SysAlmoxarifado

Aplicativo mobile de Almoxarifado desenvolvido com **React Native** e **Expo**. Permite cadastrar materiais, visualizar estoque, registrar baixas e excluir itens, integrado à **MockAPI**.

## Funcionalidades

### Sprint 1 — Cadastro e Listagem
- Cadastro de novos materiais (nome e quantidade)
- Listagem dinâmica do estoque via `FlatList`
- Integração REST com MockAPI (`GET` e `POST`)

### Sprint 2 — Baixa e Exclusão
- Retirada de estoque diretamente em cada item da lista
- Validação para impedir estoque negativo (`validarRetirada`)
- Baixa via `PUT` e exclusão via `DELETE`

### Sprint 3 — Dashboard e Alertas
- Pesquisa em tempo real por nome do material
- Totalizador de itens visíveis após filtragem
- Indicador visual de estoque crítico (quantidade menor que 10)
- Tratamento de erros de conexão de rede com mensagens amigáveis

## Tecnologias

- React Native
- Expo (~51)
- Axios
- React Hooks (`useState` / `useEffect`)
- Jest + Testing Library

## API — MockAPI

**Base URL:** `https://6a2b3f4eb687a7d5cbc50350.mockapi.io/materiais`

| Método | Rota  | Descrição                    |
|--------|-------|-------------------------------|
| GET    | /     | Lista materiais               |
| POST   | /     | Cadastra material              |
| PUT    | /:id  | Atualiza quantidade (baixa)    |
| DELETE | /:id  | Exclui material                |

## Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- App **Expo Go** instalado no celular (disponível na Play Store / App Store) ou um emulador Android/iOS configurado

### Passo a passo

1. Clone o repositório e acesse a pasta do projeto:
   ```bash
   git clone <https://github.com/Universidade-Cesumar/prova-2b-dev-mobile-renannber>
   cd SysAlmoxarifado
   ```

2. Instale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Inicie o servidor de desenvolvimento do Expo:
   ```bash
   npm start
   ```
   ou
   ```bash
   npx expo start
   ```

4. Abra o aplicativo:
   - **No celular:** escaneie o QR Code exibido no terminal/navegador usando o app **Expo Go**
   - **No emulador Android:** pressione `a` no terminal após o `npm start`
   - **No simulador iOS:** pressione `i` no terminal após o `npm start`

5. Para executar os testes automatizados:
   ```bash
   npm test
   ```

## Capturas de Tela
## Tela inicial 
<img width="1907" height="952" alt="image" src="https://github.com/user-attachments/assets/bc3ad0e0-e25b-4c2a-ab58-bb9b59fa4c7b" />

## Tela com itens cadastrados 
<img width="1917" height="977" alt="image" src="https://github.com/user-attachments/assets/02549ccd-eba6-404b-8d28-b6802af8c2e0" />

## Tela com filtro 
<img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/c3417d94-b7e4-4693-b219-4793f8b6605e" />

## Tela com de alerta de estoque baixo
<img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/ad23d7a9-6fb4-4006-9e11-3428fe17b8b8" />



## testIDs

Identificadores utilizados nos testes automatizados (Jest + Testing Library).

**Sprint 1**
- `input-nome`
- `input-quantidade`
- `btn-cadastrar`
- `lista-materials`

**Sprint 2**
- `input-retirada`
- `btn-baixar`
- `btn-excluir`

**Sprint 3**
- `input-busca`
- `total-itens`
- `estoque-critico` (accessibilityLabel)
