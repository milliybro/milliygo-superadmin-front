import EmptyDestinationIcon from '@/components/icons/empty-destination'
import PenSquareIcon from '@/components/icons/pen-square'
import useRecreationModalStore from '../store/recreation-modal-store'
import { useLocation, useNavigate } from 'react-router'

const RecreationItem = ({ category }: { category: any }) => {
  const { openModal } = useRecreationModalStore(store => store)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const editHandler = (id: any) => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-xl bg-[#141B3440] ${category.size}`}
    >
      {category.content_files[0]?.file_path ? (
        <img
          src={category.content_files[0]?.file_path}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#00000033]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#F8F8FA] duration-300 group-hover:bg-[#00000033]">
          <EmptyDestinationIcon />
        </div>
      )}
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="rounded-[8px] bg-[#3276FF] p-[11px]"
          onClick={() => editHandler(category?.id)}
        >
          <PenSquareIcon />
        </div>
      </div>
      <h3
        className="absolute left-4 top-4 text-lg font-semibold"
        style={{ color: category.font_color }}
      >
        {category.title}
      </h3>
    </div>
  )
}

export default RecreationItem
