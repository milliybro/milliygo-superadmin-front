import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
// import { useLocation, useNavigate } from 'react-router'

import EyeIcon from '@/components/icons/eye'

import type { FC } from 'react'
import CheckIcon from '@/components/icons/check-icon'
import CancelIcon from '@/components/icons/cancel-icon'
import useGuideModalStore from '../store/hotel-modal-store'
import { useMutation } from '@tanstack/react-query'
import { updateGuide } from '../api'
import { useSearchParams } from 'react-router'

interface IProps {
  id: number
  type?: string
  refetch?: () => void
}

type GuideUpdatePayload = {
  guide_status: 'accepted' | 'rejected'
}

const GuidesTableActionButton: FC<IProps> = ({ id, type, refetch }) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { openGuideModal, isGuideModalOpen, closeGuideModal } =
    useGuideModalStore(store => store)

  const handleClick = () => {
    if (!isGuideModalOpen) {
      openGuideModal()

      const newParams = new URLSearchParams(searchParams)
      newParams.set('guideId', String(id))
      setSearchParams(newParams)
    } else {
      closeGuideModal()
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('guideId')
      setSearchParams(newParams)
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (values: GuideUpdatePayload) => updateGuide(id, values),
    onSuccess: () => {
      refetch?.()
    },
  })

  return (
    <div className="flex gap-2">
      {type === 'request' ? (
        <div className="flex items-center gap-[10px]">
          {' '}
          <Button
            className="inline-flex items-center bg-[#CCFBF1] px-[10px] py-1"
            type="text"
            loading={isPending}
            onClick={() => mutate({ guide_status: 'accepted' })}
          >
            <CheckIcon />
          </Button>
          <Button
            className="inline-flex items-center bg-[#FEE2E2] px-[10px] py-1"
            type="text"
          >
            <CancelIcon />
          </Button>
        </div>
      ) : (
        ''
      )}
      <Button
        className="inline-flex items-center gap-2 font-medium text-primary"
        type="text"
        onClick={handleClick}
      >
        <EyeIcon className="text-[20px]" />
        {t('common.more-details')}
      </Button>
    </div>
  )
}

export default GuidesTableActionButton
