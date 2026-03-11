import { ROUTE_PATHS } from '@/config/constants'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import GuidesTab from '../containers/guides-tabs'
import GuideProvider from '../context/guide-context'
import { Button, Dropdown } from 'antd'
import DownloadIcon from '@/components/icons/download-icon'
import ArrowDownIcon from '@/components/icons/arrow-down'
import { MenuProps } from 'antd/lib'

const Guides = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('guides.guides'), href: ROUTE_PATHS.GUIDES },
    ])
  }, [])

  const items: MenuProps['items'] = [
    { key: 'svg', label: 'SVG' },
    { key: 'pdf', label: 'PDF' },
    { key: 'xlsx', label: 'XLSX' },
  ]

  return (
    <GuideProvider>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold text-primary-dark">
              {t('guides.guides')}
            </div>
            <div className="text-[16px] text-secondary">
              {t('guides.guides-desc')}
            </div>
          </div>
          <div>
            <Dropdown
              menu={{
                items,
                // onClick: ({ key }) => onExport(key as ExportType),
              }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                className="w-[142px] justify-between bg-primary text-white"
                icon={<DownloadIcon className="-mb-1 text-[16px] text-white" />}
              >
                <span>{t('guides.export')}</span>
                <ArrowDownIcon />
              </Button>
            </Dropdown>
          </div>
        </div>

        <GuidesTab />
      </div>
    </GuideProvider>
  )
}

export default Guides
