import React from 'react'
import { useNavigate } from 'react-router-dom'

const Train = () => {
  const navigate = useNavigate()
  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(Object.fromEntries(formData.entries()))
  }
  const handleTrainSelect = (train) => {
    navigate('/trainpassenger', { state: { train } })
  }


  return (
    <div className='train bg-sky-200 rounded-xl m-3 p-4 md:m-5 md:p-6'>
      <div>
        <h1 className='text-2xl md:text-4xl font-bold font-serif'>Search Trains</h1>
      </div>

      <div className='p-2 md:p-4 my-6 md:my-10'>
        <form onSubmit={handleSearch} className='space-y-4'>
          <div className='grid grid-cols-1 justify-items-center gap-3 md:grid-cols-2 md:gap-6'>
            <div className='flex w-full max-w-60 flex-col gap-2'>
              <label htmlFor='from' className='flex justify-center font-bold text-2xl md:text-3xl'>From</label>
              <select
                id='from'
                name='from'
                required
                defaultValue=''
                className='w-full text-xl md:text-2xl text-center p-3 border rounded-xl tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                <option value='' disabled>Select city</option>
                <option value='Jaipur'>Jaipur</option>
                <option value='Delhi'>Delhi</option>
                <option value='Mumbai'>Mumbai</option>
                <option value='Chennai'>Chennai</option>
                <option value='Bengaluru'>Bengaluru</option>
                <option value='Hyderabad'>Hyderabad</option>
                <option value='Kolkata'>Kolkata</option>
              </select>
            </div>

            <div className='flex w-full max-w-60 flex-col gap-2'>
              <label htmlFor='to' className='flex justify-center font-bold text-2xl md:text-3xl'>To</label>
              <select
                id='to'
                name='to'
                required
                defaultValue=''
                className='w-full text-xl md:text-2xl text-center p-3 border rounded-xl tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                <option value='' disabled>Select city</option>
                <option value='Jaipur'>Jaipur</option>
                <option value='Delhi'>Delhi</option>
                <option value='Mumbai'>Mumbai</option>
                <option value='Chennai'>Chennai</option>
                <option value='Bengaluru'>Bengaluru</option>
                <option value='Hyderabad'>Hyderabad</option>
                <option value='Kolkata'>Kolkata</option>
              </select>
            </div>

            <div className='flex w-full max-w-60 flex-col gap-2'>
              <label htmlFor='date' className='flex justify-center font-bold text-2xl md:text-3xl'>Date</label>
              <input
                type='date'
                id='date'
                name='date'
                required
                className='w-full text-xl md:text-2xl text-center p-3 border rounded-xl tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'
              />
            </div>

            <div className='flex w-full max-w-60 flex-col gap-2'>
              <label htmlFor='travel-class' className='flex justify-center font-bold text-2xl md:text-3xl'>Class</label>
              <select
                id='travel-class'
                name='travelClass'
                required
                defaultValue=''
                className='w-full text-xl md:text-2xl text-center p-3 border rounded-xl tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                <option value='' disabled>Select class</option>
                <option value='1A'>First AC (1A)</option>
                <option value='2A'>AC 2 Tier (2A)</option>
                <option value='3A'>AC 3 Tier (3A)</option>
                <option value='3E'>AC 3 Economy (3E)</option>
                <option value='EC'>Executive Chair Car (EC)</option>
                <option value='CC'>AC Chair Car (CC)</option>
                <option value='SL'>Sleeper (SL)</option>
                <option value='2S'>Second Sitting (2S)</option>
                <option value='GN'>General (GN)</option>
              </select>
            </div>
          </div>
          <div className='flex justify-center mt-4'>
            <button type='submit' className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-xl text-lg md:text-2xl transition duration-300'>Search</button>
          </div>
        </form>
      </div>

      <section aria-labelledby='available-trains-heading' className='mt-8'>
        <h2 id='available-trains-heading' className='text-2xl md:text-4xl font-bold font-serif'>Available Trains</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
          <div className='mt-4 flex min-h-60 w-full flex-col rounded-xl bg-amber-300 p-4 md:p-6'>
            <h3 className='text-xl font-semibold md:text-2xl'>Train Name/Number</h3>
            <p className='mt-2 text-lg tracking-wide md:text-2xl'>Jaipur <span aria-hidden='true'>→</span> Delhi</p>
            <p className='mt-2 text-lg tracking-wide md:text-2xl'>06:30 AM <span aria-hidden='true'>→</span> 12:45 PM</p>
            <p className='mt-2 text-lg tracking-wide md:text-2xl'>Duration: 6h 15m <span className='mx-2' aria-hidden='true'>|</span> Sleeper | 3A | 2A</p>
            <div className='mt-auto flex items-center justify-between gap-3 pt-4'>
              <p className='text-lg font-semibold tracking-wide md:text-2xl'>₹850</p>
              <button
                type='button'
                onClick={() => handleTrainSelect({
                  name: 'Train Name/Number',
                  route: { from: 'Jaipur', to: 'Delhi' },
                  schedule: { departure: '06:30 AM', arrival: '12:45 PM' },
                  duration: '6h 15m',
                  classes: 'Sleeper | 3A | 2A',
                  price: '₹850'
                })}
                className='rounded-xl bg-slate-600 px-5 py-2 text-lg font-bold text-white hover:bg-slate-700 md:text-xl'
              >
                Select
              </button>
            </div>
          </div>
          <div className='mt-4 flex min-h-60 w-full flex-col rounded-xl bg-orange-400 p-4 md:p-6'>
            <h3 className='text-xl font-semibold md:text-2xl'>Train Name/Number</h3>
            <p className='mt-2 text-lg tracking-wide md:text-2xl'>Delhi <span aria-hidden='true'>→</span> Jaipur</p>
            <p className='mt-2 text-lg tracking-wide md:text-2xl'>07:30 PM <span aria-hidden='true'>→</span> 05:00 AM</p>
            <p className='mt-2 text-lg tracking-wide md:text-2xl'>Duration: 9h 30m <span className='mx-2' aria-hidden='true'>|</span> Sleeper | 3A | 2A | SL</p>
            <div className='mt-auto flex items-center justify-between gap-3 pt-4'>
              <p className='text-lg font-semibold tracking-wide md:text-2xl'>₹1,050</p>
              <button
                type='button'
                onClick={() => handleTrainSelect({
                  name: 'Train Name/Number',
                  route: { from: 'Delhi', to: 'Jaipur' },
                  schedule: { departure: '07:30 PM', arrival: '05:00 AM' },
                  duration: '9h 30m',
                  classes: 'Sleeper | 3A | 2A | SL',
                  price: '₹1,050'
                })}
                className='rounded-xl bg-slate-600 px-5 py-2 text-lg font-bold text-white hover:bg-slate-700 md:text-xl'
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Train