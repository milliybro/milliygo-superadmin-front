import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Form, Input, Switch, Tree, Button, TreeProps } from 'antd'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import CloseIcon from '@/components/icons/close-icon'
import AddCircleIcon from '@/components/icons/add-circle'

const AccessRoleAction = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const statusField = Form.useWatch('roleStatus', form)

  const [selectedKeys, setSelectedKeys] = useState<any | object>([])

  const [searchParams] = useSearchParams()

  const editRoleId = searchParams.get('id')

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.access-role'), href: ROUTE_PATHS.ACCESS_ROLE },
      {
        title: editRoleId
          ? t('access-role-page.edit-role')
          : t('access-role-page.create-role'),
      },
    ])
  }, [])

  const treeData = [
    {
      title: t('common.users'),
      key: 'users',
      children: [
        { title: 'Название функции 1', key: 'func1' },
        { title: 'Название функции 2', key: 'func2' },
        { title: 'Название функции 3', key: 'func3' },
      ],
    },
    {
      title: t('common.hotels'),
      key: 'hotels',
      children: [
        { title: 'Название функции 4', key: 'func4' },
        { title: 'Название функции 5', key: 'func5' },
      ],
    },
    {
      title: t('common.clients'),
      key: 'clients',
      children: [{ title: 'Название функции 6', key: 'func6' }],
    },
    {
      title: t('common.access-role'),
      key: 'accessRole',
      children: [{ title: 'Название функции 7', key: 'func7' }],
    },
    {
      title: t('common.complaints'),
      key: 'complaints',
      children: [{ title: 'Название функции 8', key: 'func8' }],
    },
  ]

  const handleTreeSelect: TreeProps['onCheck'] = checkedKeys => {
    setSelectedKeys(checkedKeys)
  }

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        {editRoleId
          ? t('access-role-page.edit-role')
          : t('access-role-page.create-role')}
      </div>

      <Form
        form={form}
        name="access-role-action"
        layout="vertical"
        className="w-full h-full"
      >
        <div className="grid grid-cols-2 gap-6 h-full">
          <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
            <div className="flex items-center gap-6 mb-6">
              <Form.Item
                name="roleName"
                label={t('fields.role-name.label')}
                className="flex-1"
              >
                <Input
                  size="large"
                  className="select-shadow"
                  placeholder={t('fields.role-name.placeholder')}
                />
              </Form.Item>
              <div className="flex flex-col">
                <div className="text-primary-dark mb-2 text-[14px]">
                  {t('fields.role-status.label')}
                </div>
                <div className="flex items-center gap-2">
                  <Form.Item name="roleStatus" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <span className="text-[14px] text-secondary">
                    {statusField ? t('common.active') : t('common.inactive')}
                  </span>
                </div>
              </div>
            </div>
            <Form.Item
              name="functionality"
              label={t('fields.functionality.label')}
            >
              <Tree
                switcherIcon={<AddCircleIcon className="!text-[24px]" />}
                checkable
                className="[&_.ant-tree-treenode]:!w-full select-none [&_.ant-tree-treenode]:!m-0 [&_.ant-tree-indent]:!hidden border [&_.ant-tree-switcher]:!aspect-square [&_.ant-tree-switcher]:!size-[28.5px] [&_.ant-tree-switcher]:!justify-center [&_.ant-tree-switcher]:!items-center [&_.ant-tree-switcher]:!flex [&_.ant-tree-checkbox]:!order-1 [&_.ant-tree-node-content-wrapper]:!flex-1 [&_.ant-tree-list-holder-inner]:!divide-y [&_.ant-tree-treenode]:!p-3"
                treeData={treeData}
                onCheck={handleTreeSelect}
                selectable={false}
                checkedKeys={selectedKeys}
              />
            </Form.Item>
          </div>

          <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
            <div className="flex flex-wrap gap-4">
              {selectedKeys.map((key: string) => (
                <div
                  key={key}
                  className="pl-3 flex items-center text-[14px] rounded-[5px] text-primary-dark bg-[#F4F5F7]"
                  onClick={() => {
                    setSelectedKeys(
                      selectedKeys.filter((item: string) => item !== key),
                    )
                  }}
                >
                  {key}
                  <Button
                    size="small"
                    type="text"
                    className="aspect-square"
                    icon={<CloseIcon className="text-[16px] text-[#707D9F]" />}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default AccessRoleAction
