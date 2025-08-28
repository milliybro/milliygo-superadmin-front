import { Switch } from 'antd'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { patchEvent } from '../../api'

import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const ExpertAdviceStatus: FC<IEvent> = ({ slug, status }) => {
  const [checked, setChecked] = useState(status)

  const { mutate, isPending } = useMutation({
    mutationFn: (values: { status: boolean }) => patchEvent(slug, values),
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
