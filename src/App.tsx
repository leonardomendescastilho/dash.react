import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import router from './routes'

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%d | pizza.shop" />
      <RouterProvider router={router}></RouterProvider>
    </HelmetProvider>
  )
}

export default App
