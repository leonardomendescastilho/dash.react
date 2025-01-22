import { createBrowserRouter } from 'react-router-dom'

import Dashboard from './pages/app/Dashboard'
import SignIn from './pages/auth/Sign-in'

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/sign-in', element: <SignIn /> },
])

export default router
