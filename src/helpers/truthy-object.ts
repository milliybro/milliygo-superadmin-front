export function truthyObject(obj: object) {
  const cleanedQuery = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value),
  )
  return cleanedQuery
}
