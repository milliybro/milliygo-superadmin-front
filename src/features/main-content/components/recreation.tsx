import EmptyDestinationIcon from '@/components/icons/empty-destination'
import PenSquareIcon from '@/components/icons/pen-square'
import useRecreationModalStore from '../store/recreation-modal-store'
import { useLocation, useNavigate } from 'react-router'
import { useState } from 'react'

const RecreationItem = ({ category }: { category: any }) => {
  const { openModal } = useRecreationModalStore(store => store)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [id, setId] = useState<number | null>(1)

  const editHandler = (id: any) => {
    if (category.image) {
    }
    navigate(pathname + '?edit=' + id)
    openModal()
    setId(id)
  }

  return (
    <div
      className={`relative bg-[#141B3440] rounded-xl overflow-hidden group cursor-pointer ${category.size}`}
    >
      {category.content_files[0]?.file_path ? (
        <img
          src={category.content_files[0]?.file_path}
          alt={category.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 group-hover:bg-[#00000033] duration-300"
        />
      ) : (
        <div className="bg-[#F8F8FA] w-full h-full rounded-xl flex justify-center items-center group-hover:bg-[#00000033] duration-300">
          <EmptyDestinationIcon />
        </div>
      )}
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="p-[11px] rounded-[8px] bg-[#3276FF]"
          onClick={() => editHandler(category?.id)}
        >
          <PenSquareIcon />
        </div>
      </div>
      <h3
        className="absolute top-4 left-4 text-lg font-semibold"
        style={{ color: category.font_color }}
      >
        {category.title}
      </h3>
    </div>
  )
}

export default RecreationItem
