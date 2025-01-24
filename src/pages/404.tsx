import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-muted-foreground">
          Voltar para o{' '}
          <Link to="/" className="dark:text-skye-600 text-sky-500">
            Dashboard
          </Link>
        </p>
      </div>
    </>
  )
}

export default NotFound
