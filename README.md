# SysAlmoxarifado

Aplicativo mobile de **Almoxarifado** desenvolvido com React Native e Expo. Permite cadastrar materiais, visualizar estoque, registrar baixas e excluir itens, integrado à [MockAPI](https://mockapi.io/).

## Sprint 1 — Cadastro e listagem

- Cadastro de novos materiais (nome e quantidade)
- Listagem dinâmica do estoque via `FlatList`
- Integração REST com MockAPI (GET e POST)

## Sprint 2 — Baixa e exclusão

- Retirada de estoque diretamente em cada item da lista
- Validação para impedir estoque negativo (`validarRetirada`)
- Baixa via **PUT** e exclusão via **DELETE**

## Sprint 3 — Dashboard e alertas

- Pesquisa em tempo real por nome do material
- Totalizador de itens visíveis após filtragem
- Indicador visual de estoque crítico (quantidade menor que 10)
- Tratamento de erros de conexão de rede com mensagens amigáveis

## Tecnologias

- React Native
- Expo (~51)
- Axios
- useState / useEffect
- Jest + Testing Library

## MockAPI

```
https://6a2b3f4eb687a7d5cbc50350.mockapi.io/materiais
```

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Lista materiais |
| POST | `/` | Cadastra material |
| PUT | `/:id` | Atualiza quantidade (baixa) |
| DELETE | `/:id` | Exclui material |

## Instalação e execução

```bash
npm install --legacy-peer-deps
npm start
npm test
```

## testIDs

**Sprint 1:** `input-nome`, `input-quantidade`, `btn-cadastrar`, `lista-materials`

**Sprint 2:** `input-retirada`, `btn-baixar`, `btn-excluir`

**Sprint 3:** `input-busca`, `total-itens`, `estoque-critico` (accessibilityLabel)
