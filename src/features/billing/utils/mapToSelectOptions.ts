type SelectOption = {
  label: string
  value: string | number
  [key: string]: any
}

export const mapToSelectOptions = <
  T extends Record<string, any>
>(
  data: T[] | undefined,
  labelKey: keyof T,
  valueKey: keyof T
): SelectOption[] => {
  if (!data) return []

  return data?.map(item => ({
    label: String(item[labelKey]),
    value: item[valueKey] as string | number,
    ...item,
  }))
}
