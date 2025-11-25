import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { Button, Divider, Form, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import QuillEditor from '@/features/content/components/quill-editor'
import { useLocation } from 'react-router'
import CreateTopDestinationForm from '../../components/create-top-destination-form'
import { useCreateTopDestination } from '../../hooks/use-create-top-destinations'
import { useEditTopDestination } from '../../hooks/use-edit-top-destination'
import { usePopularSpotImages } from '../../hooks/use-popular-spot-image'
import { useSingleTopDestination } from '../../hooks/use-single-top-destination'
import { useTopDestinationImage } from '../../hooks/use-top-destination-image'
import { useMapCoordsStore } from '../../store/map-coords-store'
import { ITopDestinationForm } from '../../types'

export default function TopDestinationForm() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm<ITopDestinationForm>()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { setImages, images } = useTopDestinationImage()
  const locale = localStorage.getItem('i18nextLng')
  const [language, setLanguage] = useState(
    locale === 'oz' ? 'uz-latin' : locale || 'en',
  )
  const { data } = useSingleTopDestination(language)

  const { images: placeImages, addImage: addPlaceImage } =
    usePopularSpotImages()
  const { coords, addCoord } = useMapCoordsStore()

  const { mutate: editMutate, isPending: editLoading } = useEditTopDestination()
  const { mutate: createMutate, isPending: createLoading } =
    useCreateTopDestination()

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content' },
      {
        title: t('content.top_destinations.title'),
        href: '/content/top-destinations',
      },
    ])
  }, [])

  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname])
  const isCreate = useMemo(() => pathname.includes('/create'), [pathname])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        description: data?.description,
        title: data?.title,
        region: data?.region?.id,
        youtube_url: data?.youtube_url,
        place_attractions: data?.place_attractions?.map(spot => ({
          name: spot?.name,
          description: spot?.description,
        })),
        status: data?.status,
      })
      setImages(
        data?.images?.map(img => ({
          file: null,
          url: img.file_path,
          id: img?.id,
        })),
      )
      data?.place_attractions?.forEach(spot => {
        if (spot?.image) {
          addPlaceImage({
            url: spot?.image,
            file: null,
          })
        } else {
          addPlaceImage(null)
        }

        if (spot?.longitude && spot?.latitude) {
          addCoord([spot?.latitude, spot?.longitude])
        }
      })
    }
  }, [data])

  const finishHandler = (values: ITopDestinationForm) => {
    const toSubmit = {
      ...values,
      youtube_url: values?.youtube_url || '',
      status: values?.status || false,
      place_attractions: values?.place_attractions?.map((spot, i) => ({
        ...spot,
        longitude: coords?.[i]?.[1],
        latitude: coords?.[i]?.[0],
        image: placeImages?.[i]?.file,
      })),
    }
    const formData = new FormData()
    formData.append('title', toSubmit.title)
    formData.append('description', toSubmit.description)
    formData.append('region', toSubmit.region.toString())
    formData.append('youtube_url', toSubmit.youtube_url)
    formData.append('status', String(toSubmit?.status))
    values.translate_all != null &&
      formData.append('translate_all', String(toSubmit.translate_all))

    images.forEach((img, i) => {
      // if (img?.id) {
      //   formData.append(`uploaded_images[${i}]id`, img?.id.toString())
      // } else
      if (img?.file) {
        formData.append(`uploaded_images[${i}]image`, img?.file)

        if (img?.resized) {
          formData.append(`uploaded_images[${i}]resized_image`, img?.resized)
        }
      }
    })

    const initialPlaces = data?.place_attractions

    values?.place_attractions?.map((spot, i) => {
      const placeId = initialPlaces?.[i]?.id
      if (placeId) {
        formData.append(`place_attractions[${i}]id`, placeId.toString())
      }
      formData.append(`place_attractions[${i}]name`, spot.name)
      formData.append(`place_attractions[${i}]description`, spot.description)
      formData.append(`place_attractions[${i}]longitude`, '' + coords?.[i]?.[1])
      formData.append(`place_attractions[${i}]latitude`, '' + coords?.[i]?.[0])
      if (placeImages?.[i]?.file)
        formData.append(`place_attractions[${i}]image`, placeImages?.[i]?.file)
    })

    if (isEdit) {
      editMutate({ data: formData, language })
    } else if (isCreate) {
      createMutate(formData)
    }
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        {isEdit
          ? t('content.top_destinations.edit')
          : isCreate
            ? t('content.top_destinations.add')
            : ''}
      </Typography.Title>
      <Form
        className="flex gap-10"
        form={form}
        layout="vertical"
        onFinish={finishHandler}
        requiredMark={false}
      >
        <div className="flex w-1/2 grow-0 basis-1/2 flex-col gap-6 rounded-2xl border bg-white p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            {t('content.top_destinations.add-content')}
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item name="description" className="mb-0">
            <QuillEditor />
          </Form.Item>
        </div>
        <CreateTopDestinationForm
          language={language}
          setLanguage={setLanguage}
        />
      </Form>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="min-w-[150px] self-start"
        onClick={() => {
          form?.submit()
        }}
        loading={editLoading || createLoading}
      >
        {t('common.save')}
      </Button>
    </div>
  )
}
