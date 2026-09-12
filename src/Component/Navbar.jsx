import React from 'react'
import{Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div  className='flex flex-col md:flex-row max-width-full md:justify-center  md: gap-20 md:gap-50 p-5 bg-slate-200'>
        <h1 className='text-5xl font-bold'>StayFinder</h1>
        <nav className='flex flex-col  md:flex-row  max-width- full md:justify-center gap-5 text-4xl font-bold '>
            <Link to="/">Home</Link>
            <Link to="/Hotels">Hotels</Link>
            <Link to="MyBooking">MyBooking</Link>
            <Link to="/About">About</Link>
        </nav>
    </div>
    </>
    
  )
}

export default Navbar