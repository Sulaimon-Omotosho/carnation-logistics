const Footer = () => {
  return (
    <footer className=' h-14 flex justify-between items-center px-2 md:px-5'>
      <p className='text-[10px] md:text-sm'>
        CRL Logistics &copy; {new Date().getFullYear()}
      </p>
      <p className='text-[10px] md:text-sm'>Created by Sulaimon Omotosho</p>
    </footer>
  )
}

export default Footer
