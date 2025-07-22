import TickDoubleIcon from '@/components/icons/tick-double'
import { useState } from 'react'

const FacilitiesCell = ({ val, rowKey }: { val: any[]; rowKey: string }) => {
  const [showAllRows, setShowAllRows] = useState<Record<string, boolean>>({})

  const showAll = showAllRows[rowKey] || false
  const safeVal = Array.isArray(val) ? val : []
  const visibleItems = showAll ? safeVal : safeVal.slice(0, 3)

  const toggleShowAll = () => {
    setShowAllRows(prev => ({
      ...prev,
      [rowKey]: !prev[rowKey],
    }))
  }

  return (
    <div className="text-sm text-[#4DD282] flex flex-col gap-2">
      {visibleItems.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <TickDoubleIcon />
          {item?.name}
        </span>
      ))}

      {val?.length > 5 && (
        <button
          className="text-[#4DD282] cursor-pointer text-start"
          onClick={toggleShowAll}
        >
          {showAll ? '▲' : '...'}
        </button>
      )}
    </div>
  )
}

export default FacilitiesCell
