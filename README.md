# SysAlmoxarifado

## Sprint 1 — Cadastro e listagem



Aplicativo mobile de Almoxarifado desenvolvido com React Native e Expo. Permite cadastrar novos materiais e visualizar o estoque em tempo real, integrado à MockAPI.

Descrição do Projeto
Sistema para controle de insumos médicos do almoxarifado de enfermagem. A Sprint 1 cobre:

Cadastro de novos materiais (nome e quantidade)
Listagem dinâmica do estoque via FlatList
Integração REST com MockAPI (GET e POST)

## Sprint 3 — Dashboard e alertas

- Pesquisa em tempo real por nome do material
- Totalizador de itens visíveis após filtragem
- Indicador visual de estoque crítico (quantidade menor que 10)
- Tratamento de erros de conexão de rede com mensagens amigáveis

Tecnologias Utilizadas
React Native — interface mobile
Expo (~51) — ambiente de desenvolvimento
Axios — requisições HTTP
React Hooks — useState, useEffect
Jest + Testing Library — testes automatizados
## testIDs

**Sprint 1:** `input-nome`, `input-quantidade`, `btn-cadastrar`, `lista-materials`

**Sprint 2:** `input-retirada`, `btn-baixar`, `btn-excluir`

**Sprint 3:** `input-busca`, `total-itens`, `estoque-critico` (accessibilityLabel)

URL configurada neste projeto:

https://6a2b3f4eb687a7d5cbc50350.mockapi.io/materiais