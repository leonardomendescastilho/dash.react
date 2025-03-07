export type OrderStatusBase =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatusBase
}

const orderStatusMap: Record<OrderStatusBase, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Processando',
  delivering: 'Entregando',
  delivered: 'Entregue',
}

const orderStatusColorMap: Record<OrderStatusBase, string> = {
  pending: 'bg-gray-500',
  canceled: 'bg-red-500',
  processing: 'bg-amber-500',
  delivering: 'bg-amber-500',
  delivered: 'bg-emerald-500',
}

function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${orderStatusColorMap[status]}`} />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}

export default OrderStatus
