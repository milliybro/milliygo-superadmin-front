import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  UploadProps,
  Typography,
  Radio,
  Space,
  Card,
} from 'antd'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddCreateIcon from '@/components/icons/add-icon'
import MicrowaveIcon from '@/components/icons/microwave-icon'

const { Dragger } = Upload
const { Text } = Typography
const ServicesAction = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const editServiceId = searchParams.get('id')

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      {
        title: editServiceId
          ? t('services-page.edit-services')
          : t('common.facilities-and-services'),
      },
    ])
  }, [])

  const statusOptions = [
    { label: t('common.active'), value: true },
    { label: t('common.inactive'), value: false },
  ]

  const onChange = (e: any) => {
    setSelectedValue(e.target.value)
  }

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: 'image/*',
    beforeUpload: file => {
      const isLessThan5MB = file.size / 1024 / 1024 < 5
      if (!isLessThan5MB) {
        console.error('Image must be smaller than 5MB!')
        return false
      }
      return true
    },
  }

  const options = [
    {
      id: '1',
      name_uz: "Mikroto'lqinli pech",
      name_ru: 'Микроволновка',
      name_en: 'Microwave oven',
      status: true,
      icon: <MicrowaveIcon />,
    },
    {
      id: '2',
      name_uz: 'Konditsioner',
      name_ru: 'Кондиционер',
      name_en: 'Air conditioner',
      status: true,
      icon: <MicrowaveIcon />,
    },
  ]

  return (
    <div className="p-6 flex flex-col gap-6 flex-1 ">
      <div className="text-[24px] text-primary-dark font-semibold">
        {editServiceId
          ? t('services-page.edit-services')
          : t('services-page.add-services')}
      </div>

      <Form
        form={form}
        name="access-role-action"
        layout="vertical"
        className="w-full h-full"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
              <div className="flex flex-col mb-6 gap-6">
                <Form.Item
                  name="name_uz"
                  label={t('fields.name.name-uz')}
                  className="flex-1"
                >
                  <Input
                    size="large"
                    className="select-shadow"
                    placeholder={t('fields.name.placeholder')}
                  />
                </Form.Item>{' '}
                <Form.Item
                  name="name_ru"
                  label={t('fields.name.name-ru')}
                  className="flex-1"
                >
                  <Input
                    size="large"
                    className="select-shadow"
                    placeholder={t('fields.name.placeholder')}
                  />
                </Form.Item>{' '}
                <Form.Item
                  name="name_en"
                  label={t('fields.name.name-en')}
                  className="flex-1"
                >
                  <Input
                    size="large"
                    className="select-shadow"
                    placeholder={t('fields.name.placeholder')}
                  />
                </Form.Item>{' '}
                <Form.Item
                  name="status"
                  label={t('fields.status.label')}
                  className="flex-1"
                >
                  <Select options={statusOptions} />
                </Form.Item>{' '}
              </div>
            </div>

            <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
              <div className="flex items-center gap-6 mb-6">
                <Form.Item
                  name="roleName"
                  label={t('fields.icon.add-icon')}
                  className="flex-1"
                >
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon flex justify-center">
                      <AddCreateIcon />
                    </p>
                    <p className="ant-upload-text text-[#232E40] text-base font-medium">
                      <a
                        style={{ textDecoration: 'underline' }}
                        className="text-[#3276FF]"
                      >
                        {t('fields.icon.select')}
                      </a>
                      {t('fields.icon.drag-file')}
                    </p>
                    <p className="ant-upload-hint">
                      {t('fields.icon.max-size')}
                    </p>
                  </Dragger>
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
            <Text className="text-base font-medium">
              {t('fields.icon.icons')}
            </Text>
            <div className="grid grid-cols-4 gap-4 p-4">
              <Radio.Group onChange={onChange} value={selectedValue}>
                <Space size="middle" align="center">
                  {options.map(option => (
                    <Card
                      key={option.id}
                      className="relative cursor-pointer"
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow:
                          selectedValue === option.id
                            ? '0 0 8px 2px rgba(24, 144, 255, 0.5)'
                            : '0 0 2px 1px rgba(0, 0, 0, 0.1)',
                        border:
                          selectedValue === option.id
                            ? '2px solid #1890ff'
                            : '1px solid #d9d9d9',
                      }}
                      onClick={() => {
                        setSelectedValue(option.id)
                      }}
                    >
                      <div style={{ position: 'absolute', top: 10, left: 10 }}>
                        <Radio value={option.id} />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: 30 }}>{option.icon}</div>
                      </div>
                    </Card>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="flex justify-end text-end">
          <Button
            onClick={() => navigate('/services')}
            className="mt-4"
            type="primary"
          >
            {editServiceId ? t('common.save') : t('services-page.add-user')}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ServicesAction
