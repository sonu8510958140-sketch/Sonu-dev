import React from 'react'

const About = () => {
  return (
    <div>
      <h1 className='flex justify-center text-4xl m-5 font-bold'> StayFinder Hotels</h1>
      <div>
        <h1  className='flex  justify-center text-4xl font-bold'>Intoduction</h1>
        <p className='flex justify-center text-4xl m-10 border-2 rounded-xl bg-slate-300'>StayFinder is a platform designed to help your disCover and book the best hotels across popular destination
          in India. We aim to make your travel planing simple fast reliable.
        </p>
        <h2  className='flex  justify-center text-4xl font-bold'>Our Mission</h2>
        <p className='flex justify-center text-4xl m-10 border-2 rounded-xl bg-slate-300'>Our mission is to connect travelers with comfortable affordable stays, all in just a few clicks --- no hassel, no confusion.</p>
        <h1 className='flex  justify-center text-4xl font-bold'>Features</h1>
        <div className='grid  grid-cols-2 md:grid-cols-2 md:list-none text-3xl gap-5'>
        <li > ◾Easy location-based hotels search.</li>
                <li>◾ Real-time booking system.</li>
                        <li> ◾ Verified hotels  with genunie ratings.</li>
                        <li> ◾ Best price guaranted.</li>
                        <li> ◾ Simple and user-friendly interface.</li>
                        
                        </div>
      </div>
    </div>
  )
}

export default About