import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR, th } from 'date-fns/locale'

import { getOrderDetails } from '@/api/get-order-details'
import OrderStatus from '@/components/order-status'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderDetailsSkeleton } from './order-details-skeleton'

interface OrderDetailsProps {
  orderId: string
  open: boolean
}

function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: result } = useQuery({
    queryKey: ['orderDetails', { orderId }],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido: {orderId}</DialogTitle>
          <DialogDescription>Detalhes do Pedido</DialogDescription>
        </DialogHeader>

        {result ? (
          <div className="space-y-6">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Status
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-muted-foreground">
                        <OrderStatus status={result.status} />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Cliente
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {result.customer.name}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {result.customer.phone ?? 'Não informado'}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    E-mail
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {result.customer.email}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Realizado
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {formatDistanceToNow(result.createdAt, {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.orderItems.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {(item.priceInCents / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(
                          (item.priceInCents * item.quantity) /
                          100
                        ).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-left">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {(result.totalInCents / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        ) : (
          <OrderDetailsSkeleton />
        )}
      </DialogContent>
    </>
  )
}

export default OrderDetails
