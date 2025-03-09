import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenue } from '@/api/get-daily-revenue-in-period'
import { DateRangePicker } from '@/components/date-range-picker'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenue({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartDate = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <>
      <Card className="col-span-6">
        <CardHeader className="flex-row items-center justify-between pb-8">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">
              Receita no período
            </CardTitle>
            <CardDescription>Receita diário no período</CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <Label>Período</Label>
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
        </CardHeader>

        <CardContent>
          {/* // responsive para adaptar o grafico ao tamanho da tela */}

          {chartDate && (
            <ResponsiveContainer width={'100%'} height={248}>
              <LineChart data={chartDate} style={{ fontSize: 12 }}>
                <XAxis
                  dataKey={'date'} // o que vai ficar no eixo x
                  axisLine={false} // detalhe do eixo x
                  tickLine={false} // detalhe do eixo x
                  dy={16} // espaço entre o grafico e o eixo x
                  tickFormatter={(value: string) =>
                    value.split('-').reverse().join('/')
                  } // formatar o valor que aparece no eixo x
                />
                <YAxis
                  stroke="#888" // cor do eixo y
                  axisLine={false} // detalhe do eixo y
                  tickLine={false} // detalhe do eixo y
                  width={80} // largura do eixo y
                  tickFormatter={(value: number) =>
                    value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  } // formatar o valor que aparece no eixo y
                />

                {/* configurações dos traços do grafico */}
                <CartesianGrid
                  vertical={false}
                  strokeWidth="0.1"
                  className="stroke-muted-foreground"
                />

                {/* // configuracoes do grafico, o data é o array de dados que vai ser mostrado */}
                <Line
                  type={'linear'} // tipo de grafico
                  strokeWidth="2" // largura da linha
                  dataKey={'receipt'} // o que vai ficar no eixo y? mostra o valor da propriedade revenue
                  stroke={colors.green[700]} //
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default RevenueChart
