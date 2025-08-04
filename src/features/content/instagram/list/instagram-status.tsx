import { Switch } from 'antd'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { patchInstagramContent } from '../../api'

import type { FC } from 'react'
import type { IInstagramContent } from '@/features/content/types'

const InstagramStatus: FC<IInstagramContent> = ({ id, is_active }) => {
  const [checked, setChecked] = useState(is_active)

  const { mutate, isPending } = useMutation({
    mutationFn: (values: { is_active: boolean }) =>
      patchInstagramContent(id, values),
    onSuccess: () => {
      setChecked(prev => !prev)
    },
  })

  const handleChange = (checked: boolean) => {
    mutate({ is_active: checked })
  }

  return (
    <Switch loading={isPending} checked={checked} onChange={handleChange} />
  )
}

export default InstagramStatus
