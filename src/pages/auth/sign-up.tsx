import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { registerRestaurant } from '@/api/register-restaurant'

const formSchema = zod.object({
  restaurantName: zod.string(),
  managerName: zod.string(),
  phone: zod.string().min(10),
  email: zod.string().email(),
})

type SignUpForm = zod.infer<typeof formSchema>

function SignUp() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    resolver: zodResolver(formSchema),
  })
  const { isSubmitting } = formState

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })
  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        email: data.email,
        managerName: data.managerName,
        phone: data.phone,
        restaurantName: data.restaurantName,
      })
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar o restaurante.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <div className="flex w-[358px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta do grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro da pizza.shop e aumente suas vendas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-2"
          >
            <div className="space-y-1">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="restaurantName">Seu restaurante</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting ? (
                  <LoaderCircle className="ml-2 animate-spin" />
                ) : (
                  'Cadastrar'
                )}
              </Button>
              <Button variant={'ghost'} asChild>
                <Link to="/sign-in">Fazer Login</Link>
              </Button>
            </div>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos
              <br />
              <a href="#" className="underline underline-offset-4">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a href="#" className="underline underline-offset-4">
                Política de Privacidade.
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
