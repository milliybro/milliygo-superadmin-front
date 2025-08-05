import { Button, Divider, Form, Input } from 'antd'
import YandexMapPicker from '../../events/create/yandex-map-picker'
import { useTranslation } from 'react-i18next'
import useTopDestinationsContext from '../hooks/use-top-destinations'

export default function PopularSpotsList() {
  const { t } = useTranslation()
  const { setCoords } = useTopDestinationsContext()
  return (
    <Form.List name="popular_spots">
      {(fields, { add, remove }) => (
        <>
          {fields.map(field => (
            <div className="flex flex-col gap-2" key={field.key}>
              <Divider className="m-0" />

              <Form.Item
                name={[field.name, 'title']}
                label={
                  <div className="flex w-full items-center justify-between">
                    <div className="grow">Название места</div>
                    {fields.length > 1 && (
                      <Button
                        danger
                        onClick={() => {
                          remove(field.name)
                          setCoords(prev => {
                            const updatedCoords = [...(prev || [])]
                            updatedCoords.splice(field.name, 1)
                            return updatedCoords
                          })
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
                <Input placeholder="Введите название" size="large" />
              </Form.Item>
              <Form.Item
                name={[field.name, 'description']}
                label="Описание места"
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Введите описание"
                  size="large"
                />
              </Form.Item>
              <div className="overflow-hidden rounded-lg border">
                <YandexMapPicker
                  onCoordsChange={newCoords => {
                    setCoords(prev => {
                      const updatedCoords = [...(prev || [])]
                      updatedCoords[field.name] = newCoords
                      return updatedCoords
                    })
                  }}
                />
              </div>
              <Form.Item name={[field.name, 'coords']} hidden></Form.Item>
            </div>
          ))}
          <Button onClick={() => add()} type="dashed" size="large">
            Добавить место
          </Button>
        </>
      )}
    </Form.List>
  )
}
