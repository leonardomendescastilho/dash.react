import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const formSchema = zod.object({
  email: zod.string().email(),
})

type SignInForm = zod.infer<typeof formSchema>

function SignIn() {
  const [searchParams] = useSearchParams()

  const { register, handleSubmit, formState } = useForm<SignInForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get('email') || '',
    },
  })
  const { isSubmitting } = formState

  const { mutateAsync: authenticate} = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email })

      toast.success('Link de autenticação enviado para o seu e-mail.', {
        action: {
          label: 'Ir para o e-mail',
          onClick: () => window.open('https://mail.google.com/'),
        },
      })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[358px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parcerio!{' '}
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="flex flex-col gap-2">
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting ? (
                  <LoaderCircle className="ml-2 animate-spin" />
                ) : (
                  'Acessar Painel'
                )}
              </Button>
              <Button variant={'ghost'} asChild>
                <Link to={'/sign-up'}>Cadastrar novo parceiro</Link>
              </Button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
