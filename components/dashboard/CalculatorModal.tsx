'use client'

import { Calculator, X } from 'lucide-react'
import React, { useState } from 'react'
import PriceCalculator from '../PriceCalculator'

const CalculatorModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`md:absolute top-20 right-20 flex items-center justify-center rounded-full`}
      >
        <Calculator className='w-10 md:w-20 h-10 md:h-20' />
      </button>
      {open && (
        <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center '>
          <div className='bg-white dark:bg-slate-900 p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
            {/* <Form /> */}
            <PriceCalculator />
            <div
              className='absolute top-4 right-4 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              <X />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CalculatorModal
