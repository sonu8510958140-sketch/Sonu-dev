import React from 'react'
import { useNavigate } from 'react-router-dom'

const popularCities = [
  { name: 'Delhi', description: 'History, culture and city life', icon: '🏛️', color: 'from-amber-500 to-orange-700' },
  { name: 'Mumbai', description: 'The energy of the city by the sea', icon: '🌆', color: 'from-violet-500 to-indigo-800' },
  { name: 'Jaipur', description: 'Discover the Pink City', icon: '🕌', color: 'from-rose-500 to-pink-800' },
  { name: 'Goa', description: 'Beaches and laid-back escapes', icon: '🏖️', color: 'from-cyan-500 to-blue-800' },
]

const Home = () => {
    const navigate = useNavigate()
    const handelclick =(route)=>{
       
        navigate(route)
    }
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center rounded-xl bg-sky-500 px-4 text-center">
        <div>
      <h1 className="m-4 text-3xl font-bold text-black sm:text-5xl">
        Explore the World With TravelEase
      </h1>
      <p className="text-lg tracking-widest text-black sm:text-2xl">
        Plan ▫ Book ▫ Explore
      </p>
      </div>
      <div className="m-6 grid w-full max-w-4xl grid-cols-2 gap-3 sm:m-10 sm:gap-5 lg:grid-cols-4">
        <button onClick={()=>handelclick('/flight')} className ="w-full rounded-xl bg-red-700 px-3 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95 sm:text-2xl">✈ Flight</button>
        <button onClick={()=>handelclick('/train')} className="w-full rounded-xl bg-green-700 px-3 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95 sm:text-2xl">🚊 Train</button>
        <button onClick={()=>handelclick('/bus')} className="w-full rounded-xl bg-gray-600 px-3 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95 sm:text-2xl">🚍 Bus</button>
        <button onClick={()=>handelclick('/hotel')} className="w-full rounded-xl bg-slate-700 px-3 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95 sm:text-2xl">🏤 Hotel</button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const form = event.currentTarget
          const formData = new FormData(form)
          console.log('Trip search:', Object.fromEntries(formData.entries()))
          form.reset()
        }}
        className="flex w-full flex-col items-center"
      >
      <div className="grid w-full max-w-4xl grid-cols-1 gap-5 px-2 sm:grid-cols-2 sm:gap-8">
        <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="from" className="text-2xl font-bold font-serif sm:text-3xl">From</label>
            <input id="from" name="from" type="text" placeholder="Enter Location" required className="w-full min-w-0 rounded-xl border bg-white p-3 text-lg text-center sm:p-4 sm:text-2xl"/>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="to" className="text-2xl font-bold font-serif sm:text-3xl">To</label>
            <input id="to" name="to" type="text" placeholder="Enter Location" required className="w-full min-w-0 rounded-xl border bg-white p-3 text-lg text-center sm:p-4 sm:text-2xl"/>
        </div>
      </div>
      <div className="m-6 grid w-full max-w-4xl grid-cols-1 gap-5 px-2 sm:m-10 sm:grid-cols-2 sm:gap-8">
        <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="departure-date" className="text-2xl font-bold font-serif sm:text-3xl">Departure</label>
            <input id="departure-date" name="departureDate" type="date" required className="w-full min-w-0 rounded-xl border bg-white p-3 text-base sm:p-4 sm:text-xl" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="return-date" className="text-2xl font-bold font-serif sm:text-3xl">Return date</label>
            <input id="return-date" name="returnDate" type="date" className="w-full min-w-0 rounded-xl border bg-white p-3 text-base sm:p-4 sm:text-xl" />
        </div>
      </div>
      <button type="submit" className="mb-8 rounded-xl bg-emerald-700 px-8 py-3 text-lg font-bold text-white transition hover:bg-emerald-800 active:scale-95">
        Search
      </button>
      </form>
      <section className="w-full max-w-6xl pb-10 text-left">
        <h2 className="mb-6 text-3xl font-bold text-black sm:text-4xl">Popular Destinations</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularCities.map((city) => (
            <article
              key={city.name}
              className={`flex min-h-64 flex-col justify-between rounded-2xl bg-gradient-to-br ${city.color} p-6 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl`}
            >
              <span aria-hidden="true" className="text-5xl">{city.icon}</span>
              <div>
                <h3 className="text-2xl font-bold">{city.name}</h3>
                <p className="mt-1 text-sm text-white/85">{city.description}</p>
                <button
                  type="button"
                  onClick={() => navigate('/flight')}
                  className="mt-4 rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-white/85 active:scale-95"
                >
                  Explore
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div>
        <h1 className="mb-6 text-3xl font-bold text-black sm:text-4xl">
            Why TravelEase?
        </h1>
        <div className='flex flex-col md:flex-row gap-10'>
            <div >
            <h1 className='flex min-h-20 text-3xl  font-bold flex-col justify-between rounded-2xl bg-gradient-to-br ${city.color} p-6 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl bg-yellow-700'>🔒 Secure</h1>
        </div>
        <div>
            <h1 className='flex min-h-20 text-3xl  font-bold flex-col justify-between rounded-2xl bg-gradient-to-br ${city.color} p-6 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl bg-orange-400'>💰 Best Price</h1>
        </div>
        <div>
            <h1 className='flex min-h-20 text-3xl  font-bold flex-col justify-between rounded-2xl bg-gradient-to-br ${city.color} p-6 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl bg-orange-700'>⚡ Easy</h1>
        </div>
        </div>
      </div>


      </div>
   
  )
}

export default Home
