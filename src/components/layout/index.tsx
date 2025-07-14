import Header from './header'
import Sidebar from './sidebar'

import type { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="relative flex-1 flex flex-col overflow-y-auto">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
