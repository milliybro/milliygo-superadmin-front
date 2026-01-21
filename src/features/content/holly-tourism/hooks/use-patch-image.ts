import { useMutation } from '@tanstack/react-query'
import { patchHollyTourismImage } from '../api'

export function usePatchHollyTourismImage() {
  return useMutation({
    mutationFn: ({
      id,
      data,
      language,
    }: {
      id: number
      data: { is_main: boolean }
      language: string
    }) => patchHollyTourismImage(id, data, language),
  })
}
