import { useTranslation } from 'react-i18next'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store.ts'
import { useEffect, useState } from 'react'
import { SchedulerHeader } from '@/features/billing/views/scheduler/components/SchedulerHeader'
import { SchedulerTable } from '@/features/billing/views/scheduler/components/SchedulerTable'
import useModal from '@/features/billing/hooks/useModal.ts'
import { ScheduleFormModal } from '@/features/billing/views/scheduler/components/ScheduleFormModal'
import { ISchedulerResponse } from '@/features/billing/views/scheduler/types'

export function Scheduler() {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [selectedRowData, setSelectedRowData] = useState<ISchedulerResponse>()
  const { isOpen, closeModal, openModal } = useModal()
  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main') },
      { title: t('routes.billing') },
      { title: t('billing.schedule-page.cron-job')},
    ])
  }, [t])


  const editHandler = (rowData:ISchedulerResponse) => {
      setSelectedRowData(rowData)
      openModal()
  }

  const clearSelectedRowData = () => {
    setSelectedRowData(undefined)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 bg-white p-6">
      <ScheduleFormModal
        rowData={selectedRowData}
        isOpen={isOpen}
        closeModal={() => {
          closeModal()
          clearSelectedRowData()
        }}
      />
      <SchedulerHeader onAddClick={openModal} title={t('billing.schedule-page.cron-job')} />
      <SchedulerTable  setSelectedRowData={editHandler} />
    </div>
  )
}
