import React from 'react'
import {  useNavigate } from 'react-router-dom'

const Booking = (props) => {
  const navigate =useNavigate()
  const handelclick=()=>{
    navigate(`/MyBooking?city=${props.city}`)

  }
  return (
    <>
    <div className=' flex  m-10'>

      
        
        <div className='border-3 border-black p-3 rounded-xl gap-3' onClick={handelclick}>
            <h1 className='flex justify-center max-w-full md: text-3xl font-bold'>{props.city}</h1>
            <img src={props.img} alt="" className='w-60 h-40 flex justify-center md:justify-center border-2 rounded-xl' />
        </div>
          </div>
          
         
          </>
          

  )
}


export default Booking