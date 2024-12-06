import dayjs from 'dayjs'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { Divider, message, TimePicker, Upload, UploadProps } from 'antd'

import CSelect from '@/components/ui/select'

interface FormValues {
  username: string
  email: string
  password: string
}

const HotelsItemContent = () => {
  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()

  const mapState = {
    center: [41.311158, 69.279737],
    zoom: 14,
  }

  const uploadProps: UploadProps = {
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

  const onFinish = (values: FormValues) => {
    console.log('Form values:', values)
    message.success('Форма успешно отправлена!')
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="hotelContentForm"
      className="flex flex-col gap-6"
    >
      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.main-information')}
        </h2>
        <Divider />
        <div className="space-y-4">
          <Form.Item
            label={t('fields.hotel-name.label')}
            name="hotelName"
            rules={[
              {
                required: true,
                message: t('fields.hotel-name.validation-message-required'),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={t('fields.hotel-name.placeholder')}
            />
          </Form.Item>

          <Form.Item
            label={t('fields.hotel-description.label')}
            name="hotelDescription"
            rules={[
              {
                required: true,
                message: t(
                  'fields.hotel-description.validation-message-required',
                ),
              },
            ]}
          >
            <Input.TextArea
              rows={8}
              placeholder={t('fields.hotel-description.placeholder')}
              className="!resize-none"
            />
          </Form.Item>

          <Form.Item
            label={t('fields.address.label')}
            name="address"
            rules={[
              {
                required: true,
                message: t('fields.address.validation-message-required'),
              },
            ]}
          >
            <Input size="large" placeholder={t('fields.address.placeholder')} />
          </Form.Item>

          <div className="mt-4 w-full h-[477px] rounded-[12px] border border-border overflow-hidden">
            <YMaps
              query={{
                lang:
                  i18n.language === 'oz'
                    ? 'uz_UZ'
                    : i18n.language === 'ru'
                      ? 'ru_RU'
                      : 'en_US',
              }}
            >
              <Map
                defaultState={mapState}
                width="100%"
                height="477px"
                modules={['control.ZoomControl', 'control.FullscreenControl']}
              >
                <Placemark
                  geometry={mapState.center}
                  modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                  options={{
                    iconLayout: 'default#image',
                    iconImageSize: [64, 64],
                    iconImageOffset: [-37, -64],
                    iconImageHref: `/location-icon.svg`,
                    zIndex: 1,
                  }}
                />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.photos')}
        </h2>
        <Divider />

        <Form.Item
          name="photos"
          label={t('fields.photos.label')}
          rules={[
            {
              required: true,
              message: t('fields.photos.validation-message-required'),
            },
          ]}
        >
          <Upload.Dragger {...uploadProps}>
            <div className="py-[72px]">
              <p className="ant-upload-drag-icon flex justify-center">
                <img
                  src="/src/assets/dnd-illustration.svg"
                  alt="dnd illustration"
                />
              </p>
              <p className="font-medium text-[16px] text-primary-dark">
                {t('common.select-drag-a-photo')}
              </p>
              <p className="text-[14px] text-secondary">
                {t('common.max-size-five-mb')}
              </p>
            </div>
          </Upload.Dragger>
        </Form.Item>
      </div>
      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.facilities-and-services')}
        </h2>
        <Divider />

        <Form.Item
          name="amenities"
          label={t('fields.amenities.label')}
          rules={[
            {
              required: true,
              message: t('fields.amenities.validation-message-required'),
            },
          ]}
        >
          <CSelect
            size="large"
            placeholder={t('fields.amenities.placeholder')}
            mode="multiple"
            options={[
              { label: 'Wi-Fi', value: 'wifi' },
              { label: 'Парковка', value: 'parking' },
              { label: 'Бассейн', value: 'pool' },
              { label: 'Спа', value: 'spa' },
            ]}
          />
        </Form.Item>
      </div>
      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.accommodation-terms')}
        </h2>
        <Divider />

        <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-6">
          <Form.Item
            name="checkInTime"
            label={t('fields.check-in-time.label')}
            rules={[
              {
                required: true,
                message: t('fields.check-in-time.validation-message-required'),
              },
            ]}
          >
            <TimePicker
              size="large"
              format="HH:mm"
              className="w-full h-[47px]"
              // defaultValue={dayjs('14:00', 'HH:mm')}
            />
          </Form.Item>

          <Form.Item
            name="checkOutTime"
            label={t('fields.check-out-time.label')}
            rules={[
              {
                required: true,
                message: t('fields.check-out-time.validation-message-required'),
              },
            ]}
          >
            <TimePicker
              size="large"
              format="HH:mm"
              className="w-full h-[47px]"
              // defaultValue={dayjs('12:00', 'HH:mm')}
            />
          </Form.Item>
          <Form.Item
            name="bookingTermsLink"
            label={t('fields.booking-terms-link.label')}
            rules={[
              {
                required: true,
                message: t(
                  'fields.booking-terms-link.validation-message-required',
                ),
              },
              {
                type: 'url',
                message: t(
                  'fields.booking-terms-link.validation-message-invalid-url',
                ),
              },
            ]}
          >
            <Input size="large" placeholder="https://" />
          </Form.Item>
          <Form.Item
            name="childrenBeds"
            label={t('fields.children-beds.label')}
            rules={[
              {
                required: true,
                message: t('fields.children-beds.validation-message-required'),
              },
            ]}
          >
            <CSelect
              size="large"
              placeholder={t('fields.children-beds.placeholder')}
              options={[
                { label: 'Разрешается', value: 'allowed' },
                { label: 'Не разрешается', value: 'not_allowed' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="pets"
            label={t('fields.pets.label')}
            rules={[
              {
                required: true,
                message: t('fields.pets.validation-message-required'),
              },
            ]}
          >
            <CSelect
              size="large"
              placeholder={t('fields.pets.placeholder')}
              options={[
                { label: 'Разрешается', value: 'allowed' },
                { label: 'Запрещается', value: 'not_allowed' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="ageRestrictions"
            label={t('fields.age-restrictions.label')}
            rules={[
              {
                required: true,
                message: t(
                  'fields.age-restrictions.validation-message-required',
                ),
              },
            ]}
          >
            <CSelect
              size="large"
              placeholder={t('fields.age-restrictions.placeholder')}
              options={[
                {
                  label: 'Нет ограничений',
                  value: 'no_restrictions',
                },
                { label: '18+', value: '18_plus' },
                { label: '21+', value: '21_plus' },
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="paymentMethods"
          label={t('fields.payment-methods.label')}
          rules={[
            {
              required: true,
              message: t('fields.payment-methods.validation-message-required'),
            },
          ]}
        >
          <CSelect
            size="large"
            placeholder={t('fields.payment-methods.placeholder')}
            mode="multiple"
            options={[
              { label: 'Наличные', value: 'cash' },
              { label: 'Кредитная карта', value: 'credit_card' },
              {
                label: 'Банковский перевод',
                value: 'bank_transfer',
              },
            ]}
          />
        </Form.Item>
      </div>
    </Form>
  )
}

export default HotelsItemContent
