import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div>
      <h1>Autentificação</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
