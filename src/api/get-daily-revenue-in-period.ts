import { api } from '@/lib/axios'

export type GetDailyRevenueResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenue() {
  const response = await api.get<GetDailyRevenueResponse>(
    'metrics/daily-receipt-in-period',
  )

  return response.data
}
