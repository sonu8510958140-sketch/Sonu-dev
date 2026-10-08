import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const defaultFlight = {
  airline: 'Indigo',
  route: { from: 'Delhi', to: 'Mumbai' },
  schedule: { departure: '10:30 AM', arrival: '12:45 PM' },
  duration: '2h 15m',
  price: 'Rs 4,599',
  stops: 'Non Stop',
  cabin: 'Economy'
}

const Payment = () => {
  const { state } = useLocation()
  const isTrainBooking = Boolean(state?.train)
  const isBusBooking = Boolean(state?.bus)
  const isHotelBooking = Boolean(state?.hotel)
  const booking = state?.hotel ?? state?.bus ?? state?.train ?? state?.flight ?? defaultFlight
  const bookingType = isHotelBooking ? 'hotel' : isBusBooking ? 'bus' : isTrainBooking ? 'train' : 'flight'
  const passengerDetailsPath = isHotelBooking
    ? '/hotel'
    : isBusBooking
      ? '/bus'
      : isTrainBooking
        ? '/trainpassenger'
        : '/passengerdetails'
  const passengerDetailsState = isHotelBooking
    ? { hotel: booking }
    : isBusBooking
      ? { bus: booking }
      : isTrainBooking
        ? { train: booking }
        : { flight: booking }
  const passenger = state?.passenger
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentComplete, setPaymentComplete] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setPaymentComplete(true)
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to={passengerDetailsPath}
          state={passengerDetailsState}
          className="mb-6 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900"
        >
          ← Back to {bookingType} booking
        </Link>

        <h1 className="mb-6 text-3xl font-bold text-slate-900">Payment</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-2 text-xl font-bold text-slate-900">Choose a payment method</h2>
            <p className="mb-6 text-sm text-slate-500">Select how you would like to pay.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <fieldset className="grid gap-3 sm:grid-cols-3">
                <legend className="sr-only">Payment method</legend>
                {[
                  { value: 'card', label: 'Credit / Debit card' },
                  { value: 'upi', label: 'UPI' },
                  { value: 'netbanking', label: 'Net banking' }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border p-4 text-sm font-semibold ${
                      paymentMethod === method.value
                        ? 'border-sky-600 bg-sky-50 text-sky-800'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      className="accent-sky-700"
                    />
                    {method.label}
                  </label>
                ))}
              </fieldset>

              {paymentMethod === 'card' && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                    Card number
                    <input
                      name="cardNumber"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      pattern="[0-9 ]{12,23}"
                      maxLength={23}
                      required
                      className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                      placeholder="1234 5678 9012 3456"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                    Name on card
                    <input
                      name="cardholder"
                      type="text"
                      autoComplete="cc-name"
                      required
                      className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                      placeholder="Name as shown on card"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                    Expiry date
                    <input
                      name="expiry"
                      type="month"
                      autoComplete="cc-exp"
                      required
                      className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                    CVV
                    <input
                      name="cvv"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      pattern="[0-9]{3,4}"
                      maxLength={4}
                      required
                      className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                      placeholder="123"
                    />
                  </label>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                  UPI ID
                  <input
                    name="upiId"
                    type="text"
                    autoComplete="off"
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                    placeholder="name@bank"
                  />
                </label>
              )}

              {paymentMethod === 'netbanking' && (
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                  Select bank
                  <select
                    name="bank"
                    defaultValue=""
                    required
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="" disabled>Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </label>
              )}

              <button
                type="submit"
                disabled={paymentComplete}
                className="w-full rounded-xl bg-sky-700 px-5 py-3 font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Pay {booking.price}
              </button>

              {paymentComplete && (
                <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
                  Demo payment complete. No payment was processed.
                </p>
              )}
            </form>

            <p className="mt-4 text-xs text-slate-500">
              Demo checkout only. Do not enter real card or bank details; payment processing is not connected.
            </p>
          </section>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Booking summary</h2>
            {passenger && (
              <p className="mb-5 text-sm text-slate-600">
                Passenger: {passenger.firstName} {passenger.lastName}
              </p>
            )}
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                {isHotelBooking ? booking.name : isTrainBooking ? booking.name : isBusBooking ? booking.operator : booking.airline}
              </span>
              <span className="text-sm text-slate-500">
                {isHotelBooking ? `${booking.rating} ★` : isTrainBooking ? booking.classes : isBusBooking ? booking.type : booking.cabin}
              </span>
            </div>
            {isHotelBooking ? (
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-800">Destination:</span> {booking.location}</p>
                {booking.checkIn && <p><span className="font-semibold text-slate-800">Check-in:</span> {booking.checkIn}</p>}
                {booking.checkOut && <p><span className="font-semibold text-slate-800">Check-out:</span> {booking.checkOut}</p>}
                <p><span className="font-semibold text-slate-800">Guests:</span> {booking.guests}</p>
                <p><span className="font-semibold text-slate-800">Stay:</span> {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                  <span>{booking.route.from}</span>
                  <span className="text-slate-400">→</span>
                  <span>{booking.route.to}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                  <span>{booking.schedule.departure}</span>
                  <span>{booking.duration}</span>
                  <span>{booking.schedule.arrival}</span>
                </div>
                {isBusBooking && booking.travelDate && (
                  <p className="mt-3 text-sm text-slate-600">Travel date: {booking.travelDate}</p>
                )}
              </>
            )}
            <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm">
              {!isTrainBooking && !isBusBooking && !isHotelBooking && (
                <div className="flex justify-between text-slate-600">
                  <span>Stops</span>
                  <span>{booking.stops}</span>
                </div>
              )}
              {isHotelBooking && (
                <div className="flex justify-between text-slate-600">
                  <span>Price per night</span>
                  <span>₹{booking.pricePerNight.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900">
                <span>Total amount</span>
                <span>{booking.price}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Payment
