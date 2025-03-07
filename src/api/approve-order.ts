import { api } from '@/lib/axios'

export interface approveOrderParams {
  orderId: string
}

export async function approveOrder({ orderId }: approveOrderParams) {
  await api.patch(`/orders/${orderId}/approve`)
}
