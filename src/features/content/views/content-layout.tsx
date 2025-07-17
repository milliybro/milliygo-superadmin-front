import { Outlet } from 'react-router'

export default function ContentLayout() {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  )
}
