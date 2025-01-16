import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useUserModalStore from '../store/user-modal-store'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddIcon from '@/components/icons/add'
import UserModal from '../components/user-modal'
import HotelsTable from '../containers/users-table'
import UsersFilters from '../containers/users-filters'
import { useQuery } from '@tanstack/react-query'
import { getUsersList } from '../api'

const Users = () => {
  const { t } = useTranslation()

  const { openModal } = useUserModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [gender, setGender] = useState('')
  const [role, setRole] = useState('')
  const [isActive, setIsActive] = useState(null)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.users'), href: ROUTE_PATHS.USERS },
    ])
  }, [])

  const {
    data: UsersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users-data', currentPage, searchTerm, gender, role, isActive],
    queryFn: async () => {
      const res = await getUsersList({
        page_size: 10,
        client_or_employee: 'employee',
        page: currentPage,
        search: searchTerm,
        gender: gender || undefined,
        type__name: role || undefined,
        is_active: isActive || undefined,
      })
      return res
    },
    // keepPreviousData: true,
  })

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.users')}
        </div>
        <Button
          className="inline-flex items-center gap-2"
          type="primary"
          onClick={openModal}
        >
          <AddIcon /> {t('users-page.add-user')}
        </Button>
        <UserModal refetch={refetch} />
      </div>
      <UsersFilters
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        gender={gender}
        setGender={setGender}
        setRole={setRole}
        role={role}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <div className="bg-white border flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] flex items-center justify-center h-full">
        <HotelsTable
          refetch={refetch}
          UsersData={UsersData}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Users
