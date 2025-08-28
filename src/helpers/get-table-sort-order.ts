export function getTableSortOrder(
  orderingFields: string[] | undefined,
  dataIndex: string,
) {
  if (!orderingFields) return undefined

  if (orderingFields.includes(dataIndex)) return 'ascend'
  if (orderingFields.includes(`-${dataIndex}`)) return 'descend'

  return undefined
}
