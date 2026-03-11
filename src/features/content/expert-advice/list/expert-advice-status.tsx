import { Switch } from 'antd'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { patchExpertAdvice } from '../../api'

import type { FC } from 'react'
import type { IExpertAdvice } from '@/features/content/types'

const ExpertAdviceStatus: FC<IExpertAdvice> = ({ slug, status }) => {
  const [checked, setChecked] = useState(status)

  const { mutate, isPending } = useMutation({
    mutationFn: (values: { status: boolean }) =>
      patchExpertAdvice(slug, values),
    onSuccess: () => {
      setChecked(prev => !prev)
    },
  })

  const handleChange = (checked: boolean) => {
    mutate({ status: checked })
  }

  return (
    <Switch loading={isPending} checked={checked} onChange={handleChange} />
  )
}

export default ExpertAdviceStatus
