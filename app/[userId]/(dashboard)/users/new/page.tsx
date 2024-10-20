'use client'

import CreateUserForm from '@/components/form/CreateUserForm'

const NewUserPage = () => {
  return (
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] px-4 md:px-10 lg:px-36 pt-10 overflow-scroll remove-scrollbar'>
      <div className='w-full'>
        <div className='flex justify-between mb-6'>
          <h1 className='text-3xl font-bold'>Create User</h1>
        </div>
        <CreateUserForm />
      </div>
    </main>
  )
}

export default NewUserPage
