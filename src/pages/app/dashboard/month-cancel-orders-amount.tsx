import { useQuery } from '@tanstack/react-query'
import { MessageSquareX } from 'lucide-react'

import { getMonthCancelOrdersAmount } from '@/api/get-month-cancel-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function MonthCancelOrdersAmount() {
  const { data: monthCancelOrdersAmount } = useQuery({
    queryFn: getMonthCancelOrdersAmount,
    queryKey: ['metrics', 'monthCancelOrdersAmount'],
  })

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold">
            Cancelados (mês)
          </CardTitle>
          <MessageSquareX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthCancelOrdersAmount && (
            <>
              <span className="font-bol text-2xl tracking-tight">
                {monthCancelOrdersAmount.amount.toLocaleString('pt-BR')}
              </span>
              <p className="text-sm text-muted-foreground">
                {monthCancelOrdersAmount.diffFromLastMonth < 0 ? (
                  <>
                    <span className="light:text-green-400 text-green-500">
                      {monthCancelOrdersAmount.diffFromLastMonth}
                    </span>{' '}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="light:text-rose-400 text-rose-500">
                      {monthCancelOrdersAmount.diffFromLastMonth}
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

export default MonthCancelOrdersAmount
