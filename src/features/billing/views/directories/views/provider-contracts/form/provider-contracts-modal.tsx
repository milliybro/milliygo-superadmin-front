import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Button, DatePicker, Flex, Typography, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import MoneyIcon from '@/components/icons/money'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import useProviderContractsModalStore from '../../../store/provider-contracts-store'
import { createProviderContarcts, getProviderContarcts, updateProviderContarcts, } from '../../../api/getProviderContracts'
import { getPaymentProvidersList } from '../../../api/getPaymentProviders'
import { getGuides } from '@/features/guides/api'
import { getApartmentsList } from '@/features/landlords/api'
import { getAllPlacements } from '@/features/placements/api'
import { getOrganizationInfo, getOrganizationTypes } from '@/features/service-providers/api'
import useDebounce from '@/hooks/use-debounce'
import useNotify from '@/hooks/useNotify'
import { mapToSelectOptions } from '@/features/billing/utils/mapToSelectOptions'
import { IProviderContracts } from '../../../types'
import { BillingPath } from '../../../paths'

type FormValues = Omit<IProviderContracts, 'id'>
const ProviderContractModal = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { isModalOpen, closeModal, id: isEdit, clearId } = useProviderContractsModalStore(state => state)

  const { openNotify, notificationPlace, notify } = useNotify()

  const [form] = Form.useForm<FormValues>()
  const organizationType = Form.useWatch('organizationType', form)
  const organisationId = Form.useWatch('organisationId', form)
  const [placementSearch, setPlacementSearch] = useState<string>('')
  const debouncedPlacementSearch = useDebounce(placementSearch, 500)
  const [organizationSearch, setOrganizationSearch] = useState<string>('')
  const debounceOrganizationdSearch = useDebounce(organizationSearch, 500)

  const { data } = useQuery<any>({
    queryKey: ['provider-contract', isEdit],
    queryFn: () => getProviderContarcts({ id: isEdit }),
    enabled: !!isEdit,
    staleTime: 1000,
  })

  const { data: paymentProviders } = useQuery({
    queryKey: ['payment-providers'],
    queryFn: async () => {
      const res = await getPaymentProvidersList({
        size: 150,
        page: 0,
      })
      return res
    },
    enabled: isModalOpen,
  })


  const { data: organisationsTypes } = useQuery({
    queryKey: ['organisationsTypes', debounceOrganizationdSearch],
    queryFn: async () => {
      const res = await getOrganizationTypes({
        page_size: 30,
        page: 1,
     
      })
      return res
    },
     enabled: isModalOpen,
  })


  const { data: organisations, refetch: OrganisationsRefetch } = useQuery({
    queryKey: ['organisations', debounceOrganizationdSearch],
    queryFn: async () => {
      const res = await getOrganizationInfo({
        page_size: 30,
        page: 1,
        organization_type: organizationType.toLowerCase(),
         ...(debounceOrganizationdSearch && { search: debounceOrganizationdSearch })
      })
      return res
    },
   
  })
  
  const { data: placements } = useQuery({
    queryKey: ['placements', debouncedPlacementSearch],
    queryFn: async () => {
      const res = await getAllPlacements({
        page_size: 30,
        page: 1,
        ...(debouncedPlacementSearch && { search: debouncedPlacementSearch })
      })
      return res
    },
    enabled: isModalOpen,
  })

  const { data: apartments } = useQuery({
    queryKey: ['apartment'],
    queryFn: async () => {
      const res = await getApartmentsList({
        page_size: 30,
        page: 1,
      })
      return res
    },
    enabled: isModalOpen,
  })

  const { data: guides } = useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const res = await getGuides({
        page_size: 150,
        page: 1,
        guide_status: 'accepted',
      })
      return res
    },
    enabled: isModalOpen,
  })


  const openNotification = () => {
    openNotify({ edit: isEdit })
  }

  const handleUserSave = useMutation({
    mutationFn: (values: any) => {
      const formattedValues = {
        ...values,
      }

      if (isEdit) {
        return updateProviderContarcts({
          id: `${isEdit}`,
          queryParams: formattedValues,
        })
      }

      return createProviderContarcts(formattedValues)
    },
    onSuccess: () => {
      openNotification()
      form.resetFields()
      closeHandler()
      queryClient.invalidateQueries({ queryKey: [BillingPath['provider-contracts']] })
    },
    onError: () => {
      form.getFieldsError()
      notify.error({ message: 'Error', description: 'Error' })
    },
  })

  const closeHandler = () => {
    closeModal()
    form?.resetFields()
    if (isEdit) {
      clearId()
    }
  }

  useEffect(() => {
    if (data && isEdit) {
      form.setFieldsValue({
        paymentProviderId: data?.paymentProviderId,
        apartmentId: data?.apartmentId,
        gitId: data?.gitId,
        organisationId: data?.organisationId,
        organizationType: data?.organizationType,
        params: data?.params,
        placementId: data?.placementId,
        validFrom: data?.validFrom,
        validTo: data?.validTo,
      })
    }
  }, [data, form, isEdit])

  useEffect(() => {
    if (isModalOpen && organizationType) {
      OrganisationsRefetch()
    }
  }, [organizationType, isModalOpen])

  return (
    <>
      {notificationPlace}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={closeHandler}
        closable={false}
        centered
        closeIcon={null}
        maskClosable={false}
        footer={null}
        key={`${isModalOpen}`}
      >
        <Button
          className="absolute right-[10px] top-[10px]"
          type="text"
          icon={<CloseIcon className="text-base" />}
          onClick={closeHandler}
          disabled={handleUserSave.isPending}
        />
        <DirectoryModalHeader
          addText={isEdit ? 'common.edit' : 'common.add'}
          textDesc={ isEdit ? 'common.modal_description_edit' : 'common.modal_description' }
          id={isEdit}
          Icon={MoneyIcon}
        />
        <Form
          layout="vertical"
          onFinish={values => handleUserSave.mutate(values)}
          form={form}
          autoComplete="off"
          className="flex flex-col gap-2"
          id="onSave"
          initialValues={{
            params: [
              {
                parameterName: undefined,
                parameter: undefined,
              },
            ],
          }}
        >
          <div className="mb-4 flex h-[530px] flex-col gap-2 overflow-y-auto px-2 py-2">
            <Form.Item
              label={t('fields.provider.label')}
              name="paymentProviderId"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.provider.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.provider.placeholder')}
                className="select-shadow"
                options={mapToSelectOptions( paymentProviders?.content, 'name', 'id', )}
              />
            </Form.Item>
            <Form.Item
              label={t('fields.organization-type.label')}
              name="organizationType"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.organization-type.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.organization-type.placeholder')}
                className="select-shadow"
                disabled={!!organisationId}
                options={mapToSelectOptions(organisationsTypes, 'name', 'organization_key')}
              />
            </Form.Item>
            <Form.Item
              label={t('fields.organisation.label')}
              name="organisationId"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.organisation.error'),
                },
              ]}
            >
              <CSelect
                disabled = {!organizationType}
                showSearch
                allowClear
                placeholder={t('fields.organisation.placeholder')}
                className="select-shadow"
                options={mapToSelectOptions( organisations?.results, 'name', 'id', )}
                onSearch={val => { setOrganizationSearch(val) }}
                filterOption={false}
              />
            </Form.Item>

            <Form.Item
              label={t('fields.placement.label')}
              name="placementId"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.placement.error'),
                },
              ]}
            >
              <CSelect
                showSearch
                allowClear
                placeholder={t('fields.placement.placeholder')}
                className="select-shadow"
                options={mapToSelectOptions(placements?.results, 'name', 'id')}
                onSearch={val => { setPlacementSearch(val) }}
                filterOption={false}
                optionRender={option => (
                <Space> {option?.data?.name} - {option?.data?.region} </Space>
              )}
              />
            </Form.Item>

            <Form.Item
              label={t('fields.apartment.label')}
              name="apartmentId"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.apartment.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.apartment.placeholder')}
                className="select-shadow"
                options={mapToSelectOptions( apartments?.results, 'apartment_name', 'id', )}
              />
            </Form.Item>
            <Form.Item
              label={t('fields.guide.label')}
              name="gitId"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.guide.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.guide.placeholder')}
                className="select-shadow"
                options={mapToSelectOptions(guides?.results, 'full_name', 'user_id' )}
              />
            </Form.Item>
            <div className="flex items-center gap-2">
              <Form.Item
                label={t('fields.periodFrom.label')}
                name="validFrom"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.gender.validation-message-required'),
                  },
                ]}
              >
                <DatePicker
                  format={'DD-MM-YYYY'}
                  style={{ width: '100%' }}
                  placeholder={t('fields.periodFrom.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('fields.periodTo.label')}
                name="validTo"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.periodTo.error'),
                  },
                ]}
              >
                <DatePicker
                  format={'DD-MM-YYYY'}
                  style={{ width: '100%' }}
                  placeholder={t('fields.periodTo.placeholder')}
                />
              </Form.Item>
            </div>
            <Typography.Title level={5} className="mb-0 mt-2 text-center">
              {t('fields.parameter.labels')}
            </Typography.Title>
            <Form.List name="params">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Flex vertical key={key} gap={10} align="center">
                      <Form.Item
                        {...restField}
                        label={t('fields.parameterName.label')}
                        name={[name, 'parameterName']}
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: t('fields.parameterName.error'),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t('fields.parameterName.placeholder')}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'parameter']}
                        rules={[
                          {
                            required: true,
                            message: t('fields.parameter.error'),
                          },
                        ]}
                        style={{ width: '100%' }}
                        label={t('fields.parameter.label')}
                      >
                        <Input
                          placeholder={t('fields.parameter.placeholder')}
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="mx-auto text-lg text-red-500"
                      />
                    </Flex>
                  ))}
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      {t('common.add-field')}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </Form>

        <div className="col-span-full mt-6 flex justify-center gap-4">
          <Button onClick={closeHandler} disabled={handleUserSave.isPending}>
            {t('common.cancel')}
          </Button>
          <Button
            color="default"
            variant="solid"
            htmlType="submit"
            loading={handleUserSave.isPending}
            form="onSave"
          >
            {isEdit ? t('common.edit') : t('common.add')}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ProviderContractModal
