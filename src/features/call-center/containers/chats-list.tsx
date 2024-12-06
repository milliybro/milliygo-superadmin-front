import type { Dispatch, SetStateAction, FC } from 'react'

interface IProps {
  selectedChat: string | null
  setSelectedChat: Dispatch<SetStateAction<string | null>>
}

const ChatsList: FC<IProps> = ({ selectedChat, setSelectedChat }) => {
  const handleChatSelect = (chat: string) => {
    setSelectedChat(chat)
  }

  return (
    <aside className="col-span-3 bg-white border flex-col overflow-hidden border-border rounded-[16px]">
      <ul className=" divide-y">
        {[
          'Евгения Малышева',
          'Андрей Чернов',
          'Станислав Ярушин',
          'Aziza Matchanova',
        ].map(name => (
          <li
            key={name}
            className={`flex select-none items-center duration-200 justify-between py-4 px-6 hover:bg-gray-100 cursor-pointer ${
              selectedChat === name ? 'bg-primary-light/50' : ''
            }`}
            onClick={() => handleChatSelect(name)}
          >
            <div className="flex items-center gap-4">
              <div className="size-[48px] rounded-full border-border border bg-secondary-light" />
              <div>
                <p className="text-[16px] font-bold text-primary-dark">
                  {name}
                </p>
                <p className="text-sm text-gray-500">
                  Здравствуйте, Алексей...
                </p>
              </div>
            </div>
            <div className=" inline-flex shrink-0 flex-col items-end gap-2">
              <span className="text-[12px] text-secondary">14:30</span>
              <span className="size-[20px] rounded-full bg-primary overflow-hidden flex items-center justify-center text-white text-[14px]">
                1
              </span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default ChatsList
