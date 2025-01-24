import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function DayOrdersAmountCard() {
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
          <span className="font-bol text-2xl tracking-tight">13</span>
          <p className="text-sm text-muted-foreground">
            <span className="light:text-rose-400 text-rose-500">-5%</span> em
            relação ao mês passado{' '}
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default DayOrdersAmountCard
