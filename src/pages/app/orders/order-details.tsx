import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function OrderDetails() {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido: {crypto.randomUUID()}</DialogTitle>
          <DialogDescription>Detalhes do Pedido</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      Pendente
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  Leonardo Mendes
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  55 (12) 9393-9999
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  leonardo@gmail.com
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado
                </TableCell>
                <TableCell className="flex justify-end">Há 3 minutos</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Pizza Peperoni</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 70</TableCell>
                <TableCell className="text-right">R$ 140</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Pizza Calabres</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 49</TableCell>
                <TableCell className="text-right">R$ 98</TableCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-left">
                  Total
                </TableCell>
                <TableCell className="text-right font-medium">R$ 147</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </>
  )
}

export default OrderDetails
