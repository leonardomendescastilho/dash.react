import { Outlet } from 'react-router-dom'

import Header from '@/components/header'

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <h1>
        <Header />
      </h1>
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
