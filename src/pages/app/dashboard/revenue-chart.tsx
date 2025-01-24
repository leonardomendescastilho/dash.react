import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '2022-01-01', revenue: 650 },
  { date: '2022-01-05', revenue: 1200 },
  { date: '2022-01-10', revenue: 1800 },
  { date: '2022-01-15', revenue: 2500 },
  { date: '2022-01-20', revenue: 900 },
  { date: '2022-01-25', revenue: 1500 },
  { date: '2022-01-28', revenue: 2000 },
  { date: '2022-01-30', revenue: 1700 },
]

function RevenueChart() {
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
        </CardHeader>

        <CardContent>
          {/* // responsive para adaptar o grafico ao tamanho da tela */}
          <ResponsiveContainer width={'100%'} height={248}>
            <LineChart data={data} style={{ fontSize: 12 }}>
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
                dataKey={'revenue'} // o que vai ficar no eixo y? mostra o valor da propriedade revenue
                stroke={colors.green[700]} //
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default RevenueChart
