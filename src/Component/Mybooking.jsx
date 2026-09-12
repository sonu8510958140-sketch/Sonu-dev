import React, { useEffect, useState }from 'react'
import { useSearchParams } from 'react-router-dom';
function MyBooking() {
    const[items,setItems]=useState([])
     const [searchParams]=useSearchParams()
    const city = searchParams.get("city")
    useEffect(()=>{
        fetch("./Card.json")
        .then(res=>res.json())
        .then(data=>setItems(data));
    },[])
    const filteredItems =city
    ?items.filter(item=>item.city ===city)
    :items
   
    return(
        <>
        <div className='flex flex-col md:flex-row gap-20  justify-center md:justify-center m-20 '>
            {filteredItems.map((item,index)=>(
                <div key={index} className='border-2 p-4 rounded-xl'>
                      <img src={item.img} alt=""  className=' max-width-full  h-50 border-2 rounded-xl'/>
                    <h3 className='text-4xl flex justify-center font-bold m-3 '>{item.city}</h3>
                    <p className=' text-3xl flex justify-center m-3'>{item.price}</p>
                    <p className=' text-3xl flex justify-center m-3'>{item.rating}</p>
                    

                </div>
            ))}
        </div>
        <footer className='text-2xl font-bold'>Https://WWW.StayFinder.com &copy;2026 StayFinder.com</footer>
        </>
        
    )
    
}
export default MyBooking
