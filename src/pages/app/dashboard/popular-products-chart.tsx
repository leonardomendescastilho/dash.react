import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { product: 'Margherita', totalAmount: 75 },
  { product: 'Pepperoni', totalAmount: 90 },
  { product: 'Hawaiian', totalAmount: 60 },
  { product: 'BBQ Chicken', totalAmount: 85 },
  { product: 'Veggie', totalAmount: 50 },
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

function PopularProductsChart() {
  return (
    <>
      <Card className="col-span-3">
        <CardHeader className="pb-8">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">
              Produtos Populares{' '}
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>

        <CardContent>
          {/* // responsive para adaptar o grafico ao tamanho da tela */}
          <ResponsiveContainer width={'100%'} height={248}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={data}
                dataKey={'totalAmount'}
                name="product"
                cx={'50%'}
                cy={'50%'}
                innerRadius={64}
                outerRadius={86}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {data[index].product.length > 12
                        ? data[index].product.substring(0, 12).concat('...')
                        : data[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {data.map((_, index) => {
                  return (
                    <Cell
                      className="stroke-background transition-all duration-200 hover:opacity-80"
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default PopularProductsChart
