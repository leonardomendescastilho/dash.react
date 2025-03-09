import 'react-day-picker/dist/style.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ptBR } from 'date-fns/locale'
import { DayPickerProvider } from 'react-day-picker'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import router from './routes'
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizza.shop-theme">
      <HelmetProvider>
        <Toaster richColors position="bottom-right" />
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={queryClient}>
          <DayPickerProvider initialProps={{ locale: ptBR }}>
            <RouterProvider router={router} />
          </DayPickerProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}

export default App
