'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const Search = () => {
  const router = useRouter()
  const [text, setText] = useState('')
  const [query] = useDebounce(text, 700)

  useEffect(() => {
    if (!query) {
      router.push('?')
    } else {
      router.push(`?search=${query}`)
    }
  }, [query, router])

  return (
    <div className='relative rounded-full shadow-sm'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
        <MagnifyingGlassIcon
          className='h-5 w-5 text-gray-400 mx-1'
          aria-hidden='true'
        />
      </div>
      <input
        value={text}
        placeholder='Search Invoices...'
        onChange={(e) => setText(e.target.value)}
        className='block w-full rounded-full border-[1px] border-gray-200 py-1 pl-10 text-gray-600 shadow-md'
      />
    </div>
  )
}

export default Search
