import React from 'react'
import { Link } from 'react-router-dom'

const Sign = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    console.log('Sign-up form submitted:', {
      name: formData.get('name'),
      email: formData.get('email'),
      password: '[not logged for security]',
      confirmPassword: '[not logged for security]',
    })
  }

  return (
    <main className="min-h-[calc(100vh-6rem)] bg-slate-50 p-4 sm:p-8">
      <section className="mx-auto grid min-h-[70vh] max-w-6xl overflow-hidden rounded-3xl shadow-xl md:grid-cols-2">
        <div className="relative flex min-h-80 items-end overflow-hidden p-8 sm:p-12">
          <img
            src="https://cioviews.com/wp-content/uploads/2019/05/Travel-and-Hospitality-min-1.jpg"
            alt="Travel destination"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <h1 className="relative z-10 text-left text-3xl font-extrabold text-white sm:text-4xl">
            Create Account
          </h1>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <h2 className="text-3xl font-bold text-slate-900">Sign Up</h2>

            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium text-slate-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-email" className="block font-medium text-slate-700">Email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-password" className="block font-medium text-slate-700">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block font-medium text-slate-700">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Create Account
            </button>

            <p className="text-center text-slate-600">
              Already have an account? <Link to="/Login" className="font-semibold text-emerald-700 hover:text-emerald-800">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Sign
