import ImageUploadIcon from '@/components/icons/image-upload'
import { Button, Divider, Form, Input, Typography, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import YandexMapPicker from '../../events/create/yandex-map-picker'
import { usePopularSpotImages } from '../hooks/use-popular-spot-image'
import { useMapCoordsStore } from '../store/map-coords-store'
import { useImageCompression } from '@/hooks/use-image-compression'

export default function PopularSpotsList() {
  const { t } = useTranslation()
  const { removeCoord, updatedCoords, coords, addCoord } = useMapCoordsStore()
  const { addImage, updateImage, images, removeImage } = usePopularSpotImages()
  const { compress, isCompressing } = useImageCompression()

  const addHandler = () => {
    addCoord()
    addImage(null)
  }

  const removeHandler = (index: number) => {
    removeCoord(index)
    removeImage(index)
  }

  const handleImageUpload = async (file: File, index: number) => {
    // if (file?.size && file?.size > 5 * 1024 * 1024) {
    //   notification.error({
    //     message: t('common.images_limit', { limit: '5 MB' }),
    //   })
    //   return
    // }

    const compressed = await compress(file)

    if (!compressed) return

    updateImage(index, {
      file: compressed?.compressedFile,
      url: URL.createObjectURL(compressed?.compressedFile),
    })
  }

  return (
    <Form.List name="place_attractions">
      {(fields, { add, remove }) => (
        <>
          {fields.map(field => (
            <div className="flex flex-col gap-2" key={field.key}>
              <Divider className="m-0" />

              <Form.Item
                name={[field.name, 'name']}
                label={
                  <div className="flex w-full items-center justify-between">
                    <div className="grow">{t('fields.place_name.label')}</div>
                    {fields.length > 1 && (
                      <Button
                        danger
                        onClick={() => {
                          remove(field.name)
                          removeHandler(field.name)
                        }}
                        size="small"
                      >
                        {t('common.delete')}
                      </Button>
                    )}
                  </div>
                }
                className="[&_.ant-form-item-label]:w-full [&_.ant-form-item-label_label::after]:hidden [&_.ant-form-item-label_label]:w-full"
              >
                <Input
                  placeholder={t('fields.place_name.placeholder')}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name={[field.name, 'description']}
                label={t('fields.place_description.label')}
              >
                <Input.TextArea
                  rows={5}
                  placeholder={t('fields.place_description.placeholder')}
                  size="large"
                />
              </Form.Item>
              <Form.Item label={t('fields.image.label')}>
                {images[field?.name]?.url ? (
                  <div className="group relative h-[250px] w-full overflow-hidden rounded-2xl border">
                    <img
                      src={images[field?.name]?.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all group-hover:bg-white/20 group-hover:opacity-100">
                      <Button
                        type="primary"
                        onClick={() => {
                          updateImage(field.name, null)
                        }}
                      >
                        {t('fields.image.edit')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Upload.Dragger
                    beforeUpload={file => {
                      handleImageUpload(file, field.name)
                      return false
                    }}
                    className="h-[250px]"
                    showUploadList={false}
                    accept="image/*"
                    disabled={isCompressing}
                  >
                    <ImageUploadIcon className="text-[4.375rem]" />
                    <Typography.Title className="m-0 text-base font-medium">
                      {t('common.select_or_drag')}
                    </Typography.Title>
                    <Typography.Paragraph className="m-0 text-sm text-secondary">
                      {t('common.images_limit', { limit: '5 MB' })}
                    </Typography.Paragraph>
                  </Upload.Dragger>
                )}
              </Form.Item>
              <div className="mt-5 h-[200px] overflow-hidden rounded-lg border">
                <YandexMapPicker
                  coordsValue={coords ? coords[field.name] : undefined}
                  onCoordsChange={newCoords => {
                    updatedCoords(field.name, newCoords)
                  }}
                  height="200px"
                />
              </div>
              <Form.Item name={[field.name, 'coords']} hidden></Form.Item>
            </div>
          ))}
          <Button
            onClick={() => {
              add()
              addHandler()
            }}
            type="dashed"
            size="large"
          >
            {t('content.top_destinations.add_place')}
          </Button>
        </>
      )}
    </Form.List>
  )
}
