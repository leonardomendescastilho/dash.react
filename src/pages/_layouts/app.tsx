import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Header from '@/components/header'
import { api } from '@/lib/axios'

function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      // se houver resposta, retorna a resposta
      (response) => response,
      // se houver erro, verifica se é 401 e redireciona para a página de login
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data?.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

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
