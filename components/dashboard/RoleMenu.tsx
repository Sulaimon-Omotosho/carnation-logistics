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
import { roles } from '@/constants'

const RoleMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          Role <ChevronDown className='w-4 h-auto' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {roles.map((role) => {
          return (
            <DropdownMenuItem key={role.id}>
              <form action=''>
                {/* <input type='hidden' name='id' value={role.id} /> */}
                <input type='hidden' name='status' value={role.id} />
                <button>{role.label}</button>
              </form>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RoleMenu
