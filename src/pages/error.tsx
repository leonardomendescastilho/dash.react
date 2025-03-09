import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Whoops, algo aconteceu....
        </h1>
        <p className="text-accent-foreground">
          Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
        </p>
        <pre className="my-10 text-xl text-red-500">
          {error?.message || JSON.stringify(error)}
        </pre>
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
