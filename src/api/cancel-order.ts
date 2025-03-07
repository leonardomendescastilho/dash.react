import { api } from '@/lib/axios'

export interface CancerOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CancerOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
