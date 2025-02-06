import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import router from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizza.shop-theme">
      <HelmetProvider>
        <Toaster richColors position="bottom-right" />
        <Helmet titleTemplate="%s | pizza.shop" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
      </HelmetProvider>
      
    </ThemeProvider>
  )
}

export default App
