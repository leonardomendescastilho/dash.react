import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'monthRevenue'],
    queryFn: getMonthRevenue,
  })

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold">
            Receita total (mês)
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthRevenue ? (
            <>
              <span className="font-bol text-2xl tracking-tight">
                {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <p className="text-sm text-muted-foreground">
                {monthRevenue.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="light:text-green-400 text-green-500">
                      +{monthRevenue.diffFromLastMonth}
                    </span>{' '}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="light:text-rose-400 text-rose-500">
                      {monthRevenue.diffFromLastMonth}
                    </span>{' '}
                    em relação ao mês passado
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

export default MonthRevenueCard
