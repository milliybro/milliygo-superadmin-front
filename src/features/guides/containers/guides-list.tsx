import { useState } from 'react'
import GuideDetailsModal from '../components/guide-details-modal'
import GuidesTable from '../components/guides-table'
import GuideRejectModal from '../components/guide-reject-modal'
import { ISelectedGuide } from '../types'

export default function GuidesList() {
  const [selectedGuide, setSelectedGuide] = useState<ISelectedGuide | null>(
    null,
  )

  return (
    <div>
      <GuidesTable
        onViewGuide={id => setSelectedGuide({ id, status: 'view' })}
        onRejectGuide={id => setSelectedGuide({ id, status: 'reject' })}
      />
      <GuideDetailsModal
        guideId={selectedGuide?.id ?? null}
        open={selectedGuide?.status === 'view'}
        onCancel={() => {
          setSelectedGuide(null)
        }}
      />
      <GuideRejectModal
        guideId={selectedGuide?.id ?? null}
        open={selectedGuide?.status === 'reject'}
        onCancel={() => setSelectedGuide(null)}
      />
    </div>
  )
}
