import CancelIcon from '@/components/icons/cancel-icon'
import CheckIcon from '@/components/icons/check-icon'
import { Button } from 'antd'
import { useGuideContext } from '../hooks/use-guide-context'

interface GuidePendingActionButtonProps {
  guideId: number
  onReject: (id: number) => void
}

export default function GuidePendingActionButton({
  guideId,
  onReject,
}: GuidePendingActionButtonProps) {
  const {
    updateGuide: { isPending, mutate },
  } = useGuideContext()
  return (
    <div className="flex items-center gap-[10px]">
      {' '}
      <Button
        className="inline-flex items-center bg-[#CCFBF1] px-[10px] py-1"
        type="text"
        loading={isPending}
        onClick={() => mutate({ guide_status: 'accepted', id: guideId })}
      >
        <CheckIcon />
      </Button>
      <Button
        className="inline-flex items-center bg-[#FEE2E2] px-[10px] py-1"
        type="text"
        onClick={() => {
          onReject(guideId)
        }}
      >
        <CancelIcon />
      </Button>
    </div>
  )
}
