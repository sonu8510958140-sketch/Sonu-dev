import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    console.log('Login form submitted:', {
      email: formData.get('email'),
      password: '[not logged for security]',
    })

    navigate('/')
  }

  return (
    <main className="min-h-[calc(100vh-6rem)] bg-slate-50 p-4 sm:p-8">
      <section className="mx-auto grid min-h-[70vh] max-w-6xl overflow-hidden rounded-3xl shadow-xl md:grid-cols-2">
        <div className="relative flex min-h-80 items-end overflow-hidden p-8 sm:p-12">
          <img
            src="https://cioviews.com/wp-content/uploads/2019/05/Travel-and-Hospitality-min-1.jpg"
            alt="Travelers enjoying a scenic destination"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="relative z-10 text-left text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-200">
              TravelEase
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Your next journey starts here
            </h1>
            <p className="mt-3 max-w-md text-base leading-7 text-white/90">
              Discover new places and travel with ease.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
              <p className="mt-2 text-slate-600">Sign in to your TravelEase account</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium text-slate-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium text-slate-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Login
            </button>
         
            <p className="text-center text-slate-600">
              Don&apos;t have an account?{' '}
              <Link to="/sign" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Sign up
              </Link>
            </p>
         </form>
        </div>
      </section>
    </main>
  )
}

export default Login
