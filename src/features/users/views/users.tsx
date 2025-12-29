import { Button } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import useUserModalStore from '../store/user-modal-store'

import AddIcon from '@/components/icons/add'
import { truthyObject } from '@/helpers/truthy-object'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getUsersList } from '../api'
import UserModal from '../components/user-modal'
import UsersFilters from '../containers/users-filters'
import UsersTable from '../containers/users-table'

const Users = () => {
  const { t } = useTranslation()

  const { openModal } = useUserModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const [searchParams] = useSearchParams()
  const queries = useParsedQuery()

  const search = searchParams.get('search') || ''
  const gender = searchParams.get('gender') || ''
  const type = searchParams.get('type') || ''
  const status = searchParams.get('status') || ''

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.users'), href: ROUTE_PATHS.USERS },
    ])
  }, [])

  const {
    data: UsersData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      'users-data',
      gender,
      type,
      searchParams,
      search,
      status,
      queries,
    ],
    queryFn: async () => {
      const res = await getUsersList(
        truthyObject({
          page_size: 10,
          client_or_employee: 'employee',
          search: search || undefined,
          gender: gender || undefined,
          type__name: type || undefined,
          is_active: status || undefined,
          type: type || undefined,
          ...queries,
        }),
      )
      return res
    },
    placeholderData: data => data,
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-semibold text-primary-dark">
            {t('common.users')}
          </div>
          {UsersData && (
            <div className="text-sm text-secondary">
              {t('services-page.all-users')}: {UsersData?.count}
            </div>
          )}
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
      <UsersFilters />
      <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white dark:bg-dark-bg">
        <UsersTable
          refetch={refetch}
          UsersData={UsersData}
          isLoading={isFetching}
        />
      </div>
    </div>
  )
}

export default Users
