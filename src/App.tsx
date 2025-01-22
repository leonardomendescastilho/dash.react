import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import router from './routes'
function App() {
  return (
    <HelmetProvider>
      <Toaster richColors position="bottom-right" />
      <Helmet titleTemplate="%d | pizza.shop" />
      <RouterProvider router={router}></RouterProvider>
    </HelmetProvider>
  )
}

export default App
