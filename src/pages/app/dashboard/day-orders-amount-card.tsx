import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

function DayOrdersAmountCard() {
  const { data: daysOrderAmount } = useQuery({
    queryKey: ['metrics', 'dayOrdersAmount'],
    queryFn: getDayOrdersAmount,
  })

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold">
            Pedidos (dia)
          </CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {daysOrderAmount ? (
            <>
              <span className="font-bol text-2xl tracking-tight">
                {daysOrderAmount.amount.toLocaleString('pt-BR')}
              </span>
              <p className="text-sm text-muted-foreground">
                {daysOrderAmount.diffFromYesterday >= 0 ? (
                  <>
                    <span className="light:text-green-400 text-green-500">
                      +{daysOrderAmount.diffFromYesterday}
                    </span>{' '}
                    em relação ao dia passado
                  </>
                ) : (
                  <>
                    <span className="light:text-rose-400 text-rose-500">
                      -{daysOrderAmount.diffFromYesterday}
                    </span>{' '}
                    em relação ao dia passado
                  </>
                )}
              </p>
            </>
          ) : (
            <MetricCardSkeleton />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default DayOrdersAmountCard
