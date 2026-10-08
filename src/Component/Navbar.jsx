import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <div className="flex w-full md:flex-row flex-col items-center justify-around  md:justify-between select-none bg-emerald-500 p-4">
      <div className="flex items-center gap-3">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-[0_12px_24px_rgba(16,185,129,0.28)]">
        <svg
          viewBox="0 0 64 64"
          className="h-9 w-9 text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="TravelEase logo"
        >
          <path
            d="M14 36C14 28.268 20.268 22 28 22H34C41.732 22 48 28.268 48 36V40C48 47.732 41.732 54 34 54H28C20.268 54 14 47.732 14 40V36Z"
            fill="rgba(255,255,255,0.13)"
          />
          <path
            d="M18 29L33 18L38 27L47 21L42 34L49 42L34 39L28 49L24 38L18 29Z"
            fill="currentColor"
          />
          <path
            d="M20 39C24 35 29 33 34 33C39 33 44 35 48 39"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="32" cy="29" r="4.5" fill="rgba(255,255,255,0.9)" />
        </svg>
        </div>

        <div className="flex flex-col leading-none">
          <h1 className="text-[2rem] font-black tracking-[-0.06em] text-slate-900">TravelEase</h1>
          <p className="mt-1 text-[0.62rem] font-bold tracking-[0.28em] text-white uppercase">
            Booking made fast
          </p>
        </div>
      </div>
      <div className="ml-auto md:flex-row flex-col flex items-center gap-8 text-xl tracking-widest">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-white/15'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/flight"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-white/15'}`
          }
        >
          Flights
        </NavLink>
        <NavLink
          to="/train"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-white/15'}`
          }
        >
          Trains
        </NavLink>
        <NavLink
          to="/bus"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-white/15'}`
          }
        >
          Bus
        </NavLink>
        <NavLink
          to="/hotel"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-white/15'}`
          }
        >
          Hotels
        </NavLink>
        <NavLink
          to="/Login"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-white/15'}`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/sign"
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-white/15'}`
          }
        >
          Sign Up
        </NavLink>
      </div>


    </div>
  )
}

export default Navbar