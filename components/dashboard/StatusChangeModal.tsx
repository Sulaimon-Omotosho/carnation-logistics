import { ReactNode } from 'react'

export const ChangeStatusModal = ({
  onClose,
  title,
  children,
}: {
  onClose: () => void
  title: string
  children: ReactNode
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 w-[90%] md:w-[500px]'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-semibold'>{title}</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  )
}
