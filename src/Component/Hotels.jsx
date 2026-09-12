import React from 'react'
import Booking from './Booking'

const Hotels = () => {
  return (
    <>
    <div className='flex flex-col md:flex-row   max-w-full md:justify-center m-30 '>
        
        <Booking
         city="Delhi"
         img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7uEjJOPRSlCKEdOMLUAswjoItiI2rUT03sg6Q8Q41Cw&s=10"
        />
        <Booking
         city="Manali"
         img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwHHqYzZX1UxE8ZOrkboQhDRlV8YoS1SUNHkVvoW_ig&s=10"
         />
         <Booking
         city="Banglore"
         img="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/cc/0d/36.jpg"
         />
         <Booking
         city ="Mumbai"
         img="https://img.static-kl.com/transform/de35e6f1-d87f-4987-8fdc-330c67582610/" />

    </div>
    <footer className='text-2xl font-bold'>Https://WWW.StayFinder.com &copy;2026 StayFinder.com</footer>
    </>
  )
}

export default Hotels