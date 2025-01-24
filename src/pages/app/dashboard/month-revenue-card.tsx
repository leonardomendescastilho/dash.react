import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function MonthRevenueCard() {
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
          <span className="font-bol text-2xl tracking-tight">R$ 1238,0</span>
          <p className="text-sm text-muted-foreground">
            <span className="light:text-emerald-400 text-emerald-500">+2%</span>{' '}
            em relação ao mês passado{' '}
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default MonthRevenueCard
