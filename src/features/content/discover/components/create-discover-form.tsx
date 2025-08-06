import { Divider, Form, Input, Typography } from 'antd'
import DiscoverGallery from './discover-gallery'

export default function CreateDiscoverForm() {
  return (
    <div className="flex w-full flex-shrink-0 basis-1/2 flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border p-6">
        <Typography.Title level={5} className="text-xl font-medium">
          Предпросмотр
        </Typography.Title>
        <Divider className="m-0" />
        <Form.Item name="title" label="Название">
          <Input placeholder="Введите название" size="large" />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea
            rows={6}
            placeholder="Введите короткое описание"
            size="large"
          />
        </Form.Item>
        <DiscoverGallery />
      </div>
    </div>
  )
}
