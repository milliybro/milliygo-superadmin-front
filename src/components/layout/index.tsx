import Header from './header'
import Sidebar from './sidebar'

import type { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full bg-[#F8FAFC]">
      {/* <span className='h-full'> */}
        <Sidebar />
      {/* </span> */}

      <div className="flex-1 flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
