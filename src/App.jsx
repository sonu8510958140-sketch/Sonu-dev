import { useState } from 'react'
import Navbar from './Component/Navbar' 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Flight from './Component/Flight'
import Train from './Component/Train'
import Bus from './Component/Bus'
import Hotels from './Component/Hotels'
import Login from './Component/Login'
import Home from './Component/Home'
import Sign from './Component/Sign'
import Passengerdetails from './Component/Passengerdetails'
import TrainPassenger from './Trainpassenger'
import Payment from './Component/Payment'
import './App.css'

function App() {
const router = createBrowserRouter([
  {path:"/",
    element:<><Navbar/><Home/></>

  },
  {
    path:"/train",
    element:<><Navbar/><Train/></>
  },
  {
    path:"/flight",
    element:<><Navbar/><Flight/></>
  },
  {
    path:"/passengerdetails",
    element:<><Navbar/><Passengerdetails/></>
  },
  {
    path:"/trainpassenger",
    element:<><Navbar/><TrainPassenger/></>
  },
  {
    path:"/payment",
    element:<><Navbar/><Payment/></>
  },
  {
    path:"/bus",
    element:<><Navbar/><Bus/></>
  },
  {
    path:"/hotel",
    element:<><Navbar/><Hotels/></>
  },
  {
    path:"/Login",
    element:<><Navbar/><Login /></>
  },
  {
    path:"/sign",
    element:<><Navbar/><Sign/></>
  }
])

  return (
    <>
  <RouterProvider router={router}/>
    </>
  )
}

export default App
