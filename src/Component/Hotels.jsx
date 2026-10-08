import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const hotels = [
  {
    id: 1,
    name: 'The Grand Jaipur',
    location: 'Jaipur',
    description: 'A comfortable stay close to the Pink City attractions.',
    rating: '4.8',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Pool'],
    pricePerNight: 4200
  },
  {
    id: 2,
    name: 'Sea View Residency',
    location: 'Mumbai',
    description: 'Relax in modern rooms with easy access to the waterfront.',
    rating: '4.6',
    amenities: ['Free Wi-Fi', 'Sea view', 'Restaurant'],
    pricePerNight: 5600
  },
  {
    id: 3,
    name: 'Goa Palm Retreat',
    location: 'Goa',
    description: 'A laid-back resort for a relaxing beach holiday.',
    rating: '4.7',
    amenities: ['Beach access', 'Breakfast', 'Pool'],
    pricePerNight: 6800
  },
  {
    id: 4,
    name: 'Capital Comfort Hotel',
    location: 'Delhi',
    description: 'Well-connected city stay with welcoming service.',
    rating: '4.5',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Parking'],
    pricePerNight: 3900
  }
]

const Hotels = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState(null)
  const [searchError, setSearchError] = useState('')

  const filteredHotels = useMemo(() => {
    if (!search) return hotels
    return hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(search.destination.toLowerCase())
    )
  }, [search])

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const checkIn = String(formData.get('checkIn'))
    const checkOut = String(formData.get('checkOut'))

    if (checkOut <= checkIn) {
      setSearchError('Check-out date must be after the check-in date.')
      return
    }

    setSearchError('')
    setSearch({
      destination: String(formData.get('destination')).trim(),
      checkIn,
      checkOut,
      guests: Number(formData.get('guests'))
    })
  }

  const handleBooking = (hotel) => {
    const nights = search
      ? Math.max(1, (new Date(`${search.checkOut}T00:00:00`) - new Date(`${search.checkIn}T00:00:00`)) / 86400000)
      : 1
    const totalPrice = hotel.pricePerNight * nights

    navigate('/payment', {
      state: {
        hotel: {
          ...hotel,
          checkIn: search?.checkIn ?? '',
          checkOut: search?.checkOut ?? '',
          guests: search?.guests ?? 1,
          nights,
          price: `₹${totalPrice.toLocaleString('en-IN')}`
        }
      }
    })
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-600 p-6 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">TravelEase Stays</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">Find a place to stay</h1>
          <p className="mt-3 max-w-2xl text-indigo-50">Discover comfortable stays for your next trip and book with confidence.</p>
        </header>

        <form onSubmit={handleSearch} className="mb-10 grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto] lg:items-end">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Destination
            <input name="destination" type="text" required placeholder="Where do you want to stay?" className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Check-in
            <input name="checkIn" type="date" required className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Check-out
            <input name="checkOut" type="date" required className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Guests
            <select name="guests" defaultValue="2" className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100">
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </label>
          <button type="submit" className="rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white transition hover:bg-indigo-800">Search stays</button>
          {searchError && <p role="alert" className="text-sm font-medium text-red-700 sm:col-span-2 lg:col-span-5">{searchError}</p>}
        </form>

        <section aria-labelledby="hotel-results-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="hotel-results-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {search ? `Stays in ${search.destination}` : 'Popular stays'}
              </h2>
              <p className="mt-1 text-slate-600">{filteredHotels.length} places to stay</p>
            </div>
            {search && (
              <button type="button" onClick={() => { setSearch(null); setSearchError('') }} className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">
                Clear search
              </button>
            )}
          </div>

          {filteredHotels.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredHotels.map((hotel) => (
                <article key={hotel.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-indigo-200 to-violet-300 text-5xl" aria-hidden="true">
                    🏨
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{hotel.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{hotel.location}</p>
                      </div>
                      <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-bold text-amber-700">★ {hotel.rating}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{hotel.description}</p>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Hotel amenities">
                      {hotel.amenities.map((amenity) => (
                        <li key={amenity} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{amenity}</li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                      <p className="text-xl font-bold text-slate-900">
                        ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                        <span className="text-sm font-normal text-slate-500"> / night</span>
                      </p>
                      <button type="button" onClick={() => handleBooking(hotel)} className="rounded-xl bg-indigo-700 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-800">Book stay</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">
              No stays found for this destination. Try Jaipur, Mumbai, Goa, or Delhi.
            </div>
          )}
        </section>

        <Link to="/" className="mt-8 inline-flex font-semibold text-indigo-700 hover:text-indigo-900">← Back to home</Link>
      </div>
    </main>
  )
}

export default Hotels
