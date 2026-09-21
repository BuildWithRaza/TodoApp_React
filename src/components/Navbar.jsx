import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className='flex justify-between items-center px-5 py-3 bg-gray-400 text-white '>
        <h2>NoteTodo</h2>
        <ul className='flex items-center gap-10'>
            <li className='cursor-pointer transition-all duration-75 ease-in hover:scale-110'>Home</li>
            <li className='cursor-pointer transition-all duration-75 ease-in hover:scale-110'>Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
