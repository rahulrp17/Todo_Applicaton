import React from 'react'
import OIP from './assets/OIP.jpg'

const Navbar = () => {
  return (
    <div className='flex text-center items-center px-10  py-5 bg-zinc-800 shadow-xl '>
        <img className='w-16 h-16 rounded-full' src={OIP} alt="" />
        <h1 className='text-3xl font-extrabold py-3 px-3  text-white'>Todo</h1>
    </div>
  )
}

export default Navbar
