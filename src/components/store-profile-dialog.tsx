import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'

import { Button } from './ui/button'
import {
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
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const { register, handleSubmit, formState } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: {
      name: managedRestaurant?.name,
      description: managedRestaurant?.description,
    },
  })

  const { isSubmitting } = formState

  const onSubmit = (data: StoreProfileSchema) => {
    console.log(data)
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button variant="outline" type="button">
              Cancelar
            </Button>

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
