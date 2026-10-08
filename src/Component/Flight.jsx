import React from 'react'
import { Link } from 'react-router-dom'

const Flight = () => {
  const flightCards = [
    {
      id: 1,
      airline: 'Indigo',
      searchLocation: 'Delhi',
      destination: 'Mumbai',
      route: { from: 'Delhi', to: 'Mumbai' },
      schedule: { departure: '10:30 AM', arrival: '12:45 PM' },
      duration: '2h 15m',
      price: 'Rs 4,599',
      stops: 'Non Stop',
      cabin: 'Economy'
    },
    {
      id: 2,
      airline: 'Air India',
      searchLocation: 'Delhi',
      destination: 'Bengaluru',
      route: { from: 'Delhi', to: 'Bengaluru' },
      schedule: { departure: '08:10 AM', arrival: '10:40 AM' },
      duration: '2h 30m',
      price: 'Rs 5,840',
      stops: '1 Stop',
      cabin: 'Business'
    },
    {
      id: 3,
      airline: 'Vistara',
      searchLocation: 'Mumbai',
      destination: 'Hyderabad',
      route: { from: 'Mumbai', to: 'Hyderabad' },
      schedule: { departure: '11:00 AM', arrival: '12:55 PM' },
      duration: '1h 55m',
      price: 'Rs 6,120',
      stops: 'Non Stop',
      cabin: 'Premium Economy'
    },
    {
      id: 4,
      airline: 'Akasa Air',
      searchLocation: 'Bengaluru',
      destination: 'Pune',
      route: { from: 'Bengaluru', to: 'Pune' },
      schedule: { departure: '09:45 AM', arrival: '11:15 AM' },
      duration: '1h 30m',
      price: 'Rs 3,980',
      stops: 'Non Stop',
      cabin: 'Economy'
    }
  ]

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {flightCards.map((flight) => (
          <div
            key={flight.id}
            className="rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-300 p-[2px] shadow-xl"
          >
            <div className="rounded-2xl bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                  {flight.airline}
                </span>
                <span className="text-sm font-medium text-slate-500">{flight.cabin}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span>{flight.searchLocation}</span>
                  <span>to</span>
                  <span>{flight.destination}</span>
                </div>

                <div className="flex items-center justify-between text-xl font-bold text-slate-800">
                  <span>{flight.route.from}</span>
                  <span className="text-slate-400">→</span>
                  <span>{flight.route.to}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{flight.schedule.departure}</span>
                  <span>{flight.duration}</span>
                  <span>{flight.schedule.arrival}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm text-slate-600">
                  <span>{flight.stops}</span>
                  <span className="text-xl font-bold text-slate-900">{flight.price}</span>
                </div>
              </div>

              <Link
                to="/passengerdetails"
                state={{ flight }}
                className="mt-5 block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Flight
