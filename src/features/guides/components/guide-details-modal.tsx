import CloseIcon from '@/components/icons/close-icon'
import DownloadIcon from '@/components/icons/download-icon'
import UserIcon from '@/components/icons/user'
import { useQuery } from '@tanstack/react-query'
import { Button, Modal, ModalProps, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { getGuide } from '../api'
import { useSearchParams } from 'react-router'
import { useGuideContext } from '../hooks/use-guide-context'

interface GuideDetailsModalProps extends ModalProps {
  guideId: number | null
}

export default function GuideDetailsModal({
  guideId,
  ...props
}: GuideDetailsModalProps) {
  const { t } = useTranslation()
  const [query] = useSearchParams()
  const {
    updateGuide: { isPending, mutate },
  } = useGuideContext()

  const tab = query?.get('guide_status')

  const { data } = useQuery({
    queryKey: ['guide', guideId],
    queryFn: async () => {
      if (!guideId) return null
      const res = await getGuide(Number(guideId))
      return res
    },
    enabled: !!guideId,
  })

  return (
    <Modal {...props} footer={null}>
      <Button
        className="absolute right-[10px] top-[10px]"
        type="text"
        icon={<CloseIcon className="text-base" />}
        // onClick={closeHandler}
      />

      <div className="mb-6 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex size-[62px] shrink-0 items-center justify-center rounded-full border-[8px] border-[#EFF6FF] bg-[#DBEAFE]">
          <UserIcon className="text-2xl text-primary" />
        </div>
        <div className="mb-2 text-2xl font-bold text-primary-dark">
          {t('guides.info-guide')}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { label: t('hotel-guest.lfm'), value: data?.full_name },
          {
            label: t('hotel-guest.citizenship'),
            value: data?.citizenship_name,
          },
          { label: t('hotel-guest.nation'), value: data?.nationality_name },
          { label: t('hotel-guest.birth'), value: '' },
          { label: t('hotel-guest.gender'), value: '' },
          { label: t('hotel-guest.phone'), value: data?.phone },
        ].map((item, i) => (
          <div key={i} className="flex justify-between">
            <Typography.Text className="text-sm font-normal">
              {item.label}
            </Typography.Text>
            <Typography.Text className="text-sm font-medium">
              {item.value}
            </Typography.Text>
          </div>
        ))}

        <div className="mt-1 flex items-center justify-between">
          <Typography.Text className="text-sm font-normal">
            {t('guides.license')}
          </Typography.Text>
          <Button
            className="flex h-[28px] items-center bg-[#3276FF33] px-2 py-0"
            onClick={() => {
              if (!data?.certificate_file) return
              const link = document.createElement('a')
              link.href = data.certificate_file
              link.download =
                data.certificate_file.split('/').pop() || 'certificate.pdf'
              link.target = '_blank'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            <DownloadIcon className="" />
            <Typography.Text className="ml-1 text-sm font-medium text-[#2563EB]">
              {t('guides.download')}
            </Typography.Text>
          </Button>
        </div>
      </div>

      {tab === 'in_progress' && (
        <div className="mt-9 flex justify-center gap-4">
          <Button
            className="border border-[#991B1B] bg-[#FCA5A5] font-semibold text-[#991B1B]"
            onClick={props?.onCancel}
          >
            {t('guides.cancel')}
          </Button>

          <Button
            className="border border-[#4DD282] bg-[#4DD282] font-semibold text-white"
            loading={isPending}
            onClick={() =>
              mutate({ guide_status: 'accepted', id: Number(guideId) })
            }
          >
            {t('guides.apply')}
          </Button>
        </div>
      )}
    </Modal>
  )
}
