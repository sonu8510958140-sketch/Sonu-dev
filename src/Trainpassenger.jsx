import { useNavigate, useLocation, Link } from 'react-router-dom'

const defaultTrain = {
  name: 'Train Name/Number',
  route: { from: 'Delhi', to: 'Mumbai' },
  schedule: { departure: '10:30 AM', arrival: '12:45 PM' },
  duration: '2h 15m',
  classes: 'Sleeper | 3A | 2A',
  price: '₹850'
}

const TrainPassenger = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const train = state?.train ?? defaultTrain

  const handleSubmit = (event) => {
    event.preventDefault()
    const passenger = Object.fromEntries(new FormData(event.currentTarget).entries())
    navigate('/payment', { state: { train, passenger } })
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/train"
          className="mb-6 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900"
        >
          ← Back to trains
        </Link>

        <h1 className="mb-6 text-3xl font-bold text-slate-900">Passenger details</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Passenger information</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                  First name
                  <input
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                    placeholder="As shown on ID"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                  Last name
                  <input
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                    placeholder="As shown on ID"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                    placeholder="name@example.com"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                  Phone number
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input className="mt-1 accent-sky-700" type="checkbox" required />
                <span>I confirm these details match the passenger's travel ID.</span>
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-sky-700 px-5 py-3 font-bold text-white transition hover:bg-sky-800"
              >
                Continue to payment
              </button>

            </form>
          </section>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Train summary</h2>
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                {train.name}
              </span>
              <span className="text-sm text-slate-500">{train.classes}</span>
            </div>

            <div className="flex items-center justify-between text-lg font-bold text-slate-900">
              <span>{train.route.from}</span>
              <span className="text-slate-400">→</span>
              <span>{train.route.to}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
              <span>{train.schedule.departure}</span>
              <span>{train.duration}</span>
              <span>{train.schedule.arrival}</span>
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Total fare</span>
                <span>{train.price}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default TrainPassenger