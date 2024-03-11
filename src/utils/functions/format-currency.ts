export function formatCurrency(value: number, currency = 'BRL') {
  return value.toLocaleString('pt-AO', { style: 'currency', currency })
}
