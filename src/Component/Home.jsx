
import React ,{useEffect,useState} from 'react'
import Booking from './Booking'


const Home = () => {
  const handelover=()=>{
    alert("Please your details")
    
  }
  const handelclick=()=>{
    alert("Your information submit Sucessfully")
  }
  
const [destitnation,setdestination]=useState([])
useEffect(()=>{
  fetch("./Card.json")
  .then(res=>res.json())
  .then(data=>setdestination(data))
},[])
  return (
    <>

    <div>
        <h1 className='flex  md:justify-center max-widht-full md: justify-center text-5xl m-5 font-bold'> "Find Your Perfect Stay"</h1>
        <p className=' flex justify-center md:justify-center text-3xl '>Comfortable stays,memorable trips</p>
        <div className='flex flex-col md:flex-colborder-2 m-10 rounded-xl bg-sky-600 '>
        <div className='flex  flex-col md:flex-row justify-center  gap-5 p-5 m-3'>
            <div className='flex flex-col text-center '>
            <label className='text-3xl' >Location</label>
            <input type="text" className='text-3xl border-2 rounded-xl' />
            </div>
            <div className='flex flex-col text-center'>
            <label className='text-3xl' >Check in</label>
            <input type="Date" className='text-3xl border-2 rounded-xl' />
            </div>
            <div className='flex flex-col text-center'>
            <label className='text-3xl' >Check Out</label>
            <input type="Date" className='text-3xl border-2 rounded-xl' />
            </div>
            <div className='flex flex-col text-center'>
            <label className='text-3xl' >Guest</label>
            <input type="Number" className='text-3xl border-2 rounded-xl' />
            </div>
             </div>
         <div className=' flex justify-center m-3  gap-5'>
            <button className=' border-2 p-3 text-4xl bg-slate-400 rounded-xl'onMouseOver={handelover} >Search Hotels</button>
            <button className=' border-2 p-3 text-4xl bg-slate-400 rounded-xl' onClick={handelclick}>Submit Now</button>
            </div>
            </div>
    </div>
     <div className='flex  justify-center md:justify-center max-w -full md:  '>
            <h1 className='text-5xl font-bold'>POPULAR DESTINATIONS</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-5 justify-center md:justify-center'>
        {destitnation.map((item,index)=>(
          <Booking key ={index} city={item.city} img={item.img}/>
        ))}
        </div>
      <footer className='text-2xl font-bold'>Https://WWW.StayFinder.com &copy;2026 StayFinder.com</footer>



    </>

  )
}

export default Home
