import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import updateProfile from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable().optional(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileMutation } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, description }) => {
      const { cached: previousData } = updateManagedRestaurantCache({
        name,
        description,
      })

      return { previousData }
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        updateManagedRestaurantCache(context.previousData)
      }
    },
  })

  const handleUpdateProfile = async (data: StoreProfileSchema) => {
    try {
      await updateProfileMutation({
        name: data.name,
        description: data.description ?? undefined,
      })
      toast.success('Perfil da loja atualizado com sucesso')
    } catch (error) {
      toast.error('Erro ao atualizar o perfil da loja')
    }
  }

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil da Loja</DialogTitle>
          <DialogDescription>
            Gerencie as informações da sua loja aqui
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Nome da Loja</Label>
              <Input
                className="col-span-3"
                id="name"
                placeholder="Nome da Loja"
                {...register('name')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                className="col-span-3 resize-none"
                id="description"
                placeholder="Descrição da loja"
                {...register('description')}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>

            {isSubmitting ? (
              <Button type="submit" variant="success" disabled>
                Salvando...
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Salvar
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  )
}

export default StoreProfileDialog
