/**
 * Valida se a quantidade de retirada e permitida sem gerar estoque negativo.
 * @param {number} estoqueAtual - Quantidade disponivel no estoque
 * @param {number} quantidadeRetirada - Quantidade que sera retirada
 * @returns {boolean} true se a retirada for valida, false caso contrario
 */
export function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}
