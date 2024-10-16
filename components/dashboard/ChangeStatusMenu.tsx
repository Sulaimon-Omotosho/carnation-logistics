import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'

// import { updateStatusAction } from '@/lib/action'
import { ChevronDown } from 'lucide-react'
import { statuses } from '@/constants'

const ChangeStatusMenu = async ({ invoiceId }: { invoiceId: number }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          Change Status <ChevronDown className='w-4 h-auto' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statuses.map((status) => {
          return (
            <DropdownMenuItem key={status.id}>
              <form action=''>
                <input type='hidden' name='id' value={invoiceId} />
                <input type='hidden' name='status' value={status.id} />
                <button>{status.label}</button>
              </form>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ChangeStatusMenu
