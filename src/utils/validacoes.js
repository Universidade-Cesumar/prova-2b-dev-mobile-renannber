export function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}
