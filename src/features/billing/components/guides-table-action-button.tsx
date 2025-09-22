import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
// import { useLocation, useNavigate } from 'react-router'

import EyeIcon from '@/components/icons/eye'

import type { FC } from 'react'
import CheckIcon from '@/components/icons/check-icon'
import CancelIcon from '@/components/icons/cancel-icon'
import useGuideModalStore from '../store/hotel-modal-store'

interface IProps {
  id?: number
  type?: string
}

const GuidesTableActionButton: FC<IProps> = ({ id, type }) => {
  //   const navigate = useNavigate()
  const { t } = useTranslation()
  //   const { pathname } = useLocation()
  console.log(id)

  const { openModal } = useGuideModalStore(store => store)

  return (
    <div className="flex gap-2">
      {type === 'request' ? (
        <div className="flex items-center gap-[10px]">
          {' '}
          <Button
            className="inline-flex items-center bg-[#CCFBF1] px-[10px] py-1"
            type="text"
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
        onClick={() => openModal()}
      >
        <EyeIcon className="text-xl" />
        {t('common.more-details')}
      </Button>
    </div>
  )
}

export default GuidesTableActionButton
