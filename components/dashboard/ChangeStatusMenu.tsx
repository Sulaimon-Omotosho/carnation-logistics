'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'

import { ChevronDown, LoaderCircle } from 'lucide-react'
import { statuses } from '@/constants'
import { updateInvoice } from '@/lib/actions/data'
import { useState } from 'react'
import { ChangeStatusModal } from './StatusChangeModal'

const ChangeStatusMenu = ({
  invoiceId,
  currentStatus,
  role,
}: {
  invoiceId: string
  currentStatus: string
  role: string
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    if (!selectedStatus) return
    setIsLoading(true)

    updateInvoice({
      invoiceId,
      newStatus: selectedStatus,
      verificationNote: note,
    })
      .then((response) => {
        if (response instanceof Error) {
          console.error(response.message) // Log the error message
        } else if ('error' in response) {
          console.error(response.error) // Handle custom error from the response
        } else {
          console.log('Invoice update successful')
          setShowModal(false)
        }
        window.location.reload()
      })
      .catch((error) => console.error(error))
  }

  const openStatusModal = (statusId: string) => {
    setSelectedStatus(statusId)
    setShowModal(true)
  }

  const filteredStatuses = statuses.filter((status) => {
    if (role === 'SUPERVISOR' && status.id === 'cancelled') return false
    if (currentStatus === 'IN_PROGRESS' && status.id === 'IN_PROGRESS')
      return false
    if (currentStatus === 'FULFILLED' && status.id === 'FULFILLED') return false
    if (currentStatus === 'CANCELLED' && status.id === 'CANCELLED') return false
    return true
  })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='flex items-center gap-2'>
            <span className='hidden md:block'>Change Status </span>
            <ChevronDown className='w-4 h-auto' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filteredStatuses.map((status) => {
            return (
              <DropdownMenuItem
                key={status.id}
                onClick={() => openStatusModal(status.id)}
              >
                {status.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {showModal && (
        <ChangeStatusModal
          onClose={() => setShowModal(false)}
          title='Enter Notes'
        >
          <div className='p-4'>
            <textarea
              placeholder='Enter your notes here'
              className='w-full p-2 border rounded-md'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className='mt-4 flex justify-end gap-2'>
              <Button variant='secondary' onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleStatusChange(selectedStatus!)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <p className='flex gap-1'>
                    Loading <LoaderCircle className='animate-spin' />
                  </p>
                ) : (
                  'Confirm'
                )}
              </Button>
            </div>
          </div>
        </ChangeStatusModal>
      )}
    </>
  )
}

export default ChangeStatusMenu
