import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number // página atual
  totalCount: number // total de registro
  perPage: number // registros por páginas
  onPageChange: (pageIndex: number) => void
}

function Pagination({
  totalCount,
  pageIndex,
  perPage,
  onPageChange,
}: PaginationProps) {
  // calcula o total de paginas, se não houver total de registro, retorna 1
  const pages = Math.ceil(totalCount / perPage) || 1

  // função para mudar de paginação, recebe o pageIndex e chama a função onPageChange passando o pageIndex
  const handlePageChange = (pageIndex: number) => {
    onPageChange(pageIndex)
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          {/* botão para voltar para a primeira página, desabilitado se estiver na primeira página */}
          <Button
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
            value={'outline'}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          {/* botão para voltar para a página anterior, desabilitado se estiver na primeira página */}
          <Button
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            value={'outline'}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          {/* botão para ir para a próxima página, desabilitado se estiver na última página */}
          <Button
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex === pages - 1}
            value={'outline'}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          {/* botão para ir para a última página, desabilitado se estiver na última página */}
          <Button
            onClick={() => handlePageChange(pages - 1)}
            disabled={pageIndex === pages - 1}
            value={'outline'}
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
