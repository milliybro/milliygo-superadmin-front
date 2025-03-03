import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  Radio,
  Card,
  notification,
} from 'antd'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddCreateIcon from '@/components/icons/add-icon'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createFacility,
  createProhibitionsFacility,
  createRoomFacility,
  getFacility,
  getIconsList,
  getPlacementFacilitiesCategory,
  getProhibition,
  getRFacility,
  getRoomFacilitiesCategory,
  updateFacility,
  updateProhibition,
  updateRFacility,
} from '../api'
import CloseIcon from '@/components/icons/close-icon'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'

const { Dragger } = Upload
const { Text } = Typography
const ServicesAction = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const editServiceId = searchParams.get('id')

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const typeId = searchParams.get('type') || '1'

  // const queryClient = useQueryClient()

  const { data: roomFacilitiesCategory } = useQuery({
    queryKey: ['room-facilities-category'],
    queryFn: async () => {
      const res = await getRoomFacilitiesCategory({})
      return res
    },
  })

  const { data: placementFacilitiesCategory } = useQuery({
    queryKey: ['placement-facilities-category'],
    queryFn: async () => {
      const res = await getPlacementFacilitiesCategory({})
      return res
    },
  })

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

  // const props: UploadProps = {
  //   name: 'file',
  //   multiple: false,
  //   maxCount: 1,
  //   accept: 'image/*',
  //   beforeUpload: file => {
  //     const isLessThan5MB = file.size / 1024 / 1024 < 5
  //     if (!isLessThan5MB) {
  //       console.error('Image must be smaller than 5MB!')
  //       return false
  //     }
  //     return true
  //   },
  // }

  const openNotification = (
    type: 'error' | 'success',
    messageKey: string,
    messageDesc: string,
  ) => {
    notification[type]({
      closeIcon: null,
      className: `w-[406px] border-t-[5px] ${
        type === 'error' ? 'border-danger' : 'border-primary'
      } rounded-[12px] [&_.ant-notification-notice-message]:mb-0`,
      icon:
        type === 'error' ? (
          <CloseIcon className="text-[24px] text-red-500" />
        ) : (
          <CheckmarkCircleIcon className="text-[24px] text-primary" />
        ),
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          {t(messageKey)}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-secondary text-base">
            {t(messageDesc)}
          </Typography.Text>
        </div>
      ),
    })
  }

  const typeOptions = [
    {
      label: t('common.facility-room'),
      value: 'room',
    },
    {
      label: t('common.hotel'),
      value: 'placement',
    },
    {
      label: t('common.prohibitions'),
      value: 'prohibitions',
    },
  ]

  const categoryOptions =
    type === 'room'
      ? roomFacilitiesCategory?.results
        ? roomFacilitiesCategory.results.map((category: any) => ({
            label: category?.name || 'No Name',
            value: category?.id,
            key: category?.key,
          }))
        : []
      : placementFacilitiesCategory?.results
        ? placementFacilitiesCategory.results.map((category: any) => ({
            label: category?.name || 'No Name',
            value: category?.id,
            key: category?.key,
          }))
        : []
  const handleType = (val: string) => {
    setType(val)
  }

  const { mutate: handleUserSave } = useMutation({
    mutationFn: (values: any) => {
      const formData = new FormData()

      console.log('ICON', values.icon)

      const formattedValues = {
        key: values.id,
        category: values.category,
        status: values.status,
        translations: {
          en: { name: values.name_en },
          'uz-latin': { name: values.name_oz },
          ru: { name: values.name_ru },
          'uz-cyrillic': { name: values.name_uz },
        },
      }

      formData.append('category', JSON.stringify(formattedValues?.category))
      formData.append('key', formattedValues?.key)
      formData.append('status', JSON.stringify(formattedValues?.status))
      formData.append(
        'translations',
        JSON.stringify(formattedValues.translations),
      )
      if (values.icon?.file && selectedIcon === null) {
        formData.append('icon', values.icon.file.originFileObj)
      }
      if (selectedIcon) {
        formData.append('icon_url', selectedIcon)
      }
      if (editServiceId) {
        return type === 'room'
          ? updateRFacility({
              id: editServiceId,
              queryParams: formData,
            })
          : type === 'prohibitions'
            ? updateProhibition({ id: editServiceId, queryParams: formData })
            : updateFacility({ id: editServiceId, queryParams: formData })
      }

      console.log(type, 'FORM')
      return type === 'room'
        ? createRoomFacility(formData)
        : type === 'prohibitions'
          ? createProhibitionsFacility(formData)
          : createFacility(formData)
    },
    onSuccess: () => {
      navigate('/services')
      form.resetFields()
      openNotification(
        'success',
        editServiceId
          ? 'fields.services.edit-success-notification'
          : 'fields.services.add-success-notification',
        '',
      )
      // queryClient.invalidateQueries(['room-facilities-data'])
      // queryClient.invalidateQueries(['placements-facilities-data'])
      // queryClient.invalidateQueries(['prohibitions-facilities-data'])
    },
    onError: (error: any) => {
      openNotification('error', 'fields.services.error-notification', '')
      console.log('error', error)
    },
  })

  const handlePreview = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewImage(reader.result as string)
    }
  }

  const { data: dataRoomFacility } = useQuery({
    queryKey: ['r-facility', editServiceId],
    queryFn: async () => {
      const res = await getRFacility({ id: editServiceId })
      return res
    },
    enabled: !!editServiceId,
  })

  const { data: dataFacility } = useQuery({
    queryKey: ['facility', editServiceId],
    queryFn: async () => {
      const res = await getFacility({ id: editServiceId })
      return res
    },
    enabled: !!editServiceId && typeId === '2',
  })

  const { data: dataProhibition } = useQuery({
    queryKey: ['prohibition', editServiceId],
    queryFn: async () => {
      const res = await getProhibition({ id: editServiceId })
      return res
    },
    enabled: !!editServiceId && typeId === '3',
  })

  useEffect(() => {
    if (dataRoomFacility && typeId === '1') {
      form.setFieldsValue({
        category: dataRoomFacility?.category,
        status: dataRoomFacility?.status,
        name_oz: dataRoomFacility?.translations?.['uz-latin']?.name,
        name_uz: dataRoomFacility?.translations?.['uz-cyrillic']?.name,
        name_en: dataRoomFacility?.translations?.en?.name,
        name_ru: dataRoomFacility?.translations?.ru?.name,
        icon: dataRoomFacility?.icon_url
          ? dataRoomFacility?.icon_url
          : dataRoomFacility?.icon,
      })
    }
    setPreviewImage(form.getFieldValue('icon'))
  }, [dataRoomFacility, form, typeId])

  useEffect(() => {
    if (typeId) {
      setType(
        typeId === '1' ? 'room' : typeId === '2' ? 'placement' : 'prohibitions',
      )
      form.setFieldsValue({
        type:
          typeId === '1'
            ? 'room'
            : typeId === '2'
              ? 'placement'
              : 'prohibitions',
      })
    }
  }, [typeId])

  useEffect(() => {
    if (dataFacility && typeId === '2') {
      form.setFieldsValue({
        category: dataFacility?.category,
        status: dataFacility?.status,
        name_oz: dataFacility?.translations?.['uz-latin']?.name,
        name_uz: dataFacility?.translations?.['uz-cyrillic']?.name,
        name_en: dataFacility?.translations?.en?.name,
        name_ru: dataFacility?.translations?.ru?.name,
        icon: dataFacility?.icon_url
          ? dataFacility?.icon_url
          : dataFacility?.icon,
      })
    }
    setPreviewImage(form.getFieldValue('icon'))
  }, [dataFacility, form, typeId])

  useEffect(() => {
    if (dataProhibition && typeId === '3') {
      form.setFieldsValue({
        category: dataProhibition?.category,
        status: dataProhibition?.status,
        name_oz: dataProhibition?.translations?.['uz-latin']?.name,
        name_uz: dataProhibition?.translations?.['uz-cyrillic']?.name,
        name_en: dataProhibition?.translations?.en?.name,
        name_ru: dataProhibition?.translations?.ru?.name,
        icon: dataProhibition?.icon_url
          ? dataProhibition?.icon_url
          : dataProhibition?.icon,
      })
    }
    setPreviewImage(form.getFieldValue('icon'))
  }, [dataProhibition, form, typeId])

  const { data: icons } = useQuery({
    queryKey: ['icon'],
    queryFn: async () => {
      const res = await getIconsList({ page_size: 150 })
      return res
    },
  })

  console.log(previewImage)

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold h-full">
        {editServiceId
          ? t('services-page.edit-services')
          : t('services-page.add-services')}
      </div>

      <Form
        form={form}
        name="access-role-action"
        layout="vertical"
        className="w-full"
        onFinish={handleUserSave}
      >
        <div className="grid grid-cols-2 gap-6 h-screen overflow-y-scroll">
          <div className="flex flex-col gap-6">
            <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
              <div className="flex flex-col mb-6 gap-6">
                <Form.Item
                  name="type"
                  label={t('common.type')}
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: t('common.rule'),
                    },
                  ]}
                >
                  <Select
                    placeholder={t('common.type')}
                    options={typeOptions}
                    onChange={handleType}
                  />
                </Form.Item>
                <Form.Item
                  name="category"
                  label={t('common.category')}
                  className="flex-1"
                  rules={[
                    {
                      required: type === 'prohibitions' ? false : true,
                      message: t('common.rule'),
                    },
                  ]}
                >
                  <Select
                    disabled={type === 'prohibitions'}
                    placeholder={t('common.category-select')}
                    options={categoryOptions || []}
                  />
                </Form.Item>
                <Form.Item
                  name="name_oz"
                  label={t('fields.name.name-uz')}
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: t('common.rule'),
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: t('common.rule'),
                    },
                  ]}
                >
                  <Input
                    size="large"
                    className="select-shadow"
                    placeholder={t('fields.name.placeholder')}
                  />
                </Form.Item>{' '}
                <Form.Item
                  name="name_uz"
                  label={t('fields.name.name-cry')}
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: t('common.rule'),
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: t('common.rule'),
                    },
                  ]}
                >
                  <Input
                    size="large"
                    className="select-shadow"
                    placeholder={t('fields.name.placeholder')}
                  />
                </Form.Item>
                <Form.Item
                  name="status"
                  label={t('fields.status.label')}
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: t('common.rule'),
                    },
                  ]}
                >
                  <Select options={statusOptions} />
                </Form.Item>{' '}
              </div>
            </div>

            <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
              <div className="flex items-center gap-6 mb-6">
                <Form.Item
                  name="icon"
                  label={t('fields.icon.add-icon')}
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: t('common.rule'),
                    },
                  ]}
                >
                  <Dragger
                    beforeUpload={file => {
                      handlePreview(file)
                      setSelectedIcon(null)
                      form.setFieldsValue({
                        icon: {
                          file: {
                            ...file,
                            uid: Date.now().toString(),
                            name: file.name,
                            status: 'done',
                            originFileObj: file,
                          },
                        },
                      })
                      return false
                    }}
                    fileList={
                      form.getFieldValue('icon')?.file
                        ? [form.getFieldValue('icon').file]
                        : []
                    }
                    onRemove={() => {
                      form.setFieldsValue({ icon: null })
                      setPreviewImage(null)
                    }}
                    onDrop={e => {
                      e.preventDefault()
                      const iconId = e.dataTransfer.getData('iconId')
                      const iconHTML = e.dataTransfer.getData('iconHTML')

                      if (iconId && iconHTML) {
                        setSelectedValue(iconId)
                        setSelectedIcon(iconId)
                        form.setFieldsValue({
                          icon: {
                            file: {
                              uid: Date.now().toString(),
                              name: `icon-${iconId}`,
                              status: 'done',
                            },
                          },
                        })
                        setPreviewImage(iconHTML)
                      }
                    }}
                  >
                    <div onDragOver={(e: any) => e.preventDefault()}>
                      <p className="ant-upload-drag-icon flex justify-center">
                        <AddCreateIcon />
                      </p>
                      <p className="ant-upload-text text-[#232E40] text-base font-medium">
                        <a
                          style={{ textDecoration: 'underline' }}
                          className="text-[#3276FF] me-1"
                        >
                          {t('fields.icon.select')}
                        </a>
                        {t('fields.icon.drag-file')}
                      </p>
                      <p className="ant-upload-hint">
                        {t('fields.icon.max-size')}
                      </p>
                    </div>
                  </Dragger>
                  {previewImage && (
                    <div className="mt-2 flex justify-start">
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                  )}
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border p-6 overflow-y-auto  border-border rounded-[16px]">
            <Text className="text-base font-medium">
              {t('fields.icon.icons')}
            </Text>
            <div className="py-2">
              <Radio.Group onChange={onChange} value={selectedValue}>
                <div className="grid grid-cols-8 gap-4 p-2 overflow-y-auto overflow-x-hidden ">
                  {icons?.results.map((option: any) => (
                    <Card
                      key={option.id}
                      draggable
                      onDragStart={e => {
                        e.dataTransfer.setData('iconId', option?.id)
                        e.dataTransfer.setData('iconHTML', option?.file)
                      }}
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
                        setSelectedIcon(option?.file_path)

                        form.setFieldsValue({
                          icon: {
                            file: {
                              uid: Date.now().toString(),
                              name: `icon-${option.id}`,
                              status: 'done',
                            },
                          },
                        })
                        setPreviewImage(option.file)
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
                        <img src={option.file} />
                      </div>
                    </Card>
                  ))}
                </div>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="flex justify-end text-end">
          <Button className="mt-4" type="primary" htmlType="submit">
            {editServiceId ? t('common.save') : t('services-page.add-user')}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ServicesAction
