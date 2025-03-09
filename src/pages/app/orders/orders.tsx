import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import Pagination from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import OrderTableFilters from './order-table-filters'
import OrderTableRows from './order-table-rows'
import { OrderTableSkeleton } from './order-table-skeleton'

function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  // pega os valores dos parâmetros da url (order-table-filters)
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  // verifica se o parametro page já existe no url, se existir, transforma em numero e subtrai 1, para ficar com o index de array.
  // então, o pageIndex será 0 sempre que iniciar o componente (para o backend será 0, para o usuário será 1)
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  // faz a query para pegar os dados da paginação
  const { data: result, isLoading: isLoadingOrders } = useQuery({
    // importante ter o filtro para que seja possivel fazer a query novamente com o novo pageIndex e filtros e assim mudar de página.
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  // função para mudar de paginação utilizando o setSearchParams e o url.set para adicionar o novo parametro page convertendo para string, sempre.
  const handlePageChange = (pageIndex: number) => {
    // url pode ser chamado de prevPage, State, etc.
    setSearchParams((url) => {
      url.set('page', (pageIndex + 1).toString())
      return url
    })
  }
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[148px]">Identificador</TableHead>
                  <TableHead className="w-[188px]">Realizado há</TableHead>
                  <TableHead className="w-[148px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[148px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingOrders && <OrderTableSkeleton />}

                {result &&
                  result.orders.map((order) => {
                    return <OrderTableRows key={order.orderId} order={order} />
                  })}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Orders
