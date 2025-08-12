import { Button, Form, Switch, Tag, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import VideoPlayer from 'react-player'
import UploadedVideoField from '../components/uploaded-video-field'
import { useHeroContext } from '../hooks/use-hero-context'
import { useUploadedVideoStore } from '../store/uploaded-video-store'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

export default function EditHero() {
  const {
    video: { data },
    editBackground: { mutate, isPending },
  } = useHeroContext()
  const { t } = useTranslation()
  const { uploadedVideo, removeUploadedVideo } = useUploadedVideoStore()
  const [form] = Form.useForm()
  const status = Form.useWatch('is_active', form)
  const { setBreadCrumbs } = useBreadCrumbsStore()

  useEffect(() => {
    removeUploadedVideo()

    return () => {
      removeUploadedVideo()
    }
  }, [])

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content/main' },
      {
        title: t('common.edit'),
      },
    ])
  }, [t])

  useEffect(() => {
    form.setFieldsValue({ is_active: data?.is_active || false })
  }, [data])

  return (
    <div>
      <Typography.Title level={3} className="text-2xl font-semibold">
        {t('content.hero.edit-bg')}
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={values => {
          mutate(values)
        }}
        className="flex flex-wrap divide-x rounded-2xl border py-5 *:px-6"
      >
        <div className="flex basis-1/2 flex-col gap-5">
          <Typography.Text className="font-medium">
            {t('content.hero.current-video')}
          </Typography.Text>
          <VideoPlayer src={data?.video} height="auto" width="100%" controls />
        </div>
        <div className="flex basis-1/2 flex-col gap-5">
          <div className="relative w-full">
            <Typography.Text className="font-medium">
              {t('content.hero.new-video')}
            </Typography.Text>
            {uploadedVideo && (
              <Button
                size="small"
                type="dashed"
                onClick={removeUploadedVideo}
                className="absolute right-0 top-0"
              >
                {t('common.change')}
              </Button>
            )}
          </div>
          <UploadedVideoField />
        </div>
        <div className="mt-5 flex basis-full items-end gap-5">
          <div className="flex items-end gap-5">
            <Form.Item label={t('fields.status.label')} name="is_active">
              <Switch />
            </Form.Item>
            <Tag color={status ? 'green' : 'red'} className="px-2 py-2 text-sm">
              {status ? t('common.active') : t('common.inactive')}
            </Tag>
          </div>
        </div>
      </Form>
      <Button
        type="primary"
        className="mt-10 self-start px-12"
        loading={isPending}
        onClick={() => form.submit()}
      >
        {t('common.save')}
      </Button>
    </div>
  )
}
