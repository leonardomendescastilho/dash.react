import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'date-fns'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterSchema = z.infer<typeof orderFiltersSchema>

function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // pega os valores dos parâmetros da url
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control } = useForm<OrderFilterSchema>({
    resolver: zodResolver(orderFiltersSchema),
    // pega os valores dos parâmetros da url e seta como valor padrão, se existir, caso não exista, seta como vazio
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  const handleFilter = ({
    orderId,
    customerName,
    status,
  }: OrderFilterSchema) => {
    // cria um novo objeto URLSearchParams
    const params = new URLSearchParams()

    if (orderId) params.set('orderId', orderId)
    if (customerName) params.set('customerName', customerName)
    if (status) params.set('status', status)

    // seta o valor da página como 1 para que seja exibido os resultados desde o primeiro
    params.set('page', '1')

    // seta os valores dos parâmetros na url
    setSearchParams(params)
  }

  const handleClearFilters = () => {
    setSearchParams({})
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      {/* tanto o id quanto o nome do cliente são elementos HTML, por isso é possível usar o register para pegar o valor do input */}
      <Input placeholder="id" className="h-8 w-auto" {...register('orderId')} />
      <Input
        placeholder="nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />
      {/* o select é um componente da Lib, por isso é necessário usar o control para pegar o valor do select e o render para renderizar o componente */}
      {/* o render é uma função que retorna um elemento do react, e o field é o valor do input */}
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />
      <Button type="submit" variant={'secondary'} size={'xm'}>
        <Search className="mr-1 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        type="button"
        variant={'outline'}
        size={'xm'}
        onClick={handleClearFilters}
      >
        <X className="mr-1 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  )
}

export default OrderTableFilters
