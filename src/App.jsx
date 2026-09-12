import React, { Children } from "react";
import {createBrowserRouter,Outlet,RouterProvider} from 'react-router-dom'
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Hotels from "./Component/Hotels";
import MyBooking from "./Component/Mybooking";
import About from "./Component/About";
import'./App.css'
function Layout() {
  return(
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
  
}
const router =createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/MyBooking",
        element:<MyBooking/>
      },
          {
        path:"/Hotels",
        element:<Hotels/>
      },
          {
        path:"/About",
        element:<About/>
      }

    ]
  }
  
])
function App(){
  return(
    <RouterProvider router={router}/>
  )

}

export default App