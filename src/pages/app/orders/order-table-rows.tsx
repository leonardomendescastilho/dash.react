import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

function OrderTableRows() {
  return (
    <TableRow>
      <TableCell>
        <Button variant={'outline'} size={'xm'}>
          <Search className="h3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {crypto.randomUUID()}
      </TableCell>
      <TableCell className="text-muted-foreground">Há 15 dias</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">John Doe</TableCell>
      <TableCell className="font-medium">$150.00</TableCell>
      <TableCell>
        <Button variant={'outline'} size={'xm'}>
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'xm'}>
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default OrderTableRows
