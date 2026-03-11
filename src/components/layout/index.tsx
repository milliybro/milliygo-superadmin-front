import Header from './header'
import Sidebar from './sidebar'

import type { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] h-full">
      <div className="h-screen overflow-y-auto">
        <Sidebar />
      </div>

      <div
        className="relative flex flex-1 flex-col overflow-y-auto"
        id="main-content"
      >
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
