import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const buses = [
  {
    id: 1,
    operator: 'BlueLine Travels',
    type: 'AC Sleeper',
    from: 'Delhi',
    to: 'Jaipur',
    departure: '10:00 PM',
    arrival: '04:30 AM',
    duration: '6h 30m',
    price: 850,
    seats: 12
  },
  {
    id: 2,
    operator: 'Royal Roadways',
    type: 'Volvo AC Seater',
    from: 'Delhi',
    to: 'Jaipur',
    departure: '07:00 AM',
    arrival: '12:00 PM',
    duration: '5h',
    price: 650,
    seats: 8
  },
  {
    id: 3,
    operator: 'Coastal Express',
    type: 'AC Sleeper',
    from: 'Mumbai',
    to: 'Goa',
    departure: '09:30 PM',
    arrival: '07:00 AM',
    duration: '9h 30m',
    price: 1200,
    seats: 6
  },
  {
    id: 4,
    operator: 'City Connect',
    type: 'Non-AC Seater',
    from: 'Bengaluru',
    to: 'Chennai',
    departure: '06:00 AM',
    arrival: '01:00 PM',
    duration: '7h',
    price: 550,
    seats: 15
  }
]

const Bus = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState(null)

  const filteredBuses = useMemo(() => {
    if (!search) return buses
    return buses.filter((bus) =>
      bus.from.toLowerCase().includes(search.from.toLowerCase()) &&
      bus.to.toLowerCase().includes(search.to.toLowerCase())
    )
  }, [search])

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setSearch({
      from: String(formData.get('from')).trim(),
      to: String(formData.get('to')).trim(),
      date: String(formData.get('date'))
    })
  }

  const handleBooking = (bus) => {
    navigate('/payment', {
      state: {
        bus: {
          ...bus,
          route: { from: bus.from, to: bus.to },
          schedule: { departure: bus.departure, arrival: bus.arrival },
          price: `₹${bus.price}`,
          travelDate: search?.date ?? ''
        }
      }
    })
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl bg-gradient-to-r from-sky-700 to-cyan-600 p-6 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">TravelEase Bus</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">Find your next bus</h1>
          <p className="mt-3 max-w-2xl text-sky-50">Compare routes, timings and fares, then book your seat in a few simple steps.</p>
        </header>

        <form onSubmit={handleSearch} className="mb-10 grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            From
            <input name="from" type="text" required placeholder="Departure city" className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            To
            <input name="to" type="text" required placeholder="Destination city" className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Travel date
            <input name="date" type="date" required className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100" />
          </label>
          <button type="submit" className="rounded-xl bg-sky-700 px-6 py-3 font-bold text-white transition hover:bg-sky-800">Search buses</button>
        </form>

        <section aria-labelledby="bus-results-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="bus-results-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {search ? `${search.from} to ${search.to}` : 'Popular bus routes'}
              </h2>
              <p className="mt-1 text-slate-600">{filteredBuses.length} buses available</p>
            </div>
            {search && (
              <button type="button" onClick={() => setSearch(null)} className="text-sm font-semibold text-sky-700 hover:text-sky-900">
                Clear search
              </button>
            )}
          </div>

          {filteredBuses.length ? (
            <div className="grid gap-5">
              {filteredBuses.map((bus) => (
                <article key={bus.id} className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{bus.operator}</h3>
                      <p className="mt-1 text-sm text-slate-500">{bus.type}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{bus.seats} seats left</span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center">
                    <div>
                      <p className="text-xl font-bold text-slate-900">{bus.departure}</p>
                      <p className="text-sm text-slate-500">{bus.from}</p>
                    </div>
                    <p className="text-sm text-slate-500">{bus.duration} <span aria-hidden="true">→</span></p>
                    <div>
                      <p className="text-xl font-bold text-slate-900">{bus.arrival}</p>
                      <p className="text-sm text-slate-500">{bus.to}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                      <p className="text-xl font-bold text-slate-900">₹{bus.price}<span className="text-sm font-normal text-slate-500"> / seat</span></p>
                      <button type="button" onClick={() => handleBooking(bus)} className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700">Book seat</button>
                    </div>
                  </div>
                  {search?.date && <p className="mt-4 text-sm text-slate-500">Travel date: {search.date}</p>}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">
              No buses found for this route. Try Delhi to Jaipur, Mumbai to Goa, or Bengaluru to Chennai.
            </div>
          )}
        </section>

        <Link to="/" className="mt-8 inline-flex font-semibold text-sky-700 hover:text-sky-900">← Back to home</Link>
      </div>
    </main>
  )
}

export default Bus
