import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function MonthOrdersAmountCard() {
  const { data: monthOrderAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'monthOrdersAmount'],
  })

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold">
            Pedidos (mês)
          </CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthOrderAmount && (
            <>
              <span className="font-bol text-2xl tracking-tight">
                {monthOrderAmount.amount.toLocaleString('pt-BR')}
              </span>
              <p className="text-sm text-muted-foreground">
                {monthOrderAmount.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="light:text-green-400 text-green-500">
                      +{monthOrderAmount.diffFromLastMonth}
                    </span>{' '}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="light:text-rose-400 text-rose-500">
                      {monthOrderAmount.diffFromLastMonth}
                    </span>{' '}
                    em relação ao mês passado
                  </>
                )}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default MonthOrdersAmountCard
