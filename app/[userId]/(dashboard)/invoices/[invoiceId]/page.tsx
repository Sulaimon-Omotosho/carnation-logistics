import ChangeStatusMenu from '@/components/dashboard/ChangeStatusMenu'
import { Badge } from '@/components/ui/badge'
import { getInvoice } from '@/lib/actions/data'
import { authOptions } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'

const InvoicePage = async ({ params }: { params: { invoiceId: string } }) => {
  const invoiceId = params.invoiceId
  const session = await getServerSession(authOptions)

  const invoice = await getInvoice(invoiceId)

  if (!invoice) {
    return <p className='text-2xl text-center'>Invoice not found</p>
  }

  return (
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] px-2 pb-5 md:px-10 lg:px-24 pt-10 md:pt-20 overflow-scroll remove-scrollbar'>
      <div className='flex justify-between mb-8'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-4 '>
          <h1 className='text-3xl font-bold flex flex-col'>
            Invoice #{invoiceId.slice(0, 10)}...
            <span className='text-lg font-normal'>
              {new Date(invoice.createdAt).toLocaleDateString()}
            </span>
          </h1>
          <Badge
            className={cn(
              'rounded-full capitalize w-fit',
              invoice.status === 'IN_PROGRESS' && 'bg-yellow-500',
              invoice.status === 'FULFILLED' && 'bg-green-600',
              invoice.status === 'PENDING' && 'bg-blue-600',
              invoice.status === 'CANCELLED' && 'bg-red-600'
            )}
          >
            {invoice.status}
          </Badge>
        </div>
        <div className='flex flex-col md:flex-row gap-3 items-center'>
          {invoice.status === 'IN_PROGRESS' ||
          invoice.status === 'FULFILLED' ? (
            <p className='flex gap-2 items-center justify-center text-xl font-bold'>
              <Check className='w-8 h-auto bg-green-600 rounded-full text-white p-1' />
              <span className='hidden md:block'>Invoice Paid</span>
            </p>
          ) : (
            ''
          )}

          {session?.user.role === 'USER' ? (
            ''
          ) : (
            <div className='flex gap-4'>
              {invoice.status === 'CANCELLED' &&
              session?.user.role !== 'ADMIN' ? (
                ''
              ) : (
                <ChangeStatusMenu
                  invoiceId={invoiceId as any}
                  currentStatus={invoice.status}
                  role={session!.user.role!}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <p className='text-3xl mb-3'>
        <span className=' font-extrabold'>N</span>
        {parseFloat(invoice.amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}{' '}
      </p>
      <p className='text-lg mb-8'>{invoice.description} </p>
      <h2 className='font-bold text-lg mb-4'>Billing Details</h2>
      <ul className='grid gap-2 mb-4'>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Invoice ID
          </strong>
          <span>{invoiceId} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Invoice Date
          </strong>
          <span>{new Date(invoice.createdAt).toLocaleDateString()}</span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Company
          </strong>
          <span>{invoice.company} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Name
          </strong>
          <span>{invoice.name} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Email
          </strong>
          <span>{invoice.email} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Phone
          </strong>
          <span>{invoice.phone} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Product
          </strong>
          <span>{invoice.product} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Delivery Address
          </strong>
          <span>{invoice.address} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Delivery Date
          </strong>
          <span>{new Date(invoice.date).toLocaleDateString()} </span>
        </li>
      </ul>

      {invoice.status === 'CANCELLED' ? (
        <>
          <h2 className='font-bold text-lg mb-4 text-red-600'>
            Cancellation Details
          </h2>
          <ul className='grid gap-2'>
            <li className='flex gap-4'>
              <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
                Created By
              </strong>
              <span>{invoice.creatorId} </span>
            </li>
            <li className='flex gap-4'>
              <strong className='block w-28 flex-shrink-0 font-medium text-sm text-red-600'>
                Cancelled By
              </strong>
              <span>{invoice.cancelledBy} </span>
            </li>
            <li className='flex gap-4'>
              <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
                Notes
              </strong>
              <span>{invoice.verificationNotes} </span>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h2 className='font-bold text-lg mb-4'>Verification Details</h2>
          <ul className='grid gap-2'>
            <li className='flex gap-4'>
              <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
                Created By
              </strong>
              <span>{invoice.creatorId} </span>
            </li>
            <li className='flex gap-4'>
              <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
                Payment Verified
              </strong>
              <span>{invoice.paymentVerifiedBy} </span>
            </li>
            <li className='flex gap-4'>
              <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
                Delivery Verified
              </strong>
              <span>{invoice.deliveryVerifiedBy} </span>
            </li>
          </ul>
        </>
      )}
      {invoice.status === 'CANCELLED' ||
        (invoice.cancelledBy && (
          <div className='flex gap-4 bg-red-600 w-fit p-2 rounded-lg text-white'>
            <strong className='block w-28 flex-shrink-0 font-medium text-sm '>
              Once Cancelled By
            </strong>
            <span className=''>{invoice.cancelledBy} </span>
          </div>
        ))}
    </main>
  )
}

export default InvoicePage
